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

import styles from './deck-contributor.module.css';

const useInlineStyles = makeStyles({
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  subtleColor: {
    color: tokens.colorNeutralForeground4,
  },
});

interface DeckContributorProps {
  contributor: ContributorType | undefined;
}

const DeckContributor: React.FC<DeckContributorProps> = ({ contributor }) => {
  const inlineStyles = useInlineStyles();

  const contributorName = useMemo(
    () => contributor?.name || 'Anonymous',
    [contributor]
  );
  const contributorLink = useMemo(
    () =>
      contributor ? (
        <Link className={styles.link} href={`/contributors/${contributor.id}`}>
          <Caption1
            className={mergeClasses(styles.caption, inlineStyles.caption)}
          >
            All decks of contributor
          </Caption1>
        </Link>
      ) : null,
    [contributor, inlineStyles.caption]
  );

  return (
    <CardHeader
      image={<PersonCircle32Filled className={inlineStyles.subtleColor} />}
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
