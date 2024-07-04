'use client';

import AltenLogo from '@/components/alten-logo';
import { TITLE } from '@/lib/constants';
import { Title1, makeStyles, tokens } from '@fluentui/react-components';
import * as React from 'react';

import HamburgerMenu from './menu/hamburger-menu';
import Navigation from './menu/navigation';

const useStyles = makeStyles({
  root: {
    overflow: 'hidden',
    display: 'flex',
    height: '100vh',
    width: '100vw',
  },
  body: {
    flex: '1',
    display: 'grid',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'left',
    gap: '20px',
    padding: '16px',
    alignItems: 'center',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,

    '& > button': {
      marginTop: '4px',
    },

    '& hgroup': {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 16px 90px 16px',
    height: '100vh',
    width: '100vw !important',
    overflow: 'auto',
  },
  narrowed: {
    width: 'calc(100vw - 260px) !important',
  },
});

export default function Main(props: { children: React.ReactNode }) {
  const styles = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleHamburgerMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <Navigation isOpen={isOpen} toggleHamburgerMenu={toggleHamburgerMenu} />

      <div className={styles.body}>
        <header className={styles.header}>
          {!isOpen && (
            <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />
          )}

          <hgroup>
            <AltenLogo />
            <Title1>{TITLE}</Title1>
          </hgroup>
        </header>

        <div className={`${styles.content} ${isOpen ? styles.narrowed : ''}`}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
