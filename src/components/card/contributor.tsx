'use client';

import { useDeckUtils } from '@/hooks/use-deck-utils';
import { ContributorType } from '@/interfaces/types';
import { Body1, Button, Text, Title3 } from '@fluentui/react-components';
import { Card, CardFooter, CardHeader } from '@fluentui/react-components';
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

      <CardFooter className={classes.footer}>
        <Link href={`/contributors/${contributor.id}`}>
          <Button>Open profile</Button>
        </Link>
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

export default ContributorComponent;
