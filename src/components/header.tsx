'use client';

import { Body2, Caption1, LargeTitle } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import { format } from 'date-fns';
import React from 'react';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    margin: '36px 6px',
  },
  subTitle: {
    color: tokens.colorNeutralForeground4,
  },
});

interface HeaderProps {
  title: string;
  subTitle?: string;
  date?: Date;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle, date }) => {
  const styles = useStyles();

  const formattedDate = date ? format(date, 'EEEE, d MMMM yyyy') : null;

  return (
    <header className={styles.header}>
      <LargeTitle block>{title}</LargeTitle>
      {subTitle && <Body2 className={styles.subTitle}>{subTitle}</Body2>}
      {formattedDate && (
        <Caption1>
          <strong>Last modified:</strong>{' '}
          <time dateTime={date!.toISOString()}>{formattedDate}</time>
        </Caption1>
      )}
    </header>
  );
};

export default Header;
