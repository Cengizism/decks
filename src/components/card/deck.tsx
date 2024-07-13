'use client';

import { useDeckUtils } from '@/hooks/use-deck-utils';
import { useNodes } from '@/hooks/use-nodes';
import { DeckType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Title3,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import {
  BookStar20Regular,
  BookmarkMultiple24Filled,
  BookmarkMultiple24Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

import ContributedBy from '../contributed-by/contributed-by';
import Cover from '../cover/cover';
import styles from './card.module.css';

const BookmarkMultipleIcons = bundleIcon(
  BookmarkMultiple24Filled,
  BookmarkMultiple24Regular
);

const useInlineStyles = makeStyles({
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  bookmark: {
    color: tokens.colorNeutralBackground1,
  },
});

interface DeckComponentProps {
  deck: DeckType;
}

const DeckComponent: React.FC<DeckComponentProps> = ({ deck }) => {
  const inlineStyles = useInlineStyles();
  const { getParent } = useNodes();
  const { getCardCount, getContributorById } = useDeckUtils();
  const pathname = usePathname();

  const path = useMemo(() => getParent(deck), [deck, getParent]);
  const contributor = useMemo(
    () => getContributorById(deck.contributorId),
    [deck.contributorId, getContributorById]
  );
  const cardCount = useMemo(() => getCardCount(deck), [deck, getCardCount]);

  return (
    <Card className={styles.card}>
      {pathname?.startsWith('/contributors') || (
        <ContributedBy contributor={contributor} />
      )}

      <CardHeader
        header={
          <Link className={styles.link} href={`/decks/${deck.id}`}>
            <Title3 truncate>{deck.title}</Title3>
          </Link>
        }
        description={
          <Link className={styles.link} href={`/paths/${path?.id}`}>
            <Caption1
              truncate
              wrap={false}
              className={mergeClasses(styles.caption, inlineStyles.caption)}
            >
              {path?.title ?? 'No path'}
            </Caption1>
          </Link>
        }
        action={
          <Button
            appearance='transparent'
            className={mergeClasses(styles.bookmark, inlineStyles.bookmark)}
            icon={<BookmarkMultipleIcons />}
          />
        }
      />

      <CardPreview className={inlineStyles.grayBackground}>
        <Cover src={`/${deck.coverImage}`} title={deck.title} variant='small' />
      </CardPreview>

      <Body1 truncate wrap={false} className={styles.text}>
        {deck.description}
      </Body1>

      <CardFooter>
        <Link href={`/decks/${deck.id}`}>
          <Button>Open deck</Button>
        </Link>
      </CardFooter>

      <footer className={mergeClasses(styles.flex, styles.stats)}>
        <div className={styles.flex}>
          {cardCount > 0 ? (
            <>
              <BookStar20Regular />
              <Body1>{cardCount} card(s)</Body1>
            </>
          ) : (
            <Body1 italic>No cards available</Body1>
          )}
        </div>
      </footer>
    </Card>
  );
};

export default React.memo(DeckComponent);
