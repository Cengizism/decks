'use client';

import { DeckType } from '@/interfaces/types';
import { makeStyles } from '@fluentui/react-components';
import React from 'react';

import Deck from './deck';

const useStyles = makeStyles({
  main: {
    gap: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 6px',
    rowGap: '36px',
  },
});

interface DecksProps {
  decks: DeckType[];
}

const Decks: React.FC<DecksProps> = ({ decks }) => {
  const styles = useStyles();

  return (
    <div className={styles.main}>
      {decks.map((deck) => (
        <Deck key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

export default Decks;
