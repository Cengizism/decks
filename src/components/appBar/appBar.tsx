'use client';

import HamburgerMenu from '@/components/navigation/hamburgerMenu';
import { useStateContext } from '@/state/stateProvider';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import React from 'react';

import AltenBrand from './altenBrand';
import styles from './appBar.module.css';
import ThemeSwitcher from './themeSwitcher';

const useInlineStyles = makeStyles({
  header: {
    borderBottomColor: tokens.colorNeutralStroke1,
  },
});

const AppBar: React.FC = () => {
  const inlineStyles = useInlineStyles();
  const { state } = useStateContext();
  const { isNavigationDrawerOpen } = state.interface;

  return (
    <header className={mergeClasses(styles.header, inlineStyles.header)}>
      <hgroup>
        {!isNavigationDrawerOpen && <HamburgerMenu />}
        <AltenBrand />
      </hgroup>
      <ThemeSwitcher />
    </header>
  );
};

export default React.memo(AppBar);
