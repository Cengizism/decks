'use client';

import { Caption1, Subtitle2, Title2 } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import React from 'react';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    margin: '20px 6px 36px 6px',
  },
  subTitle: {
    color: tokens.colorNeutralForeground4,
  },
});

const Header = ({
  title,
  subTitle,
  date,
}: {
  title: string;
  subTitle?: string;
  date?: Date;
}) => {
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <Title2 block>{title}</Title2>
      {subTitle && (
        <Subtitle2 className={styles.subTitle}>{subTitle}</Subtitle2>
      )}
      {date && (
        <Caption1>
          Last modified:{' '}
          <time dateTime={date.toISOString()}>{date.toString()}</time>
        </Caption1>
      )}
    </header>
  );
};

export default Header;
