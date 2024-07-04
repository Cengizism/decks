'use client';

import { CardType, DeckType } from '@/interfaces/types';
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
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import React from 'react';

const DashboardIcons = bundleIcon(Board20Filled, Board20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);

interface BreadCrumpsProps {
  deck?: DeckType;
  card?: CardType;
}

const BreadCrumps: React.FC<BreadCrumpsProps> = ({ deck, card }) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <Link href='/'>
          <BreadcrumbButton icon={<DashboardIcons />}>
            Dashboard
          </BreadcrumbButton>
        </Link>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <Link href='/decks'>
          <BreadcrumbButton icon={<DecksIcons />}>Decks</BreadcrumbButton>
        </Link>
      </BreadcrumbItem>
      {deck && (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton>{deck.title}</BreadcrumbButton>
          </BreadcrumbItem>
        </>
      )}
      {card && (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href={`/decks/${card.deck.folder}`}>
              <BreadcrumbButton>{card.deck.title}</BreadcrumbButton>
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
