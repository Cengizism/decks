import { useDeckUtils } from '@/hooks/use-deck-utils';
import { ContributorType } from '@/interfaces/types';
import {
  Caption1,
  CardHeader,
  Link as FluentLink,
  Subtitle2,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { PersonCircle32Filled } from '@fluentui/react-icons';
import Link from 'next/link';
import React, { useMemo } from 'react';

import styles from './contributed-by.module.css';

const useInlineStyles = makeStyles({
  caption: {
    color: tokens.colorNeutralForeground3,
  },
  subtleColor: {
    color: tokens.colorNeutralForeground4,
  },
});

interface ContributedByProps {
  contributor: ContributorType | undefined;
}

const ContributedBy: React.FC<ContributedByProps> = ({ contributor }) => {
  const inlineStyles = useInlineStyles();
  const { getDeckCountByContributorId } = useDeckUtils();
  const contributionCount = useMemo(
    () => getDeckCountByContributorId(contributor?.id || ''),
    [contributor, getDeckCountByContributorId]
  );

  const contributorName = useMemo(
    () => contributor?.name || 'Anonymous',
    [contributor]
  );
  const contributorLink = useMemo(
    () =>
      contributor ? (
        <Caption1
          className={mergeClasses(styles.caption, inlineStyles.caption)}
        >
          {contributionCount} contribution(s)
        </Caption1>
      ) : null,
    [contributor, contributionCount, inlineStyles.caption]
  );

  return (
    <CardHeader
      image={<PersonCircle32Filled className={inlineStyles.subtleColor} />}
      header={
        <Link href={`/contributors/${contributor?.id}`}>
          <FluentLink as='span'>
            <Subtitle2>{contributorName}</Subtitle2>
          </FluentLink>
        </Link>
      }
      description={contributorLink}
    />
  );
};

export default React.memo(ContributedBy);
