import { PathType } from '@/interfaces/types';
import {
  Body1,
  Button,
  Text,
  Title3,
  makeStyles,
} from '@fluentui/react-components';
import { Card, CardFooter, CardHeader } from '@fluentui/react-components';
import Link from 'next/link';
import React from 'react';

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
  text: {
    margin: '0',
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

  // const hasDecks = path.deckCount && path.deckCount > 0;

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Link className={styles.link} href={`/paths/${path.id}`}>
            <Title3 truncate>{path.title}</Title3>
          </Link>
        }
      />

      <Body1 truncate wrap={false} className={styles.text}>
        {path.description}
      </Body1>

      {/* <CardFooter className={styles.footer}>
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
      </CardFooter> */}
    </Card>
  );
};

export default PathComponent;
