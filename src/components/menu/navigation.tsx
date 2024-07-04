import { makeStyles } from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  BookInformation20Filled,
  BookInformation20Regular,
  BookStar20Filled,
  BookStar20Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
} from '@fluentui/react-nav-preview';
import Link from 'next/link';
import React from 'react';

import HamburgerMenu from './hamburger-menu';

const DashboardIcons = bundleIcon(Board20Filled, Board20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);
const AboutIcons = bundleIcon(
  BookInformation20Filled,
  BookInformation20Regular
);

const useStyles = makeStyles({
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

  return (
    <NavDrawer open={isOpen} type='inline'>
      <NavDrawerHeader>
        <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />
      </NavDrawerHeader>

      <NavDrawerBody className={styles.navigation}>
        <Link href='/'>
          <NavItem icon={<DashboardIcons />} value='1'>
            Dashboard
          </NavItem>
        </Link>
        <Link href='/about'>
          <NavItem icon={<AboutIcons />} value='2'>
            About
          </NavItem>
        </Link>
        <NavDivider />
        <Link href='/decks'>
          <NavItem icon={<DecksIcons />} value='3'>
            Decks
          </NavItem>
        </Link>
      </NavDrawerBody>
    </NavDrawer>
  );
};

export default Navigation;
