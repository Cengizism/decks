'use client';

import { useDeckUtils } from '@/hooks/use-deck-utils';
import { PathType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Divider,
  Title3,
  mergeClasses,
} from '@fluentui/react-components';
import { Card, CardFooter, CardHeader } from '@fluentui/react-components';
import { BookStar20Regular } from '@fluentui/react-icons';
import Link from 'next/link';
import React from 'react';

import classes from './card.module.css';

interface PathComponentProps {
  path: PathType;
}

const PathComponent: React.FC<PathComponentProps> = ({ path }) => {
  const { getDeckCount } = useDeckUtils();

  const deckCount = getDeckCount(path);

  return (
    <Card className={classes.card}>
      <CardHeader
        header={
          <Link className={classes.link} href={`/paths/${path.id}`}>
            <Title3 truncate>{path.title}</Title3>
          </Link>
        }
      />

      <Body1 truncate wrap={false} className={classes.text}>
        {path.description}
      </Body1>

      <CardFooter>
        {deckCount > 0 && (
          <Link href={`/paths/${path.id}`}>
            <Button>View decks</Button>
          </Link>
        )}
      </CardFooter>

      <Divider />

      <footer className={mergeClasses(classes.flex, classes.stats)}>
        <div className={classes.flex}>
          {deckCount > 0 ? (
            <>
              <BookStar20Regular />
              <Body1>{deckCount} deck(s)</Body1>
            </>
          ) : (
            <Body1 italic>No decks available</Body1>
          )}
        </div>
      </footer>
    </Card>
  );
};

export default PathComponent;
