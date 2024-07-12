'use client';

import { useStateContext } from '@/components/state-provider';
import {
  CardType,
  DeckType,
  NodeType,
  NodesTreeType,
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
  bundleIcon,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

const DashboardIcons = bundleIcon(Board20Filled, Board20Regular);
const DecksIcons = bundleIcon(BookStar20Filled, BookStar20Regular);
const PathsIcons = bundleIcon(BranchFork20Filled, BranchFork20Regular);

interface BreadCrumpsProps {
  node?: PathType | DeckType | CardType;
}

const BreadCrumps: React.FC<BreadCrumpsProps> = ({ node }) => {
  const pathname = usePathname();
  const { state } = useStateContext();

  const findNode = useMemo(() => {
    return (
      tree: NodesTreeType,
      nodeId: string,
      nodeType: 'path' | 'deck' | 'card'
    ): { path?: NodeType; deck?: NodeType; card?: NodeType } | null => {
      for (const path of tree.paths) {
        if (nodeType === 'path' && path.id === nodeId) {
          return { path };
        }
        for (const deck of path.decks) {
          if (nodeType === 'deck' && deck.id === nodeId) {
            return { path, deck };
          }
          for (const card of deck.cards) {
            if (nodeType === 'card' && card.id === nodeId) {
              return { path, deck, card };
            }
          }
        }
      }
      return null;
    };
  }, []);

  const getNodeType = useMemo(() => {
    return (
      node: PathType | DeckType | CardType
    ): 'path' | 'deck' | 'card' | undefined => {
      if ('description' in node && !('pathId' in node)) {
        return 'path';
      } else if ('pathId' in node) {
        return 'deck';
      } else if ('excerpt' in node) {
        return 'card';
      }
      return undefined;
    };
  }, []);

  const type = node && getNodeType(node);
  const nodes = useMemo(
    () => (type ? findNode(state.nodes, node.id, type) || {} : {}),
    [type, node, findNode, state.nodes]
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

      {nodes.path && (
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
      )}

      {nodes.deck && (
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
      )}

      {nodes.card && (
        <>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton>{nodes.card.title}</BreadcrumbButton>
          </BreadcrumbItem>
        </>
      )}
    </Breadcrumb>
  );
};

export default BreadCrumps;
