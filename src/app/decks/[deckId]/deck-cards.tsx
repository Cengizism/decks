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
  const [optimisticCards, updateOptimisticCards] = useOptimistic(
    cards,
    (prevCards, updatedCard: { id: string; type: 'like' | 'bookmark' }) => {
      const updatedCardIndex = prevCards.findIndex(
        (card) => card.id === updatedCard.id
      );
      if (updatedCardIndex === -1) return prevCards;

      const updatedCardData = { ...prevCards[updatedCardIndex] };
      if (updatedCard.type === 'like') {
        updatedCardData.likes =
          (updatedCardData.likes ?? 0) + (updatedCardData.isLiked ? -1 : 1);
        updatedCardData.isLiked = !updatedCardData.isLiked;
      } else {
        updatedCardData.isBookmarked = !updatedCardData.isBookmarked;
      }

      const newCards = [...prevCards];
      newCards[updatedCardIndex] = updatedCardData;
      return newCards;
    }
  );

  if (!optimisticCards || optimisticCards.length === 0) {
    return <p>There are no cards yet. Maybe start sharing some?</p>;
  }

  async function updateCardStatus(cardId: string, type: 'like' | 'bookmark') {
    startTransition(() => {
      updateOptimisticCards({ id: cardId, type });
    });
    if (type === 'like') {
      await toggleLikeStatusOfCard(cardId);
    } else {
      await toggleBookmarkStatusOfCard(cardId);
    }
  }

  return (
    <div className={styles.grid}>
      {optimisticCards.map((card) => (
        <Card
          key={card.id}
          card={card}
          actionForLiking={() => updateCardStatus(card.id, 'like')}
          actionForBookmarking={() => updateCardStatus(card.id, 'bookmark')}
        />
      ))}
    </div>
  );
};

export default React.memo(DeckCards);
