'use client';

import { toggleLikeStatusOfCard } from '@/actions/card-actions';
import Card from '@/components/card/card';
import { CardType } from '@/interfaces/types';
import React, { useOptimistic } from 'react';

import styles from '../../page.module.css';

interface DeckCardsProps {
  cards: any;
}

const DeckCards: React.FC<DeckCardsProps> = ({ cards }) => {
  const [optimisticCards, updateOptimisticCards] = useOptimistic(
    cards,
    (prevCards, updatedCardId) => {
      const updatedCardIndex = prevCards.findIndex(
        (card: any) => card.id === updatedCardId
      );

      if (updatedCardIndex === -1) {
        return prevCards;
      }

      const updatedCard = { ...prevCards[updatedCardIndex] };

      updatedCard.likes = updatedCard.likes + (updatedCard.isLiked ? -1 : 1);
      updatedCard.isLiked = !updatedCard.isLiked;

      const newCards = [...prevCards];
      newCards[updatedCardIndex] = updatedCard;

      return newCards;
    }
  );

  if (!optimisticCards || optimisticCards.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(cardId: any) {
    updateOptimisticCards(cardId);
    await toggleLikeStatusOfCard(cardId);
  }

  return (
    <div className={styles.grid}>
      {cards.map((card: CardType) => (
        <Card key={card.id} card={card} action={updatePost} />
      ))}
    </div>
  );
};

export default React.memo(DeckCards);
