import Main from '@/components/main/main';
import PageHeader from '@/components/pageHeader/pageHeader';
import { DESCRIPTION } from '@/constants';
import * as React from 'react';

const Index: React.FC = () => {
  return (
    <Main>
      <PageHeader title='Welcome to the platform' subTitle={DESCRIPTION} />
    </Main>
  );
};

export default Index;
