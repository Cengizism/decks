'use client';

import {
  CardType,
  DeckNode,
  DeckType,
  NodeType,
  NodesTreeType,
  PathNode,
  PathType,
} from '@/interfaces/types';
import { useStateContext } from '@/providers/state-provider';
import { useMemo } from 'react';

export const useNodes = () => {
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

  const getParent = useMemo(() => {
    return (node: any): PathType | DeckType | undefined => {
      const nodeType = getNodeType(node);
      if (nodeType === 'card') {
        const deck = state.nodes.paths
          .flatMap((path: PathNode) => path.decks)
          .find((deck: DeckNode) => deck.cards.some((c) => c.id === node.id));
        return deck;
      } else if (nodeType === 'deck') {
        const path = state.nodes.paths.find((path: PathNode) =>
          path.decks.some((d) => d.id === node.id)
        );
        return path;
      }
      return undefined;
    };
  }, [state.nodes, getNodeType]);

  return {
    findNode: (nodeId: string, nodeType: 'path' | 'deck' | 'card') =>
      findNode(state.nodes, nodeId, nodeType),
    getNodeType,
    getParent,
  };
};
