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

interface NavigationProps {
  isOpen: boolean;
  toggleHamburgerMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isOpen,
  toggleHamburgerMenu,
}) => {
  const styles = useStyles();
  const pathname = usePathname();

  const [selectedValue, setSelectedValue] = useState(pathname);

  useEffect(() => {
    setSelectedValue(pathname);
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
      defaultValue={selectedValue ?? ''}
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
        <MenuItem path='/paths' text='Paths' />
        <MenuItem path='/decks' icon={<DecksIcons />} text='Decks' />
      </NavDrawerBody>
    </NavDrawer>
  );
};

export default Navigation;
