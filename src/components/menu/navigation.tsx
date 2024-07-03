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

type NavigationProps = {
  isOpen: boolean;
  toggleHamburgerMenu: () => void;
};

const Navigation = ({ isOpen, toggleHamburgerMenu }: NavigationProps) => {
  return (
    <NavDrawer open={isOpen} type='inline'>
      <NavDrawerHeader>
        <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />
      </NavDrawerHeader>

      <NavDrawerBody>
        <NavItem icon={<DashboardIcons />} value='1'>
          <Link href='/' passHref>
            Dashboard
          </Link>
        </NavItem>
        <NavItem icon={<AboutIcons />} value='2'>
          <Link href='/about' passHref>
            About
          </Link>
        </NavItem>
        <NavDivider />
        <NavItem icon={<DecksIcons />} value='3'>
          <Link href='/decks' passHref>
            Decks
          </Link>
        </NavItem>
      </NavDrawerBody>
    </NavDrawer>
  );
};

export default Navigation;
