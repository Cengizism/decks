import { CardType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Caption1,
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
import { Heart24Regular } from '@fluentui/react-icons';
import Link from 'next/link';
import React from 'react';

import CoverImage from './cover-image';

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
    right: '10px',
    color: tokens.colorNeutralBackground1,
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
        <CoverImage
          src={`/api/content/${card.deck.folder}/images/${card.coverImage}`}
          title={card.title}
          slug={card.slug}
        />
      </CardPreview>

      <CardHeader
        header={
          <Link className={styles.link} href={`/cards/${card.slug}`}>
            <Title3 truncate>{card.title}</Title3>
          </Link>
        }
        description={
          <Link className={styles.link} href={`/decks/${card.deck.folder}`}>
            <Caption1 truncate wrap={false} className={styles.caption}>
              {card.deck.title}
            </Caption1>
          </Link>
        }
        action={
          <Button
            appearance='transparent'
            className={styles.bookmark}
            icon={<Heart24Regular />}
          />
        }
      />

      <Body1 truncate wrap={false} className={styles.text}>
        {card.excerpt}
      </Body1>

      <CardFooter>
        <Link href={`/cards/${card.slug}`}>
          <Button>Read more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
