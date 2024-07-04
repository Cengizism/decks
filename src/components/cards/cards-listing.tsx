'use client';

import { CardType } from '@/interfaces/types';
import { makeStyles } from '@fluentui/react-components';
import React from 'react';

import CardPresentation from './card-presentation';

const useStyles = makeStyles({
  main: {
    gap: '16px',
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const CardsListing = ({ cards }: { cards: CardType[] }) => {
  const styles = useStyles();

  return (
    <div>
      <div className={styles.main}>
        {cards.map((card) => (
          <CardPresentation card={card} key={card.title} />
        ))}
      </div>
    </div>
  );
};

export default CardsListing;
