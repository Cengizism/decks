import Header from '@/components/header';
import { DESCRIPTION } from '@/lib/constants';
import * as React from 'react';

const Index: React.FC = () => {
  return (
    <>
      <Header title='Welcome to the platform' subTitle={DESCRIPTION} />
    </>
  );
};

export default Index;
