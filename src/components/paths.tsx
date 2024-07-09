'use client';

import { PathType } from '@/interfaces/types';
import { makeStyles } from '@fluentui/react-components';
import React from 'react';

import Path from './path';

const useStyles = makeStyles({
  main: {
    gap: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 6px',
    rowGap: '36px',
  },
});

interface PathsProps {
  paths: PathType[];
}

const Paths: React.FC<PathsProps> = ({ paths }) => {
  const styles = useStyles();

  return (
    <div className={styles.main}>
      {paths.map((path) => (
        <Path key={path.id} path={path} />
      ))}
    </div>
  );
};

export default Paths;
