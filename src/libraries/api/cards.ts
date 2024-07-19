import type { CardType } from '@/interfaces/';
import {
  findCardIdInDb,
  getCardLikes,
  isCardBookmarkedByUser,
  isCardLikedByUser,
} from '@/libraries/db';
import fs from 'fs';
// TODO
// @ts-ignore
import matter from 'gray-matter';
import { join } from 'path';

import { findDeckByCardId } from './decks';
import { getUser } from './users';

const contentDirectory = join(process.cwd(), 'content');

export function getCardById(cardId: string): CardType | null {
  if (!cardId) {
    console.error('Invalid cardId parameter:', cardId);
    return null;
  }

  const cardIdWithoutExtension = cardId.replace(/\.mdx$/, '');
  const deck = findDeckByCardId(cardIdWithoutExtension);
  if (!deck) {
    console.error('Deck not found for cardId:', cardId);
    return null;
  }

  const fullPath = join(
    contentDirectory,
    deck.id,
    `${cardIdWithoutExtension}.mdx`
  );

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = content.replace(
      /!\[([^\]]*)\]\((images\/[^)]+)\)/g,
      (_: unknown, imageTitle: string, imageFileNameWithExtension: string) => {
        return `![${imageTitle}](/api/content/${deck.id}/${imageFileNameWithExtension})`;
      }
    );

    const dbCardId = findCardIdInDb(cardIdWithoutExtension, deck.id);
    if (dbCardId === null) {
      console.error('Card not found in database for cardId:', cardId);
      return null;
    }

    const likes = getCardLikes(dbCardId);

    const user = getUser();
    const isLiked = isCardLikedByUser(dbCardId, user?.id || 0); // TODO: Temporary
    const isBookmarked = isCardBookmarkedByUser(dbCardId, user?.id || 0); // TODO: Temporary

    return {
      ...data,
      id: cardIdWithoutExtension,
      content: processedContent,
      likes,
      isLiked,
      isBookmarked,
    } as CardType;
  } catch (error) {
    console.error(`Error reading file at path ${fullPath}:`, error);
    return null;
  }
}
