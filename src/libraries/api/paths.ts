import { PathType } from '@/interfaces/types';

import { decks, paths } from './data';

export function getAllPaths(): PathType[] {
  const pathsWithDecks = paths.filter((path) =>
    decks.some((deck) => deck.pathId === path.id)
  );
  return pathsWithDecks;
}

export function getPathById(id: string): PathType | null {
  const path = paths.find((path) => path.id === id);
  return path && decks.some((deck) => deck.pathId === path.id) ? path : null;
}

export function getPathOfDeck(deckId: string): PathType | null {
  const deck = decks.find((deck) => deck.id === deckId);
  if (deck) {
    return paths.find((path) => path.id === deck.pathId) || null;
  }
  return null;
}
