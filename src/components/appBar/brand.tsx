'use client';

import { LinkComponent as Link } from '@/components/link/link';
import { TITLE } from '@/constants';
import { Title1 } from '@fluentui/react-components';
import React from 'react';

const Brand: React.FC = () => {
  return (
    <hgroup>
      <Link href='/'>
        <Title1>{TITLE}</Title1>
      </Link>
    </hgroup>
  );
};

export default Brand;
