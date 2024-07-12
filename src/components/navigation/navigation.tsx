'use client';

import { makeStyles } from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  BookStar20Filled,
  BookStar20Regular,
  BranchFork20Filled,
  BranchFork20Regular,
  Info20Filled,
  Info20Regular,
  Person20Filled,
  Person20Regular,
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
const AboutIcons = bundleIcon(Info20Filled, Info20Regular);
const PathsIcons = bundleIcon(BranchFork20Filled, BranchFork20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);
const ContributorsIcons = bundleIcon(Person20Filled, Person20Regular);

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

interface NavigationProps {
  isOpen: boolean;
  toggleHamburgerMenu: () => void;
}

const paths = ['/contributors', '/decks', '/paths', '/about', '/'];

const Navigation: React.FC<NavigationProps> = ({
  isOpen,
  toggleHamburgerMenu,
}) => {
  const styles = useStyles();
  const pathname = usePathname();

  const [selectedValue, setSelectedValue] = useState(pathname);

  useEffect(() => {
    if (pathname?.startsWith('/cards')) {
      setSelectedValue('/decks');
    } else {
      const matchedPath = paths.find((path) => pathname?.startsWith(path));
      if (matchedPath) {
        setSelectedValue(matchedPath);
      }
    }
  }, [pathname]);

  const MenuItem: React.FC<{
    path: string;
    icon?: React.ReactNode;
    text: string;
  }> = ({ path, icon, text }) => (
    <Link href={path} passHref>
      <NavItem
        icon={<>{icon}</>}
        value={path}
        onClick={() => setSelectedValue(path)}
        aria-selected={selectedValue === path}
      >
        {text}
      </NavItem>
    </Link>
  );

  return (
    <NavDrawer
      open={isOpen}
      type='inline'
      className={styles.root}
      selectedValue={selectedValue}
    >
      <NavDrawerHeader className={styles.hamburger}>
        <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />
      </NavDrawerHeader>

      <NavDrawerBody className={styles.navigation}>
        <MenuItem path='/' icon={<DashboardIcons />} text='Dashboard' />
        <MenuItem path='/about' icon={<AboutIcons />} text='About' />

        <NavDivider />
        <NavSectionHeader>Content</NavSectionHeader>
        <MenuItem path='/paths' icon={<PathsIcons />} text='Paths' />
        <MenuItem path='/decks' icon={<DecksIcons />} text='Decks' />
        <MenuItem
          path='/contributors'
          icon={<ContributorsIcons />}
          text='Contributors'
        />
      </NavDrawerBody>
    </NavDrawer>
  );
};

export default Navigation;
