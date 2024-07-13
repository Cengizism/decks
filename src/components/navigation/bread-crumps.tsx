'use client';

import { useNodes } from '@/hooks/use-nodes';
import {
  CardType,
  ContributorType,
  DeckType,
  PathType,
} from '@/interfaces/types';
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
  Person20Filled,
  Person20Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

const DashboardIcons = bundleIcon(Board20Filled, Board20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);
const PathsIcons = bundleIcon(BranchFork20Filled, BranchFork20Regular);
const ContributorsIcons = bundleIcon(Person20Filled, Person20Regular);

interface BreadCrumpsProps {
  node?: PathType | DeckType | CardType | ContributorType;
}

const BreadCrumps: React.FC<BreadCrumpsProps> = ({ node }) => {
  const pathname = usePathname();
  const { findNode, getNodeType } = useNodes();

  const type = useMemo(() => node && getNodeType(node), [node, getNodeType]);
  const nodes = useMemo(
    () => (type ? findNode(node!.id, type) || {} : {}),
    [node, type, findNode]
  );

  const isContributorsPath = pathname?.startsWith('/contributors');
  const isDecksPath = pathname === '/decks';

  const contributorBreadcrumb = nodes.contributor && (
    <>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton>{(node as ContributorType)?.name}</BreadcrumbButton>
      </BreadcrumbItem>
    </>
  );

  const pathBreadcrumb = nodes.path && (
    <>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <Link href={`/paths/${nodes.path.id}`} passHref>
          <BreadcrumbButton icon={<PathsIcons />}>
            {nodes.path.title}
          </BreadcrumbButton>
        </Link>
      </BreadcrumbItem>
    </>
  );

  const deckBreadcrumb = nodes.deck && (
    <>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <Link href={`/decks/${nodes.deck.id}`} passHref>
          <BreadcrumbButton icon={<DecksIcons />}>
            {nodes.deck.title}
          </BreadcrumbButton>
        </Link>
      </BreadcrumbItem>
    </>
  );

  const cardBreadcrumb = nodes.card && (
    <>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton>{nodes.card.title}</BreadcrumbButton>
      </BreadcrumbItem>
    </>
  );

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <Link href='/' passHref>
          <BreadcrumbButton icon={<DashboardIcons />}>
            Dashboard
          </BreadcrumbButton>
        </Link>
      </BreadcrumbItem>

      {isContributorsPath ? (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href='/contributors' passHref>
              <BreadcrumbButton icon={<ContributorsIcons />}>
                Contributors
              </BreadcrumbButton>
            </Link>
          </BreadcrumbItem>
        </>
      ) : (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <Link href='/paths' passHref>
              <BreadcrumbButton icon={<PathsIcons />}>Paths</BreadcrumbButton>
            </Link>
          </BreadcrumbItem>

          {isDecksPath && (
            <>
              <BreadcrumbDivider />
              <BreadcrumbItem>
                <Link href='/decks' passHref>
                  <BreadcrumbButton icon={<DecksIcons />}>
                    Decks
                  </BreadcrumbButton>
                </Link>
              </BreadcrumbItem>
            </>
          )}
        </>
      )}

      {contributorBreadcrumb}
      {pathBreadcrumb}
      {deckBreadcrumb}
      {cardBreadcrumb}
    </Breadcrumb>
  );
};

export default React.memo(BreadCrumps);
