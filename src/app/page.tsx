import Main from '@/components/main/main';
import PageHeader from '@/components/pageHeader/pageHeader';
import { DESCRIPTION } from '@/constants';
import { getUser } from '@/libraries/api';
import * as React from 'react';
import UserSetter from './userSetter'; // TODO: Temporary solution!

const Index: React.FC = () => {
  const user = getUser();

  return (
    <Main>
      <PageHeader title='Welcome to the platform' subTitle={DESCRIPTION} />
      <UserSetter user={user} />
    </Main>
  );
};

export default Index;
