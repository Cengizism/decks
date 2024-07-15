'use client';

import CardStats from '@/components/card-stats/card-stats';
import { LinkComponent as Link } from '@/components/link/link';
import { useNodes } from '@/hooks/use-nodes';
import { CardType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Title3,
} from '@fluentui/react-components';
import {
  BookmarkFilled,
  BookmarkRegular,
  HeartFilled,
  HeartRegular,
} from '@fluentui/react-icons';
import React, { useMemo } from 'react';

import Cover from '../cover/cover';
import styles from './card.module.css';

interface CardComponentProps {
  card: CardType;
  actionForLiking: () => void;
  actionForBookmarking: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
  card,
  actionForLiking,
  actionForBookmarking,
}) => {
  const { getParent } = useNodes();
  const deck = useMemo(() => getParent(card), [card, getParent]);

  return (
    <Card className={styles.card}>
      <CardPreview>
        <Cover
          src={deck ? `/api/content/${deck.id}/images/${card.coverImage}` : ''}
          title={card.title}
          id={card.id}
        />
      </CardPreview>

      <CardHeader
        header={
          <Link href={`/cards/${card.id}`}>
            <Title3 truncate>{card.title}</Title3>
          </Link>
        }
        description={
          <Link href={`/decks/${deck?.id}`}>
            <Body1 truncate wrap={false}>
              {deck?.title}
            </Body1>
          </Link>
        }
        action={
          <div className={styles.actionButtons}>
            <Button
              appearance='secondary'
              icon={card.isLiked ? <HeartFilled /> : <HeartRegular />}
              onClick={actionForLiking}
            />
            <Button
              appearance='secondary'
              icon={
                card.isBookmarked ? <BookmarkFilled /> : <BookmarkRegular />
              }
              onClick={actionForBookmarking}
            />
          </div>
        }
      />

      <Body1 truncate wrap={false}>
        {card.excerpt}
      </Body1>

      <CardFooter>
        <Link href={`/cards/${card.id}`}>
          <Body1>Read more</Body1>
        </Link>
      </CardFooter>

      <CardStats>
        <HeartRegular />
        <Body1>{card.likes}</Body1>
      </CardStats>
    </Card>
  );
};

export default React.memo(CardComponent);
