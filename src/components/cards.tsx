'use client';

import { CardType } from '@/interfaces/types';
import { makeStyles } from '@fluentui/react-components';
import React from 'react';

import Card from './card';

const useStyles = makeStyles({
  main: {
    gap: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 6px'
  },
});

const Cards = ({ cards }: { cards: CardType[] }) => {
  const styles = useStyles();

  return (
    <div>
      <div className={styles.main}>
        {cards.map((card) => (
          <Card card={card} key={card.title} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
