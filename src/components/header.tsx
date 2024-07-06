'use client';

import { Caption1, Subtitle2, Title2 } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import { format } from 'date-fns';
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
      <Title2 block>{title}</Title2>
      {subTitle && (
        <Subtitle2 className={styles.subTitle}>{subTitle}</Subtitle2>
      )}
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
