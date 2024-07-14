'use server';

import { findDeckByCardId } from '@/libraries';
import { findCardIdInDb, updateCardLikeStatus } from '@/libraries/db';
import { revalidatePath } from 'next/cache';

export async function toggleLikeStatusOfCard(cardId: string) {
  const deck = findDeckByCardId(cardId);
  const cardIdInDb = deck ? findCardIdInDb(cardId, deck.id) : null;
  await updateCardLikeStatus(cardIdInDb as number, 2);
  revalidatePath('/', 'layout');
}