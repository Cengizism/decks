import { PathType } from '@/interfaces/types';

import { decks, paths } from './data';

export function getAllPaths(): PathType[] {
  return paths;
}

export function getPathById(id: string): PathType | null {
  return paths.find((path) => path.id === id) || null;
}

export function getPathOfDeck(deckId: string): PathType | null {
  const deck = decks.find((deck) => deck.id === deckId);
  return deck ? paths.find((path) => path.id === deck.pathId) || null : null;
}
