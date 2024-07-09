'use client';

import { CardType, DeckType, PathType } from '@/interfaces/types';
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
} from '@fluentui/react-components';
import {
  Board20Filled,
  Board20Regular,
  BookStar20Filled,
  BookStar20Regular,
  BranchFork20Filled,
  BranchFork20Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashboardIcons = bundleIcon(Board20Filled, Board20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);
const PathsIcons = bundleIcon(BranchFork20Filled, BranchFork20Regular);

interface BreadCrumpsProps {
  path?: PathType | null;
  deck?: DeckType | null;
  card?: CardType | null;
}

const BreadCrumps: React.FC<BreadCrumpsProps> = ({ path, deck, card }) => {
  const pathname = usePathname();
  const effectivePath = path || deck?.path || card?.deck?.path;

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <Link href='/' passHref>
          <BreadcrumbButton icon={<DashboardIcons />}>
            Dashboard
          </BreadcrumbButton>
        </Link>
      </BreadcrumbItem>

      <BreadcrumbDivider />
      <BreadcrumbItem>
        <Link href='/paths' passHref>
          <BreadcrumbButton icon={<PathsIcons />}>Paths</BreadcrumbButton>
        </Link>
      </BreadcrumbItem>

      {pathname === '/decks' && (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href='/decks' passHref>
              <BreadcrumbButton icon={<DecksIcons />}>Decks</BreadcrumbButton>
            </Link>
          </BreadcrumbItem>
        </>
      )}

      {effectivePath && (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href={`/paths/${effectivePath.id}`} passHref>
              <BreadcrumbButton icon={<PathsIcons />}>
                {effectivePath.title}
              </BreadcrumbButton>
            </Link>
          </BreadcrumbItem>
        </>
      )}

      {deck && (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href={`/decks/${deck.folder}`} passHref>
              <BreadcrumbButton icon={<DecksIcons />}>
                {deck.title}
              </BreadcrumbButton>
            </Link>
          </BreadcrumbItem>
        </>
      )}

      {card && (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href={`/decks/${card.deck?.folder}`} passHref>
              <BreadcrumbButton icon={<DecksIcons />}>
                {card.deck?.title}
              </BreadcrumbButton>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton>{card.title}</BreadcrumbButton>
          </BreadcrumbItem>
        </>
      )}
    </Breadcrumb>
  );
};

export default BreadCrumps;
