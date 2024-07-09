import {
  CardSlugType,
  CardType,
  ContributorType,
  DeckType,
  PathType,
} from '@/interfaces/types';
import { watch } from 'fs';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import contributors from '../../content/contributors.json';
import decks from '../../content/decks.json';
import paths from '../../content/paths.json';

const excludeFiles: string[] = ['.DS_Store'];
const contentDirectory = path.join(process.cwd(), 'content');

const store = {
  slugs: [] as CardSlugType[],
  cards: new Map<string, CardType>(),
  decks: new Map<string, string[]>(),
  paths: paths as PathType[],
  contributors: contributors as ContributorType[],
};

// Utility Functions
async function readDirectory(folderPath: string): Promise<string[]> {
  const files = await fs.readdir(folderPath, { withFileTypes: true });
  return files
    .filter(
      (file) =>
        file.isFile() &&
        file.name.endsWith('.mdx') &&
        !excludeFiles.includes(file.name)
    )
    .map((file) => file.name);
}

async function getDeckContents(folder: string): Promise<string[]> {
  if (store.decks.has(folder)) {
    return store.decks.get(folder) || [];
  }

  const contents = await readDirectory(path.join(contentDirectory, folder));
  store.decks.set(folder, contents);

  return contents;
}

async function updateCache(directory: string) {
  store.slugs = [];
  store.cards.clear();
  store.decks.clear();

  await getCardSlugs();
  await getAllCards();

  console.log(`Cache updated due to changes in ${directory}`);
}

function enrichDeck(
  deck: DeckType & { path?: { id: string; title: string } }
): DeckType {
  const path = store.paths.find((p: PathType) => p.id === deck.pathId);
  const contributor = store.contributors.find(
    (c: ContributorType) => c.id === deck.contributorId
  );

  const enrichedDeck: DeckType = {
    ...deck,
    pathId: deck.pathId || '',
    path: deck?.path ? { id: deck.path.id, title: deck.path.title } : undefined,
    contributor: contributor
      ? { id: contributor.id, name: contributor.name }
      : undefined,
  };

  return enrichedDeck;
}

function enrichCard(card: CardType, deck: DeckType): CardType {
  return {
    ...card,
    deck: deck
      ? {
          folder: deck.folder,
          title: deck.title,
          path: deck.path
            ? { id: deck.path.id, title: deck.path.title }
            : undefined,
        }
      : undefined,
  };
}

// Card Retrieval Functions
export async function getCardSlugs(): Promise<CardSlugType[]> {
  if (store.slugs.length > 0) {
    return store.slugs;
  }

  const slugPromises = decks.map(async ({ folder }) => {
    const slugs = await getDeckContents(folder);
    return slugs.map((slug) => ({
      slug: slug.replace(/\.mdx$/, ''),
      deck: folder,
    }));
  });

  store.slugs = (await Promise.all(slugPromises)).flat();

  return store.slugs;
}

export async function getCardBySlug(slug: string): Promise<CardType | null> {
  if (!slug) {
    console.error('Invalid slug parameter:', { slug });
    return null;
  }

  const realSlug = slug.replace(/\.mdx$/, '');

  if (store.cards.has(realSlug)) {
    return store.cards.get(realSlug) || null;
  }

  const deckFolder = decks.find((deck) =>
    (store.decks.get(deck.folder) || []).includes(realSlug + '.mdx')
  )?.folder;

  if (!deckFolder) {
    console.error('Deck not found for slug:', { slug });
    return null;
  }

  const fullPath = path.join(contentDirectory, deckFolder, `${realSlug}.mdx`);

  try {
    const [fileContents, stats] = await Promise.all([
      fs.readFile(fullPath, 'utf8'),
      fs.stat(fullPath),
    ]);
    const { data, content } = matter(fileContents);

    let deck: DeckType | undefined = decks.find(
      (d: DeckType) => d.folder === deckFolder
    );
    if (!deck) {
      console.error('Deck not found:', { deckFolder });
      return null;
    }

    deck = enrichDeck(deck);

    const processedContent = content.replace(
      /!\[([^\]]*)\]\((images\/[^)]+)\)/g,
      (match, imageTitle, imageFileNameWithExtension) => {
        return `![${imageTitle}](/api/content/${deckFolder}/${imageFileNameWithExtension})`;
      }
    );

    const card: CardType = {
      title: data.title,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      slug: realSlug,
      content: processedContent,
      deck: {
        folder: deck.folder,
        title: deck.title,
        path: deck.path
          ? { id: deck.path.id, title: deck.path.title }
          : undefined,
      },
      lastModified: stats.mtime,
    };

    const enrichedCard = deck ? enrichCard(card, deck) : card;
    store.cards.set(realSlug, enrichedCard);

    return enrichedCard;
  } catch (error) {
    console.error(`Error reading file at path ${fullPath}:`, error);
    return null;
  }
}

