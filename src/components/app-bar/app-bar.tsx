'use client';

import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import React from 'react';

import HamburgerMenu from '../navigation/hamburger-menu';
import AltenBrand from './alten-brand';
import styles from './app-bar.module.css';
import ThemeSwitcher from './theme-switcher';

const useInlineStyles = makeStyles({
  header: {
    borderBottomColor: tokens.colorNeutralStroke1,
  },
});

interface AppBarProps {
  isOpen: boolean;
  toggleHamburgerMenu: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ isOpen, toggleHamburgerMenu }) => {
  const inlineStyles = useInlineStyles();

  return (
    <header className={mergeClasses(styles.header, inlineStyles.header)}>
      {!isOpen && <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />}
      <AltenBrand />
      <ThemeSwitcher />
    </header>
  );
};

export default AppBar;
