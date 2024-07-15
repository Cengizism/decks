import { LinkComponent as Link } from '@/components/link/link';
import { useDeckUtils } from '@/hooks/use-deck-utils';
import { ContributorType } from '@/interfaces/types';
import { Body1, CardHeader, Subtitle2 } from '@fluentui/react-components';
import { PersonCircle32Filled } from '@fluentui/react-icons';
import React, { useMemo } from 'react';

interface ContributedByProps {
  contributor: ContributorType | undefined;
}

const ContributedBy: React.FC<ContributedByProps> = ({ contributor }) => {
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
      contributor ? <Body1>{contributionCount} contribution(s)</Body1> : null,
    [contributor, contributionCount]
  );

  return (
    <CardHeader
      image={<PersonCircle32Filled />}
      header={
        <Link href={`/contributors/${contributor?.id}`}>
          <Subtitle2>{contributorName}</Subtitle2>
        </Link>
      }
      description={contributorLink}
    />
  );
};

export default React.memo(ContributedBy);
