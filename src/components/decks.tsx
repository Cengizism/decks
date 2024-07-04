'use client';

import { DeckType } from '@/interfaces/types';
import {
  Button,
  Caption1,
  Subtitle1,
  Text,
  Title3,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { Card, CardHeader } from '@fluentui/react-components';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles({
  main: {
    gap: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 6px',
    rowGap: '36px',
  },

  title: { margin: '0 0 12px' },

  card: {
    width: '300px',
    maxWidth: '100%',
    height: 'fit-content',
  },

  flex: {
    gap: '4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  cardFooter: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Decks = ({ decks }: { decks: DeckType[] }) => {
  const styles = useStyles();

  return (
    <div className={styles.main}>
      {decks.map((deck, index) => (
        <Card className={styles.card} key={index}>
          <CardHeader
            header={<Title3 truncate>{deck.title}</Title3>}
            description={
              <Caption1 truncate wrap={false} className={styles.caption}>
                {deck.description}
              </Caption1>
            }
          />

          <footer className={mergeClasses(styles.flex, styles.cardFooter)}>
            <span>
              <strong>Cards:</strong> {deck.cards?.length}
            </span>

            <Link href={`/decks/${deck.folder}`}>
              <Button>Open deck</Button>
            </Link>
          </footer>
        </Card>
      ))}
    </div>
  );
};

export default Decks;
