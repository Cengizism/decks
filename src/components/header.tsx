'use client';

import { Body1, Title2 } from '@fluentui/react-components';
import { makeStyles } from '@fluentui/react-components';
import React from 'react';

const useStyles = makeStyles({
  header: {
    margin: '20px 6px 36px 6px',
  },
});

const Header = ({ title, subTitle }: { title: string; subTitle?: string }) => {
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <Title2 block>{title}</Title2>
      {subTitle && <Body1 block>{subTitle}</Body1>}
    </header>
  );
};

export default Header;
