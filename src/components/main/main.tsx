'use client';

import AppBar from '@/components/appBar/appBar';
import Navigation from '@/components/navigation/navigation';
import { useStateContext } from '@/state/stateProvider';
import { mergeClasses } from '@fluentui/react-components';
import React, { useMemo } from 'react';

import styles from './main.module.css';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const { state } = useStateContext();
  const { isNavigationDrawerOpen } = state.interface;

  const contentClass = useMemo(
    () =>
      mergeClasses(styles.content, isNavigationDrawerOpen && styles.narrowed),
    [isNavigationDrawerOpen]
  );

  return (
    <div className={styles.root}>
      <Navigation />

      <div className={styles.body}>
        <AppBar />

        <div className={contentClass}>{children}</div>
      </div>
    </div>
  );
};

export default React.memo(Main);