// Deck Retrieval Functions
export async function getAllCards(): Promise<CardType[]> {
  if (store.cards.size > 0) {
    return Array.from(store.cards.values());
  }

  const slugs = await getCardSlugs();
  const cardPromises = slugs.map(({ slug }) => getCardBySlug(slug));

  const cards = (await Promise.all(cardPromises)).filter(
    (card) => card !== null
  ) as CardType[];
  cards.forEach((card) => store.cards.set(card.slug, card));

  return cards;
}

export async function getAllDecks(): Promise<DeckType[]> {
  const deckPromises = decks.map(async (deck) => {
    const cardSlugs = await getDeckContents(deck.folder);
    return enrichDeck({ ...deck, cardSlugs });
  });

  return await Promise.all(deckPromises);
}

export async function getDeckBySlug(slug: string): Promise<DeckType | null> {
  const deck = decks.find((deck) => deck.folder === slug) || null;

  if (deck) {
    const enrichedDeck = enrichDeck({
      ...deck,
      cardSlugs: await getDeckContents(slug),
    });

    return enrichedDeck;
  }

  return null;
}

export async function getCardsByDeck(deckFolder: string): Promise<CardType[]> {
  const allCards = await getAllCards();
  return allCards.filter(
    (card) => card.deck && card.deck.folder === deckFolder
  );
}

// Path Retrieval Functions
export async function getAllPaths(): Promise<PathType[]> {
  const pathsWithDeckCount = store.paths.map((path: PathType) => {
    const deckCount = decks.filter((deck) => deck.pathId === path.id).length;
    return {
      ...path,
      deckCount,
    };
  });

  return pathsWithDeckCount;
}

export async function getPathById(id: string): Promise<PathType | null> {
  const path = store.paths.find((p: PathType) => p.id === id) || null;
  if (path) {
    const deckCount = decks.filter((deck) => deck.pathId === id).length;
    return {
      ...path,
      deckCount,
    };
  }
  return null;
}

export async function getDecksByPathId(pathId: string): Promise<DeckType[]> {
  const filteredDecks = decks.filter((deck) => deck.pathId === pathId);
  return filteredDecks.map((deck) => enrichDeck(deck));
}

// New Function: Get Path by Deck ID
export async function getPathByDeckId(
  deckId: string
): Promise<PathType | null> {
  const deck = decks.find((deck) => deck.folder === deckId) || null;
  if (deck) {
    const path =
      store.paths.find((p: PathType) => p.id === deck.pathId) || null;
    if (path) {
      return {
        ...path,
        deckCount: decks.filter((d) => d.pathId === path.id).length,
      };
    }
  }
  return null;
}

// Contributor Retrieval Functions
export async function getAllContributors(): Promise<ContributorType[]> {
  return store.contributors.map((contributor: ContributorType) => ({
    id: contributor.id,
    name: contributor.name,
  }));
}

export async function getContributorById(
  id: string
): Promise<ContributorType | null> {
  const contributor =
    store.contributors.find((c: ContributorType) => c.id === id) || null;
  return contributor ? { id: contributor.id, name: contributor.name } : null;
}

// Watchers and Initialization Functions
function watchDirectory(directory: string) {
  const watcher = watch(
    directory,
    (eventType: string, filename: string | null) => {
      if (filename && (eventType === 'change' || eventType === 'rename')) {
        updateCache(directory);
      }
    }
  );

  return () => watcher.close();
}

function startWatchingDeckDirectories() {
  if (process.env.NODE_ENV === 'development') {
    const unwatchers = decks.map((deck) =>
      watchDirectory(path.join(contentDirectory, deck.folder))
    );

    return () => unwatchers.forEach((unwatch) => unwatch());
  }

  return () => {};
}

(async () => {
  await getCardSlugs();
  await getAllCards();

  startWatchingDeckDirectories();
})();
