'use client';

import {
  ContributorType,
  DeckNode,
  DeckType,
  PathNode,
  PathType,
} from '@/interfaces/types';
import { useStateContext } from '@/state/state-provider';
import { useMemo } from 'react';

export const useDeckUtils = () => {
  const { state } = useStateContext();

  const getCardCount = useMemo(() => {
    return (deck: DeckType): number => {
      const deckNode = state.nodes.paths
        .flatMap((path: PathNode) => path.decks)
        .find((d: DeckNode) => d.id === deck.id);
      return deckNode ? deckNode.cards.length : 0;
    };
  }, [state.nodes]);

  const getDeckCount = useMemo(() => {
    return (path: PathType): number => {
      const pathNode = state.nodes.paths.find(
        (p: PathNode) => p.id === path.id
      );
      return pathNode ? pathNode.decks.length : 0;
    };
  }, [state.nodes]);

  const getContributorById = useMemo(() => {
    return (contributorId: string): ContributorType | undefined => {
      return state.contributors.find(
        (contributor: ContributorType) => contributor.id === contributorId
      );
    };
  }, [state.contributors]);

  const getDeckCountByContributorId = useMemo(() => {
    return (contributorId: string): number => {
      return state.decks.filter(
        (deck: DeckType) => deck.contributorId === contributorId
      ).length;
    };
  }, [state.decks]);

  return {
    getCardCount,
    getDeckCount,
    getContributorById,
    getDeckCountByContributorId,
  };
};
