'use client';

import { useStateContext } from '@/state/stateProvider';
import {
  Board20Filled,
  Board20Regular,
  Info20Filled,
  Info20Regular,
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
import React, { useEffect, useState } from 'react';

import HamburgerMenu from './hamburgerMenu';
import styles from './navigation.module.css';
import NavigationItem from './navigationItem';
import NavigationTree from './navigationTree';

const DashboardIcons = bundleIcon(Board20Filled, Board20Regular);
const AboutIcons = bundleIcon(Info20Filled, Info20Regular);

const ROUTE_PATHS = ['/contributors', '/decks', '/paths', '/about', '/'];

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { state, dispatch } = useStateContext();
  const { isNavigationDrawerOpen, selectedNavigationItem } = state.interface;

  useEffect(() => {
    dispatch({ type: 'SET_NAVIGATION_ITEM', payload: pathname || '' });
  }, []);

  useEffect(() => {
    if (pathname?.startsWith('/cards')) {
      dispatch({ type: 'SET_NAVIGATION_ITEM', payload: pathname || '' });
    } else {
      const matchedPath = ROUTE_PATHS.find((path) =>
        pathname?.startsWith(path)
      );
      if (matchedPath) {
        dispatch({ type: 'SET_NAVIGATION_ITEM', payload: matchedPath });
      }
    }
  }, [pathname]);

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
        <NavigationItem path='/paths' icon={<DashboardIcons />} text='Paths' />
        <NavigationItem path='/decks' icon={<DashboardIcons />} text='Decks' />
        <NavigationItem
          path='/contributors'
          icon={<DashboardIcons />}
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
