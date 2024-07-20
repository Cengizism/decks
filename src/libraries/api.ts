import { CardType, UserType } from '@/interfaces';
import type { NodesTreeType } from '@/interfaces/';
import type { ContributorType, DeckType, PathType } from '@/interfaces/';
import db from '@/libraries/db';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

import contributorsData from '../../content/contributors.json';
import decksData from '../../content/decks.json';
import pathsData from '../../content/paths.json';

// Data and caching functions
const contributors: ContributorType[] = contributorsData;
const decks: DeckType[] = decksData;
const paths: PathType[] = pathsData;

const decksContentDirectory = join(process.cwd(), 'content/decks');
const pagesContentDirectory = join(process.cwd(), 'content/pages');

const cardFilesCache: Record<string, string[]> = {};

function readCardFiles(folder: string): string[] {
  if (!folder) {
    console.error('Invalid folder name:', folder);
    return [];
  }
  return cardFilesCache[folder] || [];
}

function initializeCardFilesCache(decks: { id: string }[]): void {
  decks.forEach(({ id }) => {
    const deckPath = join(decksContentDirectory, id);
    try {
      const cardFiles = fs
        .readdirSync(deckPath)
        .filter((file) => file.endsWith('.mdx'));

      cardFilesCache[id] = cardFiles;

      cardFiles.forEach((file) => {
        const cardId = file.replace('.mdx', '');
        if (!doesCardAndDeckIndexExistInDb(cardId, id)) {
          storeCardAndDeckIndexInDb(cardId, id);
        }
      });
    } catch (error) {
      console.error(`Error reading directory at path ${deckPath}:`, error);
      cardFilesCache[id] = [];
    }
  });
}

function storeCardAndDeckIndexInDb(card: string, deck: string): boolean {
  try {
    if (!db) {
      throw new Error('Database connection is not initialized.');
    }
    const query = db.prepare('INSERT INTO cards (card, deck) VALUES (?, ?)');
    const result = query.run(card, deck);
    return result.changes > 0;
  } catch (error) {
    console.error('Error storing card:', error);
    return false;
  }
}

function doesCardAndDeckIndexExistInDb(card: string, deck: string): boolean {
  try {
    if (!db) {
      throw new Error('Database connection is not initialized.');
    }
    const query = db.prepare(
      'SELECT COUNT(*) AS count FROM cards WHERE card = ? AND deck = ?'
    );
    const result = query.get(card, deck) as { count: number };
    return result.count > 0;
  } catch (error) {
    console.error('Error in cardExists:', error);
    return false;
  }
}

function getCount(table: string, cardIdInDb: number): number {
  const query = db.prepare(
    `SELECT COUNT(*) AS count FROM ${table} WHERE card_id = ?`
  );
  const result = query.get(cardIdInDb) as { count: number };
  return result.count;
}

export function getNodeTree(): NodesTreeType {
  return {
    paths: paths.map((path) => ({
      id: path.id,
      title: path.title,
      decks: decks
        .filter((deck) => deck.pathId === path.id)
        .map((deck) => ({
          id: deck.id,
          title: deck.title,
          cards: readCardFiles(deck.id).map((cardFile) => {
            const cardId = cardFile.replace(/\.mdx$/, '');
            return {
              id: cardId,
              title: getCardById(cardId)?.title || '',
            };
          }),
        })),
    })),
  };
}

initializeCardFilesCache(decks);

// Path functions
export function indexPathIds(): { pathId: string }[] {
  return paths.map(({ id }) => ({ pathId: id }));
}

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

// Deck functions
export function indexDeckIds(): { deckId: string }[] {
  return decks.map(({ id }) => ({ deckId: id }));
}

export function getAllDecks(): DeckType[] {
  return decks;
}

export function getDeckById(id: string): DeckType | null {
  return decks.find((deck) => deck.id === id) || null;
}

export function getDecksByContributorId(contributorId: string): DeckType[] {
  return decks.filter((deck) => deck.contributorId === contributorId);
}

export function getDecksByPathId(pathId: string): DeckType[] {
  return decks.filter((deck) => deck.pathId === pathId);
}

export function traceDeckByCardId(cardId: string): DeckType | undefined {
  return decks.find((deck) => readCardFiles(deck.id).includes(`${cardId}.mdx`));
}

// Card functions
export function indexCardIds(): { cardId: string }[] {
  return decks.flatMap(({ id: folder }) => {
    const cardFiles = readCardFiles(folder);
    return cardFiles.map((cardId) => ({
      cardId: cardId.replace(/\.mdx$/, ''),
    }));
  });
}

export function getCardById(cardId: string): CardType | null {
  if (!cardId) {
    console.error('Invalid cardId parameter:', cardId);
    return null;
  }

  const cardIdWithoutExtension = cardId.replace(/\.mdx$/, '');
  const deck = traceDeckByCardId(cardIdWithoutExtension);
  if (!deck) {
    console.error('Deck not found for cardId:', cardId);
    return null;
  }

  const fullPath = join(
    decksContentDirectory,
    deck.id,
    `${cardIdWithoutExtension}.mdx`
  );

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = content.replace(
      /!\[([^\]]*)\]\((images\/[^)]+)\)/g,
      (_: unknown, imageTitle: string, imageFileNameWithExtension: string) => {
        return `![${imageTitle}](/api/content/${deck.id}/${imageFileNameWithExtension})`;
      }
    );

    const dbCardId = traceCardIdInDb(cardIdWithoutExtension, deck.id);
    if (dbCardId === null) {
      console.error('Card not found in database for cardId:', cardId);
      return null;
    }

    const likes = getCount('likes', dbCardId);

    const user = getUser();
    const isLiked = isCardLikedByUser(dbCardId, user?.id || 0); // TODO: Temporary
    const isBookmarked = isCardBookmarkedByUser(dbCardId, user?.id || 0); // TODO: Temporary

    return {
      ...data,
      id: cardIdWithoutExtension,
      content: processedContent,
      likes,
      isLiked,
      isBookmarked,
    } as CardType;
  } catch (error) {
    console.error(`Error reading file at path ${fullPath}:`, error);
    return null;
  }
}

