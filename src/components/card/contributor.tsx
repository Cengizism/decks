'use client';

import { LinkComponent as Link } from '@/components/link/link';
import { useDeckUtils } from '@/hooks/useDeckUtils';
import { ContributorType } from '@/interfaces/';
import {
  Body1,
  Card,
  CardFooter,
  CardHeader,
  Title3,
} from '@fluentui/react-components';
import { BookStar20Regular } from '@fluentui/react-icons';
import React, { useMemo } from 'react';

import CardStats from '../cardStats/cardStats';
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

      <Body1 truncate wrap={false}>
        {contributor.bio}
      </Body1>

      <CardFooter>
        <Link href={`/contributors/${contributor.id}`}>
          <Body1>See profile</Body1>
        </Link>
      </CardFooter>

      <CardStats>
        {deckCount > 0 ? (
          <>
            <BookStar20Regular />
            <Body1>{deckCount} deck(s)</Body1>
          </>
        ) : (
          <Body1 italic>No decks available</Body1>
        )}
      </CardStats>
    </Card>
  );
};

export default React.memo(ContributorComponent);
