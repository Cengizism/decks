import { CardType } from '@/interfaces/types';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import {
  findCardIdInDb,
  getCardLikes,
  isCardBookmarkedByUser,
  isCardLikedByUser,
} from './db/';
import { findDeckByCardId } from './decks';

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
      (_, imageTitle, imageFileNameWithExtension) => {
        return `![${imageTitle}](/api/content/${deck.id}/${imageFileNameWithExtension})`;
      }
    );

    const dbCardId = findCardIdInDb(cardIdWithoutExtension, deck.id);
    if (dbCardId === null) {
      console.error('Card not found in database for cardId:', cardId);
      return null;
    }

    const likes = getCardLikes(dbCardId);
    const isLiked = isCardLikedByUser(dbCardId, 2);
    const isBookmarked = isCardBookmarkedByUser(dbCardId, 2);

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
