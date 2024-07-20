'use server';

import {
  getUser,
  traceCardIdInDb,
  traceDeckByCardId,
  updateCardBookmarkStatus,
  updateCardLikeStatus,
} from '@/libraries/api';
import { revalidatePath } from 'next/cache';

async function toggleCardStatus(
  cardId: string,
  type: 'like' | 'bookmark'
): Promise<void> {
  const deck = traceDeckByCardId(cardId);
  if (!deck) return;

  const cardIdInDb = traceCardIdInDb(cardId, deck.id);
  if (!cardIdInDb) return;

  const user = getUser();
  if (!user) return;

  if (type === 'like') {
    await updateCardLikeStatus(cardIdInDb, user.id);
  } else {
    await updateCardBookmarkStatus(cardIdInDb, user.id);
  }

  revalidatePath('/', 'layout');
}

export async function toggleLikeStatusOfCard(cardId: string): Promise<void> {
  return toggleCardStatus(cardId, 'like');
}

export async function toggleBookmarkStatusOfCard(
  cardId: string
): Promise<void> {
  return toggleCardStatus(cardId, 'bookmark');
}
