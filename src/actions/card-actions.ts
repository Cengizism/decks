'use server';

import { findDeckByCardId } from '@/libraries';
import { findCardIdInDb, updateCardLikeStatus, updateCardBookmarkStatus } from '@/libraries/db/';
import { revalidatePath } from 'next/cache';

export async function toggleLikeStatusOfCard(cardId: string): Promise<void> {
  const deck = findDeckByCardId(cardId);
  const cardIdInDb = deck ? findCardIdInDb(cardId, deck.id) : null;
  if (cardIdInDb !== null) {
    await updateCardLikeStatus(cardIdInDb, 2);
    revalidatePath('/', 'layout');
  }
}

export async function toggleBookmarkStatusOfCard(cardId: string): Promise<void> {
  const deck = findDeckByCardId(cardId);
  const cardIdInDb = deck ? findCardIdInDb(cardId, deck.id) : null;
  if (cardIdInDb !== null) {
    await updateCardBookmarkStatus(cardIdInDb, 2);
    revalidatePath('/', 'layout');
  }
}