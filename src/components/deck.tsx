import { DeckType } from '@/interfaces/types';
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
  BookmarkMultiple24Filled,
  BookmarkMultiple24Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import React from 'react';

import CoverImage from './cover-image';
import DeckContributor from './deck-contributor';

const BookmarkMultipleIcons = bundleIcon(
  BookmarkMultiple24Filled,
  BookmarkMultiple24Regular
);

const useStyles = makeStyles({
  card: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content',
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'middle',
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
    // color: tokens.colorNeutralBackground1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    verticalAlign: 'middle',
  },
});

interface DeckComponentProps {
  deck: DeckType;
}

const DeckComponent: React.FC<DeckComponentProps> = ({ deck }) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Link className={styles.link} href={`/decks/${deck.id}`}>
            <Title3 truncate>{deck.title}</Title3>
          </Link>
        }
        // description={
        //   <Link className={styles.link} href={`/paths/${deck.path?.id}`}>
        //     <Caption1 truncate wrap={false} className={styles.caption}>
        //       {deck.path?.title ?? 'No path'}
        //     </Caption1>
        //   </Link>
        // }
        action={
          <Button
            appearance='transparent'
            className={styles.bookmark}
            icon={<BookmarkMultipleIcons />}
          />
        }
      />

      <CardPreview className={styles.grayBackground}>
        <CoverImage src={`/${deck.coverImage}`} title={deck.title} />
      </CardPreview>

      <Body1 truncate wrap={false} className={styles.text}>
        {deck.description}
      </Body1>

      <CardFooter className={styles.footer}>
        <Link href={`/decks/${deck.id}`}>
          <Button>Open deck</Button>
        </Link>
        {/* <Text>
          <strong>Cards:</strong> {deck.cardSlugs?.length ?? 0}
        </Text> */}
      </CardFooter>

      {/* <DeckContributor contributor={deck.contributor} /> */}
    </Card>
  );
};

export default DeckComponent;
