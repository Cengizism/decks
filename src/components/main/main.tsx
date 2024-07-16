'use client';

import AppBar from '@/components/appBar/appBar';
import { mergeClasses } from '@fluentui/react-components';
import React, { useCallback, useState } from 'react';

import Navigation from '../navigation/navigation';
import styles from './main.module.css';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburgerMenu = useCallback(() => {
    setIsOpen((prev: Boolean) => !prev);
  }, []);

  return (
    <div className={styles.root}>
      <Navigation isOpen={isOpen} toggleHamburgerMenu={toggleHamburgerMenu} />

      <div className={styles.body}>
        <AppBar isOpen={isOpen} toggleHamburgerMenu={toggleHamburgerMenu} />

        <div
          className={mergeClasses(styles.content, isOpen && styles.narrowed)}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Main);
