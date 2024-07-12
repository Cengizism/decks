'use client';

import { useDeckUtils } from '@/hooks/use-deck-utils';
import { useNodes } from '@/hooks/use-nodes';
import { DeckType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Caption1,
  Text,
  Title3,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
} from '@fluentui/react-components';
import {
  BookmarkMultiple24Filled,
  BookmarkMultiple24Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import classes from './card.module.css';
import CoverImage from './cover-image';
import DeckContributor from './deck-contributor';

const BookmarkMultipleIcons = bundleIcon(
  BookmarkMultiple24Filled,
  BookmarkMultiple24Regular
);

const useStyles = makeStyles({
  captionColor: {
    color: tokens.colorNeutralForeground3,
  },
  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  bookmarkColor: {
    color: tokens.colorNeutralBackground1,
  },
});

interface DeckComponentProps {
  deck: DeckType;
}

const DeckComponent: React.FC<DeckComponentProps> = ({ deck }) => {
  const styles = useStyles();
  const { getParent } = useNodes();
  const { getCardCount, getContributorById } = useDeckUtils();
  const pathname = usePathname();

  const path = getParent(deck);
  const contributor = getContributorById(deck.contributorId);

  return (
    <Card className={classes.card}>
      <CardHeader
        header={
          <Link className={classes.link} href={`/decks/${deck.id}`}>
            <Title3 truncate>{deck.title}</Title3>
          </Link>
        }
        description={
          <Link className={classes.link} href={`/paths/${path?.id}`}>
            <Caption1
              truncate
              wrap={false}
              className={mergeClasses(classes.caption, styles.captionColor)}
            >
              {path?.title ?? 'No path'}
            </Caption1>
          </Link>
        }
        action={
          <Button
            appearance='transparent'
            className={mergeClasses(classes.bookmark, styles.bookmarkColor)}
            icon={<BookmarkMultipleIcons />}
          />
        }
      />

      <CardPreview className={styles.grayBackground}>
        <CoverImage src={`/${deck.coverImage}`} title={deck.title} />
      </CardPreview>

      <Body1 truncate wrap={false} className={classes.text}>
        {deck.description}
      </Body1>

      <CardFooter className={classes.footer}>
        <Link href={`/decks/${deck.id}`}>
          <Button>Open deck</Button>
        </Link>
        <Text>
          <strong>Cards:</strong> {getCardCount(deck)}
        </Text>
      </CardFooter>

      {pathname?.startsWith('/contributors') || (
        <DeckContributor contributor={contributor} />
      )}
    </Card>
  );
};

export default DeckComponent;
