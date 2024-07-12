'use client';

import { TITLE } from '@/constants';
import { Title1 } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import Image from 'next/image';
import Link from 'next/link';
import Logo from 'public/alten-logo.svg';
import React from 'react';

const useStyles = makeStyles({
  logo: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

const AltenLogo: React.FC = () => {
  const styles = useStyles();

  return (
    <hgroup>
      <Image src={Logo} alt='Alten Logo' priority />
      <Link className={styles.logo} href='/'>
        <Title1>{TITLE}</Title1>
      </Link>
    </hgroup>
  );
};

export default AltenLogo;
