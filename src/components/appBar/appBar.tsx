'use client';

import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import React from 'react';

import HamburgerMenu from '@/components/navigation/hamburgerMenu';
import AltenBrand from './altenBrand';
import styles from './appBar.module.css';
import ThemeSwitcher from './themeSwitcher';

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
      <hgroup>
        {!isOpen && <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />}
        <AltenBrand />
      </hgroup>
      <ThemeSwitcher />
    </header>
  );
};

export default AppBar;
