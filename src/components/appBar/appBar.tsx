'use client';

import HamburgerMenu from '@/components/navigation/hamburgerMenu';
import { useStateContext } from '@/state/stateProvider';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { ArrowExitRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import React from 'react';

import AltenBrand from './altenBrand';
import styles from './appBar.module.css';
import Avatar from './avatar';
import ThemeSwitcher from './themeSwitcher';

const useInlineStyles = makeStyles({
  header: {
    borderBottomColor: tokens.colorNeutralStroke2,
  },
});

const AppBar: React.FC = () => {
  const inlineStyles = useInlineStyles();
  const { state } = useStateContext();
  const { isNavigationDrawerOpen } = state.interface;
  const { user } = state;

  return (
    <header className={mergeClasses(styles.header, inlineStyles.header)}>
      <hgroup>
        {!isNavigationDrawerOpen && <HamburgerMenu />}
        <AltenBrand />
      </hgroup>

      <Toolbar aria-label='Default'>
        <ThemeSwitcher />
        <ToolbarDivider />
        <Link href='/profile'>
          <Avatar user={user} />
        </Link>
        <ToolbarDivider />
        <ToolbarButton
          onClick={() => {
            console.log('Logging out...');
          }}
          aria-label='Log out'
          icon={<ArrowExitRegular />}
        />
      </Toolbar>
    </header>
  );
};

export default React.memo(AppBar);
