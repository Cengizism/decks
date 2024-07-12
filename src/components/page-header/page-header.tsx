'use client';

import { Body2, Caption1, LargeTitle } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import { format } from 'date-fns';
import React from 'react';

import classes from './page-header.module.css';

const useStyles = makeStyles({
  subTitle: {
    color: tokens.colorNeutralForeground4,
  },
});

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  date?: Date;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle, date }) => {
  const styles = useStyles();

  const formattedDate = date ? format(date, 'EEEE, d MMMM yyyy') : null;

  return (
    <header className={classes.header}>
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

export default PageHeader;
