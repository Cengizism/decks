'use client';

import {
  toggleBookmarkStatusOfCard,
  toggleLikeStatusOfCard,
} from '@/actions/card-actions';
import Card from '@/components/card/card';
import { CardType } from '@/interfaces/types';
import { startTransition } from 'react';
import React, { useOptimistic } from 'react';

import styles from '../../page.module.css';

interface DeckCardsProps {
  cards: CardType[];
}

const DeckCards: React.FC<DeckCardsProps> = ({ cards }) => {
  const [optimisticCardsForLikes, updateOptimisticCardsForLikes] =
    useOptimistic(cards, (prevCards, updatedCardId: string) => {
      const updatedCardIndex = prevCards.findIndex(
        (card) => card.id === updatedCardId
      );

      if (updatedCardIndex === -1) {
        return prevCards;
      }

      const updatedCard = { ...prevCards[updatedCardIndex] };

      updatedCard.likes =
        (updatedCard.likes ?? 0) + (updatedCard.isLiked ? -1 : 1);
      updatedCard.isLiked = !updatedCard.isLiked;

      const newCards = [...prevCards];
      newCards[updatedCardIndex] = updatedCard;

      return newCards;
    });

  const [optimisticCardsForBookmarks, updateOptimisticCardsForBookmarks] =
    useOptimistic(cards, (prevCards, updatedCardId: string) => {
      const updatedCardIndex = prevCards.findIndex(
        (card) => card.id === updatedCardId
      );

      if (updatedCardIndex === -1) {
        return prevCards;
      }

      const updatedCard = { ...prevCards[updatedCardIndex] };

      updatedCard.isBookmarked = !updatedCard.isBookmarked;

      const newCards = [...prevCards];
      newCards[updatedCardIndex] = updatedCard;

      return newCards;
    });

  if (!optimisticCardsForLikes || optimisticCardsForLikes.length === 0) {
    return <p>There are no cards yet. Maybe start sharing some?</p>;
  }

  if (
    !optimisticCardsForBookmarks ||
    optimisticCardsForBookmarks.length === 0
  ) {
    return <p>There are no cards yet. Maybe start sharing some?</p>;
  }

  async function updateCardForLikes(cardId: string) {
    startTransition(() => {
      updateOptimisticCardsForLikes(cardId);
    });
    await toggleLikeStatusOfCard(cardId);
  }

  async function updateCardForBookmarks(cardId: string) {
    startTransition(() => {
      updateOptimisticCardsForBookmarks(cardId);
    });
    await toggleBookmarkStatusOfCard(cardId);
  }

  return (
    <div className={styles.grid}>
      {optimisticCardsForLikes.map((card) => (
        <Card
          key={card.id}
          card={card}
          actionForLikes={updateCardForLikes}
          actionForBookmarks={updateCardForBookmarks}
        />
      ))}
    </div>
  );
};

export default React.memo(DeckCards);
