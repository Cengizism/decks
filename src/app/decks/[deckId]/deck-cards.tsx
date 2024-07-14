'use client';

import { togglePostLikeStatus } from '@/actions/card-actions';
import Card from '@/components/card/card';
import { CardType } from '@/interfaces/types';
import React, { useOptimistic } from 'react';

import styles from '../../page.module.css';

interface DeckCardsProps {
  cards: any;
}

const DeckCards: React.FC<DeckCardsProps> = ({ cards }) => {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    cards,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post: any) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };

      // updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      // updatedPost.isLiked = !updatedPost.isLiked;

      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;

      console.log('newPosts', newPosts);
      console.log('prevPosts', prevPosts);
      console.log('updatedPostId', updatedPostId);
      console.log('updatedPost', updatedPost);

      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(cardId: any) {
    updateOptimisticPosts(cardId);
    await togglePostLikeStatus(cardId);
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
