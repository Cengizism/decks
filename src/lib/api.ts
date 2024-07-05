import { CardSlugType, CardType, DeckType } from '@/interfaces/types';
import fs from 'fs/promises';
import { watch } from 'fs';
import matter from 'gray-matter';
import path from 'path';

import decks from '../../content/decks.json';

const excludeFiles: string[] = ['.DS_Store'];
const contentDirectory = path.join(process.cwd(), 'content');

const cache = {
  slugs: [] as CardSlugType[],
  cards: new Map<string, CardType>(),
  decks: decks,
  deckContents: new Map<string, string[]>(),
};

// Utility Functions
async function readDirectory(folderPath: string): Promise<string[]> {
  const files = await fs.readdir(folderPath);
  return files.filter((file) => !excludeFiles.includes(file));
}

async function getDeckContents(folder: string): Promise<string[]> {
  if (cache.deckContents.has(folder)) {
    return cache.deckContents.get(folder) || [];
  }

  const contents = await readDirectory(path.join(contentDirectory, folder));
  cache.deckContents.set(folder, contents);

  return contents;
}

async function updateCache(directory: string) {
  cache.slugs = [];
  cache.cards.clear();
  cache.deckContents.clear();

  await getCardSlugs();
  await getAllCards();

  console.log(`Cache updated due to changes in ${directory}`);
}

// Card Retrieval Functions
export async function getCardSlugs(): Promise<CardSlugType[]> {
  if (cache.slugs.length > 0) {
    return cache.slugs;
  }

  const slugPromises = decks.map(async ({ folder }) => {
    const slugs = await getDeckContents(folder);

    return slugs.map((slug) => ({
      slug: slug.replace(/\.mdx$/, ''),
      deck: folder,
    }));
  });

  cache.slugs = (await Promise.all(slugPromises)).flat();

  return cache.slugs;
}

export async function getCardBySlug(slug: string): Promise<CardType | null> {
  if (!slug) {
    console.error('Invalid slug parameter:', { slug });
    return null;
  }

  const realSlug = slug.replace(/\.mdx$/, '');

  if (cache.cards.has(realSlug)) {
    return cache.cards.get(realSlug) || null;
  }

  let deckFolder: string | undefined;

  for (const deck of decks) {
    const cardFiles = await getDeckContents(deck.folder);

    if (cardFiles.includes(realSlug + '.mdx')) {
      deckFolder = deck.folder;
      break;
    }
  }

  if (!deckFolder) {
    console.error('Deck not found for slug:', { slug });
    return null;
  }

  const fullPath = path.join(contentDirectory, deckFolder, `${realSlug}.mdx`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const deck = decks.find((d: DeckType) => d.folder === deckFolder);

    const card = {
      ...data,
      slug: realSlug,
      content,
      deck: {
        folder: deckFolder,
        title: deck?.title || '',
      },
    } as CardType;

    cache.cards.set(realSlug, card);

    return card;
  } catch (error) {
    console.error(`Error reading file at path ${fullPath}:`, error);
    return null;
  }
}

// Deck Retrieval Functions
export async function getAllCards(): Promise<CardType[]> {
  if (cache.cards.size > 0) {
    return Array.from(cache.cards.values());
  }

  const slugs = await getCardSlugs();
  const cardPromises = slugs.map(({ slug }) => getCardBySlug(slug));

  const cards = (await Promise.all(cardPromises)).filter((card) => card !== null) as CardType[];
  cards.forEach((card) => cache.cards.set(card.slug, card));

  return cards;
}

export async function getAllDecks(): Promise<DeckType[]> {
  const deckPromises = decks.map(async (deck) => ({
    ...deck,
    cards: await getDeckContents(deck.folder),
  }));

  return await Promise.all(deckPromises);
}

export async function getDeckBySlug(slug: string): Promise<DeckType | null> {
  return decks.find((deck) => deck.folder === slug) || null;
}

export async function getCardsByDeck(deckFolder: string): Promise<CardType[]> {
  const allCards = await getAllCards();

  return allCards.filter((card) => card.deck.folder === deckFolder);
}

// Watchers and Initialization Functions
function watchDirectory(directory: string) {
  const watcher = watch(directory, (eventType: string, filename: string | null) => {
    if (filename && (eventType === 'change' || eventType === 'rename')) {
      updateCache(directory);
    }
  });

  return () => watcher.close();
}

function startWatchingDeckDirectories() {
  if (process.env.NODE_ENV === 'development') {
    const unwatchers = decks.map((deck) => watchDirectory(path.join(contentDirectory, deck.folder)));

    return () => unwatchers.forEach((unwatch) => unwatch());
  } else {
    console.log('Watching directories is disabled in production');
    return () => { };
  }
}

(async () => {
  await getCardSlugs();
  await getAllCards();

  startWatchingDeckDirectories();
})();
