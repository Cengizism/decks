'use client';

import AltenBrand from '@/components/app-bar/alten-brand';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import React, { useCallback, useState } from 'react';

import HamburgerMenu from '../navigation/hamburger-menu';
import Navigation from '../navigation/navigation';
import classes from './main.module.css';

const useStyles = makeStyles({
  headerBorderColor: {
    borderBottomColor: tokens.colorNeutralStroke1,
  },
});

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburgerMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={classes.root}>
      <Navigation isOpen={isOpen} toggleHamburgerMenu={toggleHamburgerMenu} />

      <div className={classes.body}>
        <header
          className={mergeClasses(classes.header, styles.headerBorderColor)}
        >
          {!isOpen && (
            <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />
          )}

          <AltenBrand />
        </header>

        <div className={`${classes.content} ${isOpen ? classes.narrowed : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Main;
