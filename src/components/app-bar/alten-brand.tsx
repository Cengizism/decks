'use client';

import { LinkComponent as Link } from '@/components/link/link';
import { TITLE } from '@/constants';
import { Title1 } from '@fluentui/react-components';
import Image from 'next/image';
import Logo from 'public/alten-logo.svg';
import React from 'react';

const AltenBrand: React.FC = () => {
  return (
    <hgroup>
      <Image src={Logo} alt='Alten' priority />
      <Link href='/'>
        <Title1>{TITLE}</Title1>
      </Link>
    </hgroup>
  );
};

export default AltenBrand;
