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
  BookmarkFilled,
  BookmarkRegular,
  HeartFilled,
  HeartRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import React, { useMemo } from 'react';

import Cover from '../cover/cover';
import styles from './card.module.css';

const BookmarkIcons = bundleIcon(BookmarkFilled, BookmarkRegular);

const useInlineStyles = makeStyles({
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  actionButton: {
    color: tokens.colorNeutralBackground1,
  },
});

interface CardComponentProps {
  card: CardType;
  action: (id: string) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ card, action }) => {
  const inlineStyles = useInlineStyles();
  const { getParent } = useNodes();

  const deck = useMemo(() => getParent(card), [card, getParent]);

  return (
    <Card className={styles.card}>
      <CardPreview className={inlineStyles.grayBackground}>
        <Cover
          src={deck ? `/api/content/${deck.id}/images/${card.coverImage}` : ''}
          title={card.title}
          id={card.id}
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
          <div className={styles.action}>
            <Button
              appearance='transparent'
              className={inlineStyles.actionButton}
              size='large'
              icon={card.isLiked ? <HeartFilled /> : <HeartRegular />}
              onClick={() => action(card.id)}
            />
            <Button
              appearance='transparent'
              className={mergeClasses(inlineStyles.actionButton)}
              size='large'
              icon={<BookmarkIcons />}
              onClick={() => action(card.id)} // Assuming same action for bookmark
            />
          </div>
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

      <footer className={styles.flex}>
        <HeartRegular />
        <Body1>{card.likes}</Body1>
      </footer>
    </Card>
  );
};

export default React.memo(CardComponent);
