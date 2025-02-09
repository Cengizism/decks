'use client';

import { Body2, Caption1, LargeTitle } from '@fluentui/react-components';
import { makeStyles, tokens } from '@fluentui/react-components';
import { format } from 'date-fns';
import React, { useMemo } from 'react';

import styles from './pageHeader.module.css';

const useInlineStyles = makeStyles({
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
  const inlineStyles = useInlineStyles();

  const formattedDate = useMemo(() => {
    return date ? format(date, 'EEEE, d MMMM yyyy') : null;
  }, [date]);

  return (
    <header className={styles.header}>
      <LargeTitle block>{title}</LargeTitle>
      {subTitle && <Body2 className={inlineStyles.subTitle}>{subTitle}</Body2>}
      {formattedDate && (
        <Caption1>
          <strong>Last modified:</strong>{' '}
          <time dateTime={date!.toISOString()}>{formattedDate}</time>
        </Caption1>
      )}
    </header>
  );
};

export default React.memo(PageHeader);
