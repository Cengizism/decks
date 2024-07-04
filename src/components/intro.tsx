'use client';

import { DESCRIPTION, TITLE } from '@/lib/constants';
import { Text, Title1 } from '@fluentui/react-components';
import React from 'react';

const Intro = () => {
  return (
    <>
      <Title1 block>{TITLE}</Title1>
      <Text>{DESCRIPTION}</Text>
    </>
  );
};

export default Intro;
