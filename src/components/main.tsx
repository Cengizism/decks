'use client';

import { makeStyles } from '@fluentui/react-components';
import * as React from 'react';

import HamburgerMenu from './menu/hamburger-menu';
import Navigation from './menu/navigation';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    display: 'flex',
    height: '100vh',
  },
  content: {
    flex: '1',
    padding: '16px',
    display: 'grid',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default function Main(props: { children: React.ReactNode }) {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleHamburgerMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className={styles.root}>
      <Navigation isOpen={isOpen} toggleHamburgerMenu={toggleHamburgerMenu} />

      <div className={styles.content}>
        {!isOpen && <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />}

        <div>{props.children}</div>
      </div>
    </main>
  );
}
