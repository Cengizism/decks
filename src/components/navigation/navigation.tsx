'use client';

import { useStateContext } from '@/state/stateProvider';
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
  NavSectionHeader,
} from '@fluentui/react-nav-preview';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

import HamburgerMenu from './hamburgerMenu';
import styles from './navigation.module.css';
import NavigationItem from './navigationItem';
import NavigationTree from './navigationTree';

const DashboardIcons = bundleIcon(Board20Filled, Board20Regular);
const AboutIcons = bundleIcon(Info20Filled, Info20Regular);
const PathsIcons = bundleIcon(BranchFork20Filled, BranchFork20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);
const ContributorsIcons = bundleIcon(Person20Filled, Person20Regular);

const ROUTE_PATHS = ['/contributors', '/decks', '/paths', '/about', '/'];

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { state, dispatch } = useStateContext();
  const { isNavigationDrawerOpen, selectedNavigationItem } = state.interface;

  useEffect(() => {
    let pathToSet = pathname || '';
    const matchedPath = ROUTE_PATHS.find((route) =>
      pathname?.startsWith(route)
    );
    if (matchedPath) {
      pathToSet = matchedPath;
    }

    dispatch({ type: 'SET_NAVIGATION_ITEM', payload: pathToSet });
  }, [pathname, dispatch]);

  return (
    <NavDrawer
      open={isNavigationDrawerOpen}
      type='inline'
      className={styles.root}
      selectedValue={selectedNavigationItem}
    >
      <NavDrawerHeader className={styles.hamburger}>
        <HamburgerMenu />
      </NavDrawerHeader>

      <NavDrawerBody className={styles.navigation}>
        <NavigationItem path='/' icon={<DashboardIcons />} text='Dashboard' />
        <NavigationItem path='/about' icon={<AboutIcons />} text='About' />

        <NavDivider />
        <NavSectionHeader>Overview</NavSectionHeader>
        <NavigationItem path='/paths' icon={<PathsIcons />} text='Paths' />
        <NavigationItem path='/decks' icon={<DecksIcons />} text='Decks' />
        <NavigationItem
          path='/contributors'
          icon={<ContributorsIcons />}
          text='Contributors'
        />

        <NavDivider />
        <NavSectionHeader>Paths</NavSectionHeader>
        <NavigationTree />
      </NavDrawerBody>
    </NavDrawer>
  );
};

export default React.memo(Navigation);
