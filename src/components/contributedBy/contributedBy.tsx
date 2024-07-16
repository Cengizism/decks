import { LinkComponent as Link } from '@/components/link/link';
import { useDeckUtils } from '@/hooks/useDeckUtils';
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

  return (
    <CardHeader
      image={
        <Link href={`/contributors/${contributor?.id}`}>
          <PersonCircle32Filled />
        </Link>
      }
      header={
        <Link href={`/contributors/${contributor?.id}`}>
          <Subtitle2>{contributor?.name || 'Anonymous'}</Subtitle2>
        </Link>
      }
      description={<Body1>{contributionCount} contribution(s)</Body1>}
    />
  );
};

export default React.memo(ContributedBy);
