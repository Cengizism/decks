'use client';

import { PathNode } from '@/interfaces/types';
import { useStateContext } from '@/providers/state-provider';
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
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from '@fluentui/react-nav-preview';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import HamburgerMenu from './hamburger-menu';
import classes from './navigation.module.css';

const DashboardIcons = bundleIcon(Board20Filled, Board20Regular);
const AboutIcons = bundleIcon(Info20Filled, Info20Regular);
const PathsIcons = bundleIcon(BranchFork20Filled, BranchFork20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);
const ContributorsIcons = bundleIcon(Person20Filled, Person20Regular);

interface NavigationProps {
  isOpen: boolean;
  toggleHamburgerMenu: () => void;
}

const paths = ['/contributors', '/decks', '/paths', '/about', '/'];

const Navigation: React.FC<NavigationProps> = ({
  isOpen,
  toggleHamburgerMenu,
}) => {
  const pathname = usePathname();
  const { state } = useStateContext();

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
      className={classes.root}
      selectedValue={selectedValue}
    >
      <NavDrawerHeader className={classes.hamburger}>
        <HamburgerMenu toggleHamburgerMenu={toggleHamburgerMenu} />
      </NavDrawerHeader>

      <NavDrawerBody className={classes.navigation}>
        <MenuItem path='/' icon={<DashboardIcons />} text='Dashboard' />
        <MenuItem path='/about' icon={<AboutIcons />} text='About' />

        <NavDivider />
        <NavSectionHeader>Overview</NavSectionHeader>
        <MenuItem path='/paths' icon={<PathsIcons />} text='Paths' />
        <MenuItem path='/decks' icon={<DecksIcons />} text='Decks' />
        <MenuItem
          path='/contributors'
          icon={<ContributorsIcons />}
          text='Contributors'
        />

        <NavDivider />
        <NavSectionHeader>Paths</NavSectionHeader>
        {state.nodes.paths
          .filter((path: PathNode) => path.decks.length > 0)
          .map((path: PathNode) => (
            <NavCategory key={path.id} value={path.id}>
              <NavCategoryItem icon={<PathsIcons />}>
                {path.title}
              </NavCategoryItem>
              <NavSubItemGroup>
                {path.decks.map((deck) => (
                  <NavCategory key={deck.id} value={deck.id}>
                    <NavCategoryItem icon={<DecksIcons />}>
                      {deck.title}
                    </NavCategoryItem>
                    <NavSubItemGroup>
                      {deck.cards.map((card) => (
                        <Link key={card.id} href={`/cards/${card.id}`} passHref>
                          <NavSubItem value={card.id}>{card.title}</NavSubItem>
                        </Link>
                      ))}
                    </NavSubItemGroup>
                  </NavCategory>
                ))}
              </NavSubItemGroup>
            </NavCategory>
          ))}
      </NavDrawerBody>
    </NavDrawer>
  );
};

export default Navigation;
