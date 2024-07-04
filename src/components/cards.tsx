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
    margin: '0 6px',
    rowGap: '36px',
  },
});

const Cards = ({ cards }: { cards: CardType[] }) => {
  const styles = useStyles();

  return (
    <div className={styles.main}>
      {cards.map((card) => (
        <Card card={card} key={card.title} />
      ))}
    </div>
  );
};

export default Cards;
