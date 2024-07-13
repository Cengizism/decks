import { PathType } from '@/interfaces/types';

import { decksData, pathsData } from './data';

export function getAllPaths(): PathType[] {
  return pathsData;
}

export function getPathById(id: string): PathType | null {
  return pathsData.find((path) => path.id === id) || null;
}

export function getPathOfDeck(deckId: string): PathType | null {
  const deck = decksData.find((deck) => deck.id === deckId);
  return deck
    ? pathsData.find((path) => path.id === deck.pathId) || null
    : null;
}
