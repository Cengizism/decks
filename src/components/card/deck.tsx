'use client';

import { LinkComponent as FluentLink } from '@/components/link/link';
import { useDeckUtils } from '@/hooks/use-deck-utils';
import { useNodes } from '@/hooks/use-nodes';
import { DeckType } from '@/interfaces/types';
import {
  Body1,
  Button,
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

import CardStats from '../card-stats/card-stats';
import ContributedBy from '../contributed-by/contributed-by';
import Cover from '../cover/cover';
import styles from './card.module.css';

const BookmarkMultipleIcons = bundleIcon(
  BookmarkMultiple24Filled,
  BookmarkMultiple24Regular
);

const useInlineStyles = makeStyles({
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
          <FluentLink href={`/decks/${deck.id}`}>
            <Title3 truncate>{deck.title}</Title3>
          </FluentLink>
        }
        description={
          <FluentLink href={`/paths/${path?.id}`}>
            <Body1 truncate wrap={false}>
              {path?.title ?? 'No path'}
            </Body1>
          </FluentLink>
        }
        action={
          <Button
            appearance='transparent'
            className={mergeClasses(styles.bookmark, inlineStyles.bookmark)}
            icon={<BookmarkMultipleIcons />}
          />
        }
      />

      <CardPreview>
        <Link href={`/decks/${deck.id}`}>
          <Cover
            src={`/${deck.coverImage}`}
            title={deck.title}
            variant='small'
          />
        </Link>
      </CardPreview>

      <Body1 truncate wrap={false}>
        {deck.description}
      </Body1>

      <CardFooter>
        <FluentLink href={`/decks/${deck.id}`}>
          <Body1>See all cards</Body1>
        </FluentLink>
      </CardFooter>

      <CardStats>
        {cardCount > 0 ? (
          <>
            <BookStar20Regular />
            <Body1>{cardCount} card(s)</Body1>
          </>
        ) : (
          <Body1 italic>No cards available</Body1>
        )}
      </CardStats>
    </Card>
  );
};

export default React.memo(DeckComponent);
