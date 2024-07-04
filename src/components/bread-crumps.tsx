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

const BreadCrumps = ({ deck, card }: { deck?: DeckType; card?: CardType }) => {
  const decksPath = deck ? `/decks` : '';

  console.log('deck', deck);

  {/* <div>
        <Link href='/'>Home</Link>
        &nbsp;|&nbsp;
        <Link href={`/decks/${card.deck.folder}`}>
          {getDeckTitle(card.deck.folder)}
        </Link>
        &nbsp;|&nbsp;
        <span>{card.title}</span>
      </div> */}

  return (
    <Breadcrumb aria-label='Decks path'>
      <BreadcrumbItem>
        <Link href='/'>
          <BreadcrumbButton icon={<DashboardIcons />}>
            Dashboard
          </BreadcrumbButton>
        </Link>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <Link href={decksPath}>
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
    </Breadcrumb>
  );
};

export default BreadCrumps;
