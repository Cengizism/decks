import { CardType, DeckType } from '@/interfaces/types';

import { getCardById } from './cards';
import { decksData } from './data';
import { readCardFiles } from './file-system';

export function findDeckByCardId(cardId: string): DeckType | undefined {
  return decksData.find((deck) =>
    readCardFiles(deck.id).includes(`${cardId}.mdx`)
  );
}

export function getAllDecks(): DeckType[] {
  return decksData;
}

export function getDeckById(id: string): DeckType | null {
  return decksData.find((deck) => deck.id === id) || null;
}

export function getDecksByPathId(pathId: string): DeckType[] {
  return decksData.filter((deck) => deck.pathId === pathId);
}

export function getDecksByContributorId(contributorId: string): DeckType[] {
  return decksData.filter((deck) => deck.contributorId === contributorId);
}

export function getCardsOfDeck(deck: DeckType): CardType[] {
  return readCardFiles(deck.id)
    .map((cardFile) => getCardById(cardFile.replace(/\.mdx$/, '')))
    .filter((card): card is CardType => card !== null);
}
