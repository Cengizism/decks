'use client';

import { useNodes } from '@/hooks/use-nodes';
import { CardType } from '@/interfaces/types';
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
  Bookmark24Filled,
  Bookmark24Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import React, { useMemo } from 'react';

import styles from './card.module.css';
import CoverImage from './cover-image';

const BookmarkIcons = bundleIcon(Bookmark24Filled, Bookmark24Regular);

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

interface CardComponentProps {
  card: CardType;
}

const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  const inlineStyles = useInlineStyles();
  const { getParent } = useNodes();

  const deck = useMemo(() => getParent(card), [card, getParent]);

  return (
    <Card className={styles.card}>
      <CardPreview className={inlineStyles.grayBackground}>
        <CoverImage
          src={deck ? `/api/content/${deck.id}/images/${card.coverImage}` : ''}
          title={card.title}
          slug={card.id}
        />
      </CardPreview>

      <CardHeader
        header={
          <Link className={styles.link} href={`/cards/${card.id}`}>
            <Title3 truncate>{card.title}</Title3>
          </Link>
        }
        description={
          <Link className={styles.link} href={`/decks/${deck?.id}`}>
            <Caption1
              truncate
              wrap={false}
              className={mergeClasses(styles.caption, inlineStyles.caption)}
            >
              {deck?.title}
            </Caption1>
          </Link>
        }
        action={
          <Button
            appearance='transparent'
            className={mergeClasses(styles.bookmark, inlineStyles.bookmark)}
            icon={<BookmarkIcons />}
          />
        }
      />

      <Body1 truncate wrap={false} className={styles.text}>
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

export default React.memo(CardComponent);
