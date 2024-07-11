import {
  CardType,
  ContributorType,
  DeckType,
  PathType,
} from '@/interfaces/types';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import contributors from '../../content/contributors.json';
import decks from '../../content/decks.json';
import paths from '../../content/paths.json';

const contentDirectory = join(process.cwd(), 'content');

// File system functions
function readCardFiles(folder: string): string[] {
  const deckPath = join(contentDirectory, folder);
  const cardFiles = fs
    .readdirSync(deckPath)
    .filter((file) => file.endsWith('.mdx'));
  return cardFiles;
}

// Indexing functions
export function indexCardIds(): { cardId: string }[] {
  return decks.flatMap(({ folder }) => {
    const cardFiles = readCardFiles(folder);
    return cardFiles.map((cardId) => ({
      cardId: cardId.replace(/\.mdx$/, ''),
    }));
  });
}

export function indexDeckIds(): { deckId: string }[] {
  return decks.map((deck) => ({
    deckId: deck.folder,
  }));
}

export function indexPathIds(): { pathId: string }[] {
  return paths.map((path) => ({
    pathId: path.id,
  }));
}

export function indexContributorIds(): { contributorId: string }[] {
  return contributors.map((contributor) => ({
    contributorId: contributor.id,
  }));
}

// Deck functions
export function findDeckByCardId(cardId: string): DeckType | undefined {
  for (const deck of decks) {
    const cardFiles = readCardFiles(deck.folder);
    if (cardFiles.includes(cardId + '.mdx')) {
      return deck;
    }
  }
  return undefined;
}

export function getDeckTitle(folder: string): string | undefined {
  const deck = decks.find((deck: DeckType) => deck.folder === folder);
  return deck?.title;
}

export function getAllDecks(): DeckType[] {
  return decks.map((deck) => ({
    ...deck,
    // Extract cardSlugs for the deck
    // cardSlugs: readCardFiles(deck.folder)
  }));
}

export function getDeckById(id: string): DeckType | null {
  const deck = decks.find((deck) => deck.folder === id) || null;
  return deck;
}

export function getDecksByPathId(pathId: string): DeckType[] {
  return decks
    .filter((deck) => deck.pathId === pathId)
    .map((deck) => ({
      ...deck,
      // Extract cardSlugs for the deck
      // cardSlugs: readCardFiles(deck.folder)
    }));
}

// Card functions
export function getCardById(slug: string): CardType | null {
  if (!slug) {
    console.error('Invalid slug parameter:', { slug });
    return null;
  }

  const fsCardId = slug.replace(/\.mdx$/, '');
  const deck = findDeckByCardId(fsCardId);
  if (!deck) {
    console.error('Deck not found for slug:', { slug });
    return null;
  }

  const fullPath = join(contentDirectory, deck.folder, `${fsCardId}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = content.replace(
      /!\[([^\]]*)\]\((images\/[^)]+)\)/g,
      (match, imageTitle, imageFileNameWithExtension) => {
        return `![${imageTitle}](/api/content/${deck.folder}/${imageFileNameWithExtension})`;
      }
    );

    const card = {
      ...data,
      id: fsCardId,
      content: processedContent,
      // deck: deck.folder
    } as CardType;

    return card;
  } catch (error) {
    console.error(`Error reading file at path ${fullPath}:`, error);
    return null;
  }
}

// New function to get cards by deck
export function getCardsOfDeck(deck: DeckType): CardType[] {
  const { folder: deckFolder } = deck;
  const cardFiles = readCardFiles(deckFolder);
  return cardFiles
    .map((cardId) => getCardById(cardId.replace(/\.mdx$/, '')))
    .filter((card) => card !== null) as CardType[];
}

// Path functions
export function getAllPaths(): PathType[] {
  return paths.map((path: PathType) => {
    // Extract deckCount for the path
    // const deckCount = decks.filter(deck => deck.pathId === path.id).length;
    return {
      ...path,
      // deckCount
    };
  });
}

export function getPathById(id: string): PathType | null {
  const path = paths.find((p: PathType) => p.id === id) || null;
  if (path) {
    // Extract deckCount for the path
    // const deckCount = decks.filter(deck => deck.pathId === id).length;
    return {
      ...path,
      // deckCount
    };
  }
  return null;
}

export function getPathOfDeck(deckId: string): PathType | null {
  const deck = decks.find((deck) => deck.folder === deckId) || null;
  if (deck) {
    const path = paths.find((p: PathType) => p.id === deck.pathId) || null;
    if (path) {
      // Extract deckCount for the path
      // const deckCount = decks.filter(d => d.pathId === path.id).length;
      return {
        ...path,
        // deckCount
      };
    }
  }
  return null;
}

// Contributor functions
export function getAllContributors(): ContributorType[] {
  return contributors.map((contributor: ContributorType) => ({
    id: contributor.id,
    name: contributor.name,
    email: contributor.email,
  }));
}

export function getContributorById(id: string): ContributorType | null {
  const contributor =
    contributors.find((c: ContributorType) => c.id === id) || null;
  return contributor
    ? { id: contributor.id, name: contributor.name, email: contributor.email }
    : null;
}
