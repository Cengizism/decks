import { ContributorType } from '@/interfaces/types';
import {
  Body1,
  Caption1,
  CardHeader,
  Link,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { PersonCircle32Filled } from '@fluentui/react-icons';
import React, { useMemo } from 'react';

import classes from './deck-contributor.module.css';

const useStyles = makeStyles({
  captionColor: {
    color: tokens.colorNeutralForeground3,
  },
  subtle: {
    color: tokens.colorNeutralForeground4,
  },
});

interface DeckContributorProps {
  contributor: ContributorType | undefined;
}

const DeckContributor: React.FC<DeckContributorProps> = ({ contributor }) => {
  const styles = useStyles();

  const contributorName = useMemo(
    () => contributor?.name || 'Anonymous',
    [contributor]
  );
  const contributorLink = useMemo(
    () =>
      contributor ? (
        <Link className={classes.link} href={`/contributors/${contributor.id}`}>
          <Caption1
            className={mergeClasses(classes.caption, styles.captionColor)}
          >
            All decks of contributor
          </Caption1>
        </Link>
      ) : null,
    [contributor, styles.captionColor]
  );

  return (
    <CardHeader
      image={<PersonCircle32Filled className={styles.subtle} />}
      header={
        <Body1>
          <b>{contributorName}</b>
        </Body1>
      }
      description={contributorLink}
    />
  );
};

export default React.memo(DeckContributor);
