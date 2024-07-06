'use client';

import { TITLE } from '@/lib/constants';
import { Title1 } from '@fluentui/react-components';
import Image from 'next/image';
import React from 'react';

const AltenLogo: React.FC = () => (
  <hgroup>
    <Image src='/alten-logo.svg' alt='Alten Logo' width={21} height={32} />
    <Title1>{TITLE}</Title1>
  </hgroup>
);

export default AltenLogo;
