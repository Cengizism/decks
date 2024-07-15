'use client';

import Link from '@/components/link/link';
import { useDeckUtils } from '@/hooks/use-deck-utils';
import { ContributorType } from '@/interfaces/types';
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

interface ContributorComponentProps {
  contributor: ContributorType;
}

const ContributorComponent: React.FC<ContributorComponentProps> = ({
  contributor,
}) => {
  const { getDeckCountByContributorId } = useDeckUtils();

  const deckCount = useMemo(
    () => getDeckCountByContributorId(contributor.id),
    [contributor.id, getDeckCountByContributorId]
  );

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Link href={`/contributors/${contributor.id}`}>
            <Title3 truncate>{contributor.name}</Title3>
          </Link>
        }
      />

      <Body1 truncate wrap={false} className={styles.text}>
        {contributor.bio}
      </Body1>

      <CardFooter>
        <Link href={`/contributors/${contributor.id}`}>
          <Button appearance='primary'>See profile</Button>
        </Link>
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

export default React.memo(ContributorComponent);
