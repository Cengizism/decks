'use client';

import { CardType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Caption1,
  Text,
  Title3,
  makeStyles,
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

import CoverImage from './cover-image';

const BookmarkIcons = bundleIcon(Bookmark24Filled, Bookmark24Regular);

const useStyles = makeStyles({
  card: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',

    '&:hover': {
      textDecoration: 'underline',
      opacity: '0.8',
    },
  },
  caption: {
    color: tokens.colorNeutralForeground3,
    width: '290px',
    display: 'block',
    overflow: 'hidden',
  },
  text: {
    margin: '0',
  },
  grayBackground: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  bookmark: {
    position: 'absolute',
    top: '10px',
    right: '5px',
    color: tokens.colorNeutralBackground1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    verticalAlign: 'middle',
  },
});

interface CardComponentProps {
  card: CardType;
}

const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardPreview className={styles.grayBackground}>
        {/* <CoverImage
          src={
            card.deck?.id
              ? `/api/content/${card.deck.id}/images/${card.coverImage}`
              : ''
          }
          title={card.title}
          slug={card.id}
        /> */}
      </CardPreview>

      <CardHeader
        header={
          <Link className={styles.link} href={`/cards/${card.id}`}>
            <Title3 truncate>{card.title}</Title3>
          </Link>
        }
        // description={
        //   <Link className={styles.link} href={`/decks/${card.deck?.id}`}>
        //     <Caption1 truncate wrap={false} className={styles.caption}>
        //       {card.deck?.title}
        //     </Caption1>
        //   </Link>
        // }
        action={
          <Button
            appearance='transparent'
            className={styles.bookmark}
            icon={<BookmarkIcons />}
          />
        }
      />

      <Body1 truncate wrap={false} className={styles.text}>
        {card.excerpt}
      </Body1>

      <CardFooter className={styles.footer}>
        <Link href={`/cards/${card.id}`}>
          <Button>Read more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
