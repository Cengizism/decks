import {
  Body1,
  Caption1,
  CardHeader,
  Divider,
  Link,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { PersonCircle32Filled } from '@fluentui/react-icons';
import React from 'react';

const useStyles = makeStyles({
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
  avatar: {
    position: 'relative',
    width: '32px',
    height: '32px',
    '& img': {
      position: 'absolute',
      top: '0',
      left: '0',
      borderRadius: '50%',
    },
  },
  subtle: {
    color: tokens.colorNeutralForeground4,
  },
});

const DeckContributor: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <Divider />
      <CardHeader
        image={<PersonCircle32Filled className={styles.subtle} />}
        header={
          <Body1>
            <b>Contributor Name</b>
          </Body1>
        }
        description={
          <Link className={styles.link} href={`/`}>
            <Caption1 className={styles.caption}>
              All decks of contributor
            </Caption1>
          </Link>
        }
      />
    </>
  );
};

export default DeckContributor;
