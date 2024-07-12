'use client';

import { TITLE } from '@/constants';
import { Title1 } from '@fluentui/react-components';
import Image from 'next/image';
import Link from 'next/link';
import Logo from 'public/alten-logo.svg';
import React from 'react';

import classes from './alten-brand.module.css';

const AltenBrand: React.FC = () => {
  return (
    <hgroup>
      <Image src={Logo} alt='Alten' priority />
      <Link className={classes.logo} href='/'>
        <Title1>{TITLE}</Title1>
      </Link>
    </hgroup>
  );
};

export default AltenBrand;
