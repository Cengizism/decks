'use server';

import { findDeckByCardId, getUser } from '@/libraries/api';
import {
  findCardIdInDb,
  updateCardBookmarkStatus,
  updateCardLikeStatus,
} from '@/libraries/db/';
import { revalidatePath } from 'next/cache';

async function toggleCardStatus(
  cardId: string,
  type: 'like' | 'bookmark'
): Promise<void> {
  const deck = findDeckByCardId(cardId);
  const cardIdInDb = deck ? findCardIdInDb(cardId, deck.id) : null;

  const user = getUser();

  if (cardIdInDb !== null) {
    if (type === 'like') {
      await updateCardLikeStatus(cardIdInDb, user?.id || 0); // TODO: Temporary
    } else {
      await updateCardBookmarkStatus(cardIdInDb, user?.id || 0); // TODO: Temporary
    }
    revalidatePath('/', 'layout');
  }
}

export async function toggleLikeStatusOfCard(cardId: string): Promise<void> {
  return toggleCardStatus(cardId, 'like');
}

export async function toggleBookmarkStatusOfCard(
  cardId: string
): Promise<void> {
  return toggleCardStatus(cardId, 'bookmark');
}
