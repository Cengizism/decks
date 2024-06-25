'use client';

import {
  Text,
  Title1,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles({
  container: {
    ...shorthands.padding(tokens.spacingHorizontalXXL),
    ...shorthands.gap(tokens.spacingVerticalM),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
});

export default function Index() {
  const styles = useStyles();
  const [allDecks, setAllDecks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/decks');
      const decks = await response.json();
      setAllDecks(decks);
    };

    fetchData();
  }, []);

  return (
    <main className={styles.container}>
      <Title1 align='center'>Decks</Title1>
      <Text>
        I am learning React and <strong>Fluent UI</strong>.
      </Text>

      {allDecks.length > 0 && (
        <div>
          {allDecks.map((deck, index) => (
            <div key={index}>
              <Link href={`/deck/${deck.folder}`} passHref>
                <h4>{deck.title}</h4>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}