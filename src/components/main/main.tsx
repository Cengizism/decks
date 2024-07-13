'use client';

import AltenBrand from '@/components/app-bar/alten-brand';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import React, { useCallback, useMemo, useState } from 'react';

import HamburgerMenu from '../navigation/hamburger-menu';
import Navigation from '../navigation/navigation';
import styles from './main.module.css';

const useInlineStyles = makeStyles({
  header: {
    borderBottomColor: tokens.colorNeutralStroke1,
  },
});

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const inlineStyles = useInlineStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburgerMenu = useCallback(() => {
    setIsOpen((prev: Boolean) => !prev);
  }, []);

  const contentClasses = useMemo(
    () => mergeClasses(styles.content, isOpen && styles.narrowed),
    [isOpen]
  );

  return (
    <div className={styles.root}>
      <Navigation isOpen={isOpen} toggleHamburgerMenu={toggleHamburgerMenu} />

      <div className={styles.body}>
        <header className={mergeClasses(styles.header, inlineStyles.header)}>
          {!isOpen && (
            <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />
          )}
          <AltenBrand />
        </header>

        <div className={contentClasses}>{children}</div>
      </div>
    </div>
  );
};

export default React.memo(Main);
