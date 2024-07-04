'use client';

import { makeStyles } from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  BookStar20Filled,
  BookStar20Regular,
  Info20Filled,
  Info20Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
} from '@fluentui/react-nav-preview';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import HamburgerMenu from './hamburger-menu';

const DashboardIcons = bundleIcon(Board20Filled, Board20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);
const AboutIcons = bundleIcon(Info20Filled, Info20Regular);

const useStyles = makeStyles({
  root: {
    paddingTop: '18px',
  },
  hamburger: {
    paddingLeft: '14px',
  },
  navigation: {
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    },
    '& a button': {
      ':hover': {
        cursor: 'pointer',
      },
    },
  },
});

type NavigationProps = {
  isOpen: boolean;
  toggleHamburgerMenu: () => void;
};

const Navigation = ({ isOpen, toggleHamburgerMenu }: NavigationProps) => {
  const styles = useStyles();
  const pathname = usePathname();

  const [selectedValue, setSelectedValue] = useState('1');

  useEffect(() => {
    switch (pathname) {
      case '/':
        setSelectedValue('1');
        break;
      case '/about':
        setSelectedValue('2');
        break;
      default:
    }
  }, [pathname]);

  return (
    <NavDrawer
      open={isOpen}
      type='inline'
      className={styles.root}
      defaultValue={selectedValue}
      selectedValue={selectedValue}
    >
      <NavDrawerHeader className={styles.hamburger}>
        <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />
      </NavDrawerHeader>

      <NavDrawerBody className={styles.navigation}>
        <Link href='/'>
          <NavItem
            icon={<DashboardIcons />}
            value='1'
            onClick={() => setSelectedValue('1')}
          >
            Dashboard
          </NavItem>
        </Link>
        <Link href='/about'>
          <NavItem
            icon={<AboutIcons />}
            value='2'
            onClick={() => setSelectedValue('2')}
          >
            About
          </NavItem>
        </Link>

        <NavDivider />

        <NavSectionHeader>Content</NavSectionHeader>
        <Link href='/decks'>
          <NavItem
            icon={<DecksIcons />}
            value='3'
            onClick={() => setSelectedValue('3')}
          >
            Decks
          </NavItem>
        </Link>
      </NavDrawerBody>
    </NavDrawer>
  );
};

export default Navigation;
