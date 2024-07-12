'use client';

import { useDeckUtils } from '@/hooks/use-deck-utils';
import { ContributorType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Text,
  Title3,
  makeStyles,
} from '@fluentui/react-components';
import { Card, CardFooter, CardHeader } from '@fluentui/react-components';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles({
  card: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'middle',
    textDecoration: 'none',
    color: 'inherit',

    '&:hover': {
      textDecoration: 'underline',
      opacity: '0.8',
    },
  },
  text: {
    margin: '0',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    verticalAlign: 'middle',
  },
});

interface ContributorComponentProps {
  contributor: ContributorType;
}

const ContributorComponent: React.FC<ContributorComponentProps> = ({
  contributor,
}) => {
  const styles = useStyles();
  const { getDeckCountByContributorId } = useDeckUtils();

  const deckCount = getDeckCountByContributorId(contributor.id);

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Link
            className={styles.link}
            href={`/contributors/${contributor.id}`}
          >
            <Title3 truncate>{contributor.name}</Title3>
          </Link>
        }
      />

      <Body1 truncate wrap={false} className={styles.text}>
        {contributor.bio}
      </Body1>

      <CardFooter className={styles.footer}>
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
