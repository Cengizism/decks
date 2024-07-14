'use server';

import { findDeckByCardId } from '@/libraries';
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
  if (cardIdInDb !== null) {
    if (type === 'like') {
      await updateCardLikeStatus(cardIdInDb, 2);
    } else {
      await updateCardBookmarkStatus(cardIdInDb, 2);
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
