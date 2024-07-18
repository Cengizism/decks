import Main from '@/components/main/main';
import PageHeader from '@/components/pageHeader/pageHeader';
import { getActiveSession } from '@/libraries/db';
import { getUserById } from '@/libraries/db/dbApi';
import Image from 'next/image';
import React from 'react';

const Profile: React.FC = () => {
  const activeSessionUserId = getActiveSession();
  const user = getUserById(activeSessionUserId as number);

  return (
    <Main>
      <Image
        src={user?.avatar as string}
        alt={user?.name as string}
        width={200}
        height={200}
      />
      <PageHeader
        title={user?.name as string}
        subTitle={user?.id === 1 ? 'Learner' : 'Contributor'}
      />
    </Main>
  );
};

export default Profile;
