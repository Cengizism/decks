'use client';

import { useDeckUtils } from '@/hooks/use-deck-utils';
import { PathType } from '@/interfaces/types';
import { Body1, Button, Text, Title3 } from '@fluentui/react-components';
import { Card, CardFooter, CardHeader } from '@fluentui/react-components';
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

      <CardFooter className={classes.footer}>
        {deckCount > 0 ? (
          <Link href={`/paths/${path.id}`}>
            <Button>View decks</Button>
          </Link>
        ) : null}
        <Text>
          {deckCount > 0 ? (
            <>
              <strong>Decks:</strong> {deckCount}
            </>
          ) : (
            'No decks for this path'
          )}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default PathComponent;
