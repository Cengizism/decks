'use client';

import Link from '@/components/link/link';
import { useDeckUtils } from '@/hooks/use-deck-utils';
import { PathType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Title3,
} from '@fluentui/react-components';
import { BookStar20Regular } from '@fluentui/react-icons';
import React, { useMemo } from 'react';

import styles from './card.module.css';

interface PathComponentProps {
  path: PathType;
}

const PathComponent: React.FC<PathComponentProps> = ({ path }) => {
  const { getDeckCount } = useDeckUtils();

  const deckCount = useMemo(() => getDeckCount(path), [path, getDeckCount]);

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Link href={`/paths/${path.id}`}>
            <Title3 truncate>{path.title}</Title3>
          </Link>
        }
      />

      <Body1 truncate wrap={false} className={styles.text}>
        {path.description}
      </Body1>

      <CardFooter>
        {deckCount > 0 && (
          <Link href={`/paths/${path.id}`}>
            <Button appearance='primary'>View decks</Button>
          </Link>
        )}
      </CardFooter>

      <footer className={styles.flex}>
        {deckCount > 0 ? (
          <>
            <BookStar20Regular />
            <Body1>{deckCount} deck(s)</Body1>
          </>
        ) : (
          <Body1 italic>No decks available</Body1>
        )}
      </footer>
    </Card>
  );
};

export default React.memo(PathComponent);
