'use client';

import { useNodes } from '@/hooks/use-nodes';
import { CardType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Caption1,
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
  Bookmark24Filled,
  Bookmark24Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import React from 'react';

import classes from './card.module.css';
import CoverImage from './cover-image';

const BookmarkIcons = bundleIcon(Bookmark24Filled, Bookmark24Regular);

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

interface CardComponentProps {
  card: CardType;
}

const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  const styles = useStyles();
  const { getParent } = useNodes();

  const deck = getParent(card);

  return (
    <Card className={classes.card}>
      <CardPreview className={styles.grayBackground}>
        <CoverImage
          src={deck ? `/api/content/${deck.id}/images/${card.coverImage}` : ''}
          title={card.title}
          slug={card.id}
        />
      </CardPreview>

      <CardHeader
        header={
          <Link className={classes.link} href={`/cards/${card.id}`}>
            <Title3 truncate>{card.title}</Title3>
          </Link>
        }
        description={
          <Link className={classes.link} href={`/decks/${deck?.id}`}>
            <Caption1
              truncate
              wrap={false}
              className={mergeClasses(classes.caption, styles.captionColor)}
            >
              {deck?.title}
            </Caption1>
          </Link>
        }
        action={
          <Button
            appearance='transparent'
            className={mergeClasses(classes.bookmark, styles.bookmarkColor)}
            icon={<BookmarkIcons />}
          />
        }
      />

      <Body1 truncate wrap={false} className={classes.text}>
        {card.excerpt}
      </Body1>

      <CardFooter>
        <Link href={`/cards/${card.id}`}>
          <Button>Read more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
