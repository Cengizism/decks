import { PathType } from '@/interfaces/types';
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

interface PathComponentProps {
  path: PathType;
}

const PathComponent: React.FC<PathComponentProps> = ({ path }) => {
  const styles = useStyles();

  const hasDecks = path.deckCount && path.deckCount > 0;

  console.log(path);

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Link className={styles.link} href={`/paths/${path.id}`}>
            <Title3 truncate>{path.title}</Title3>
          </Link>
        }
        // description={
        //   <Caption1 truncate wrap={false} className={styles.caption}>
        //       {path.description}
        //     </Caption1>
        // }
        // action={
        //   <Button
        //     appearance='transparent'
        //     className={styles.bookmark}
        //     icon={<BookmarkMultipleIcons />}
        //   />
        // }
      />

      <Body1 truncate wrap={false} className={styles.text}>
        {path.description}
      </Body1>

      <CardFooter className={styles.footer}>
        {hasDecks ? (
          <Link href={`/paths/${path.id}`}>
            <Button>View decks</Button>
          </Link>
        ) : null}
        <Text>
          {hasDecks ? (
            <>
              <strong>Decks:</strong> {path.deckCount}
            </>
          ) : (
            'No decks for this path'
          )}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default PathComponent;
