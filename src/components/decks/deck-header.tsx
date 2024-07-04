'use client';

import { DeckType } from '@/interfaces/types';
import { DESCRIPTION } from '@/lib/constants';
import { Text, Title1 } from '@fluentui/react-components';
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

const DeckHeader = ({ deck }: { deck?: DeckType }) => {
  const decksPath = deck ? `/decks` : '';

  return (
    <>
      <Title1 block>{deck?.title || 'Decks'}</Title1>
      <Text>{deck?.description || DESCRIPTION}</Text>

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
    </>
  );
};

export default DeckHeader;
