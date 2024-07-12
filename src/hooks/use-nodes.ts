'use client';

import { useStateContext } from '@/providers/state-provider';
import { CardType, DeckType, NodesTreeType, PathType, NodeType } from '@/interfaces/types';
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

  const getImageUrl = (deck: DeckType, card: CardType): string => {
    return `/api/content/${deck.id}/images/${card.coverImage}`;
  };

  return {
    findNode: (nodeId: string, nodeType: 'path' | 'deck' | 'card') => findNode(state.nodes, nodeId, nodeType),
    getNodeType,
    getImageUrl,
  };
};
