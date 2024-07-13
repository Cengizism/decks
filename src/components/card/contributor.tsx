'use client';

import { useDeckUtils } from '@/hooks/use-deck-utils';
import { ContributorType } from '@/interfaces/types';
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

interface ContributorComponentProps {
  contributor: ContributorType;
}

const ContributorComponent: React.FC<ContributorComponentProps> = ({
  contributor,
}) => {
  const { getDeckCountByContributorId } = useDeckUtils();

  const deckCount = getDeckCountByContributorId(contributor.id);

  return (
    <Card className={classes.card}>
      <CardHeader
        header={
          <Link
            className={classes.link}
            href={`/contributors/${contributor.id}`}
          >
            <Title3 truncate>{contributor.name}</Title3>
          </Link>
        }
      />

      <Body1 truncate wrap={false} className={classes.text}>
        {contributor.bio}
      </Body1>

      <CardFooter>
        <Link href={`/contributors/${contributor.id}`}>
          <Button>Open profile</Button>
        </Link>
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

export default ContributorComponent;