export function getCardsOfDeck(deck: DeckType): CardType[] {
  return readCardFiles(deck.id)
    .map((cardFile) => getCardById(cardFile.replace(/\.mdx$/, '')))
    .filter((card): card is CardType => card !== null);
}

async function updateCardStatus(
  table: string,
  cardId: number,
  userId: number
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const checkStmt = db.prepare(
        `SELECT COUNT(*) AS count FROM ${table} WHERE user_id = ? AND card_id = ?`
      );
      const isActioned =
        (checkStmt.get(userId, cardId) as { count: number }).count > 0;

      if (isActioned) {
        const deleteStmt = db.prepare(
          `DELETE FROM ${table} WHERE user_id = ? AND card_id = ?`
        );
        const result = deleteStmt.run(userId, cardId);
        resolve(result.changes > 0);
      } else {
        const insertStmt = db.prepare(
          `INSERT INTO ${table} (user_id, card_id) VALUES (?, ?)`
        );
        const result = insertStmt.run(userId, cardId);
        resolve(result.changes > 0);
      }
    } catch (error) {
      console.error(`Error updating ${table} status:`, error);
      reject(error);
    }
  });
}

export async function updateCardLikeStatus(
  cardId: number,
  userId: number
): Promise<boolean> {
  return updateCardStatus('likes', cardId, userId);
}

export async function updateCardBookmarkStatus(
  cardId: number,
  userId: number
): Promise<boolean> {
  return updateCardStatus('bookmarks', cardId, userId);
}

export function traceCardIdInDb(card: string, deck: string): number | null {
  const query = db.prepare('SELECT id FROM cards WHERE card = ? AND deck = ?');
  const result = query.get(card, deck) as { id: number } | undefined;
  return result ? result.id : null;
}

// Contributor functions
export function indexContributorIds(): { contributorId: string }[] {
  return contributors.map(({ id }) => ({ contributorId: id }));
}

export function getAllContributors(): ContributorType[] {
  return contributors;
}

export function getContributorById(id: string): ContributorType | null {
  return contributors.find((contributor) => contributor.id === id) || null;
}

// User functions
export function getUser(): UserType | null {
  const userIdOfActiveSession = getActiveSession();
  if (userIdOfActiveSession === null) {
    return null;
  }
  return getUserById(userIdOfActiveSession);
}

export function getAllUsers(): UserType[] {
  const query = db.prepare('SELECT id, name, avatar, email FROM users');
  const result = query.all() as UserType[];
  return result;
}

export function getUserById(userId: number): UserType | null {
  const query = db.prepare(
    'SELECT id, name, avatar, email FROM users WHERE id = ?'
  );
  const result = query.get(userId) as UserType | undefined;
  return result ? result : null;
}

export function getBookmarksByUserId(userId: number): CardType[] {
  const query = db.prepare(
    `SELECT card_id
     FROM bookmarks
     WHERE user_id = ?`
  );

  const bookmarkedCardIds = query.all(userId) as { card_id: number }[];
  const bookmarkedCards: CardType[] = [];

  Object.keys(cardFilesCache).forEach((deckId) => {
    cardFilesCache[deckId].forEach((cardFile) => {
      const cardId = cardFile.replace('.mdx', '');
      const dbCardId = traceCardIdInDb(cardId, deckId);
      if (dbCardId && bookmarkedCardIds.some((b) => b.card_id === dbCardId)) {
        const card = getCardById(cardId);
        if (card) {
          bookmarkedCards.push(card);
        }
      }
    });
  });

  return bookmarkedCards;
}

function isActionByUser(
  table: string,
  cardIdInDb: number,
  userId: number
): boolean {
  const query = db.prepare(
    `SELECT COUNT(*) AS count FROM ${table} WHERE card_id = ? AND user_id = ?`
  );
  const result = query.get(cardIdInDb, userId) as { count: number };
  return result.count > 0;
}

function isCardLikedByUser(cardIdInDb: number, userId: number): boolean {
  return isActionByUser('likes', cardIdInDb, userId);
}

function isCardBookmarkedByUser(cardIdInDb: number, userId: number): boolean {
  return isActionByUser('bookmarks', cardIdInDb, userId);
}

// Session functions
export function saveSession(userId: number): boolean {
  try {
    db.exec('DELETE FROM sessions');

    const query = db.prepare('INSERT INTO sessions (user_id) VALUES (?)');
    const result = query.run(userId);
    return result.changes > 0;
  } catch (error) {
    console.error('Error saving session:', error);
    return false;
  }
}

export function emptySessions(): boolean {
  try {
    const query = db.prepare('DELETE FROM sessions');
    query.run();
    return true;
  } catch (error) {
    console.error('Error emptying sessions:', error);
    return false;
  }
}

export function getActiveSession(): number | null {
  const query = db.prepare('SELECT user_id FROM sessions LIMIT 1');
  const result = query.get() as { user_id: number } | undefined;
  return result ? result.user_id : null;
}

// Page functions
export function getPageContent(
  pageId: string
): { content: string; data: any } | null {
  if (!pageId) {
    console.error('Invalid pageId parameter:', pageId);
    return null;
  }

  const fullPath = join(pagesContentDirectory, `${pageId}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      data,
      content,
    };
  } catch (error) {
    console.error(`Error reading file at path ${fullPath}:`, error);
    return null;
  }
}
