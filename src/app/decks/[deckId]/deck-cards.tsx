'use client';

import { toggleLikeStatusOfCard } from '@/actions/card-actions';
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
    (prevCards, updatedCardId: string) => {
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
    }
  );

  if (!optimisticCards || optimisticCards.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(cardId: string) {
    startTransition(() => {
      updateOptimisticCards(cardId);
    });
    await toggleLikeStatusOfCard(cardId);
  }

  return (
    <div className={styles.grid}>
      {optimisticCards.map((card) => (
        <Card key={card.id} card={card} action={updatePost} />
      ))}
    </div>
  );
};

export default React.memo(DeckCards);
