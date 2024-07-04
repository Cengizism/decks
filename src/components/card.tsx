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
// import { Heart24Regular } from '@fluentui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

const useStyles = makeStyles({
  card: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },
  caption: {
    color: tokens.colorNeutralForeground3,
    width: '290px',
    display: 'block',
    overflow: 'hidden',
  },
  text: { margin: '0' },
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

type CardComponentProps = {
  card: CardType;
};

const CardComponent = ({ card }: CardComponentProps) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardPreview className={styles.grayBackground}>
        <Image src={card.coverImage} alt={card.title} width={120} height={60} />
      </CardPreview>

      <CardHeader
        header={<Title3 truncate>{card.title}</Title3>}
        description={
          <Caption1 truncate wrap={false} className={styles.caption}>
            {card.deck.title}
          </Caption1>
        }
        // action={
        //   <Button
        //     appearance='transparent'
        //     className={styles.bookmark}
        //     icon={<Heart24Regular />}
        //   />
        // }
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
