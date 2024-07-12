import PageHeader from '@/components/page-header/page-header';
import { DESCRIPTION } from '@/constants';
import * as React from 'react';

const Index: React.FC = () => {
  return (
    <>
      <PageHeader title='Welcome to the platform' subTitle={DESCRIPTION} />
    </>
  );
};

export default Index;
