import {
  BookmarkType, // Not used for now
  CardType,
  UserType,
} from '@/interfaces';
import type { NodesTreeType } from '@/interfaces/';
import type { ContributorType, DeckType, PathType } from '@/interfaces/';
import sql from 'better-sqlite3';
import fs from 'fs';
// TODO
// @ts-ignore
import matter from 'gray-matter';
import { join } from 'path';

import contributorsData from '../../content/contributors.json';
import decksData from '../../content/decks.json';
import pathsData from '../../content/paths.json';

const contributors: ContributorType[] = contributorsData;
const decks: DeckType[] = decksData;
const paths: PathType[] = pathsData;

const contentDirectory = join(process.cwd(), 'content');

const db = new sql('data.db');

const cardFilesCache: Record<string, string[]> = {};

initializeCardFilesCache(decks);

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      avatar TEXT,
      email TEXT UNIQUE
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      card TEXT NOT NULL,
      deck TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER, 
      card_id INTEGER, 
      PRIMARY KEY(user_id, card_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
      FOREIGN KEY(card_id) REFERENCES cards(id) ON DELETE CASCADE
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      user_id INTEGER, 
      card_id INTEGER, 
      PRIMARY KEY(user_id, card_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE, 
      FOREIGN KEY(card_id) REFERENCES cards(id) ON DELETE CASCADE
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      user_id INTEGER, 
      PRIMARY KEY(user_id),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  const stmt = db.prepare('SELECT COUNT(*) AS count FROM users');
  const userCount = (stmt.get() as { count: number }).count;

  if (userCount === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO users (name, avatar, email)
      VALUES (?, ?, ?)
    `);

    const transaction = db.transaction(() => {
      insertStmt.run(
        'Katri Athokas',
        'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
        'katri.athokas@inbox.com'
      );
      insertStmt.run(
        'Kevin Sturgis',
        'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
        'max.kevin@email.com'
      );
    });

    transaction();
  }
}
initDb();

export function findCardIdInDb(card: string, deck: string): number | null {
  const stmt = db.prepare('SELECT id FROM cards WHERE card = ? AND deck = ?');
  const result = stmt.get(card, deck) as { id: number } | undefined;
  return result ? result.id : null;
}

function getCount(table: string, cardIdInDb: number): number {
  const stmt = db.prepare(
    `SELECT COUNT(*) AS count FROM ${table} WHERE card_id = ?`
  );
  const result = stmt.get(cardIdInDb) as { count: number };
  return result.count;
}

function getCardLikes(cardIdInDb: number): number {
  return getCount('likes', cardIdInDb);
}

function getCardBookmarks(cardIdInDb: number): number {
  return getCount('bookmarks', cardIdInDb);
}

function isActionByUser(
  table: string,
  cardIdInDb: number,
  userId: number
): boolean {
  const stmt = db.prepare(
    `SELECT COUNT(*) AS count FROM ${table} WHERE card_id = ? AND user_id = ?`
  );
  const result = stmt.get(cardIdInDb, userId) as { count: number };
  return result.count > 0;
}

function isCardLikedByUser(cardIdInDb: number, userId: number): boolean {
  return isActionByUser('likes', cardIdInDb, userId);
}

function isCardBookmarkedByUser(
  cardIdInDb: number,
  userId: number
): boolean {
  return isActionByUser('bookmarks', cardIdInDb, userId);
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

function getCardsFromDb(maxNumber: number): any[] {
  const limitClause = maxNumber ? 'LIMIT ?' : '';
  const user = getUser();
  const stmt = db.prepare(`
    SELECT id, card, deck, COUNT(likes.card_id) AS likes,
           EXISTS(SELECT 1 FROM likes WHERE likes.card_id = id AND likes.user_id = ${user?.id}) AS isLiked,
           EXISTS(SELECT 1 FROM bookmarks WHERE bookmarks.card_id = id AND bookmarks.user_id = ${user?.id}) AS isBookmarked
    FROM cards
    LEFT JOIN likes ON id = likes.card_id
    LEFT JOIN bookmarks ON id = bookmarks.card_id
    GROUP BY id
    ORDER BY id DESC
    ${limitClause}
  `);

  return maxNumber ? stmt.all(maxNumber) : stmt.all();
}

function storeCardInDb(card: string, deck: string): boolean {
  try {
    if (!db) {
      throw new Error('Database connection is not initialized.');
    }
    const stmt = db.prepare('INSERT INTO cards (card, deck) VALUES (?, ?)');
    const result = stmt.run(card, deck);
    return result.changes > 0;
  } catch (error) {
    console.error('Error storing card:', error);
    return false;
  }
}

function doesCardExistInDb(card: string, deck: string): boolean {
  try {
    if (!db) {
      throw new Error('Database connection is not initialized.');
    }
    const stmt = db.prepare(
      'SELECT COUNT(*) AS count FROM cards WHERE card = ? AND deck = ?'
    );
    const result = stmt.get(card, deck) as { count: number };
    return result.count > 0;
  } catch (error) {
    console.error('Error in cardExists:', error);
    return false;
  }
}

export function getUserById(userId: number): UserType | null {
  const stmt = db.prepare(
    'SELECT id, name, avatar, email FROM users WHERE id = ?'
  );
  const result = stmt.get(userId) as UserType | undefined;
  return result ? result : null;
}

export function getAllUsers(): UserType[] {
  const stmt = db.prepare('SELECT id, name, avatar, email FROM users');
  const result = stmt.all() as UserType[];
  return result;
}

export function saveSession(userId: number): boolean {
  try {
    db.exec('DELETE FROM sessions');

    const stmt = db.prepare('INSERT INTO sessions (user_id) VALUES (?)');
    const result = stmt.run(userId);
    return result.changes > 0;
  } catch (error) {
    console.error('Error saving session:', error);
    return false;
  }
}

// Maybe not needed at all
export function emptySessions(): boolean {
  try {
    const stmt = db.prepare('DELETE FROM sessions');
    stmt.run();
    return true;
  } catch (error) {
    console.error('Error emptying sessions:', error);
    return false;
  }
}

export function getActiveSession(): number | null {
  const stmt = db.prepare('SELECT user_id FROM sessions LIMIT 1');
  const result = stmt.get() as { user_id: number } | undefined;
  return result ? result.user_id : null;
}

export function getBookmarksOfUserId(userId: number): CardType[] {
  const stmt = db.prepare(
    `SELECT card_id
     FROM bookmarks
     WHERE user_id = ?`
  );

  const bookmarkedCardIds = stmt.all(userId) as { card_id: number }[];
  const bookmarkedCards: CardType[] = [];

  Object.keys(cardFilesCache).forEach((deckId) => {
    cardFilesCache[deckId].forEach((cardFile) => {
      const cardId = cardFile.replace('.mdx', '');
      const dbCardId = findCardIdInDb(cardId, deckId);
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

function initializeCardFilesCache(decks: { id: string }[]): void {
  decks.forEach(({ id }) => {
    const deckPath = join(contentDirectory, id);
    try {
      const cardFiles = fs
        .readdirSync(deckPath)
        .filter((file) => file.endsWith('.mdx'));

      cardFilesCache[id] = cardFiles;

      cardFiles.forEach((file) => {
        const cardId = file.replace('.mdx', '');
        if (!doesCardExistInDb(cardId, id)) {
          storeCardInDb(cardId, id);
        }
      });
    } catch (error) {
      console.error(`Error reading directory at path ${deckPath}:`, error);
      cardFilesCache[id] = [];
    }
  });
}

export function getCardById(cardId: string): CardType | null {
  if (!cardId) {
    console.error('Invalid cardId parameter:', cardId);
    return null;
  }

  const cardIdWithoutExtension = cardId.replace(/\.mdx$/, '');
  const deck = findDeckByCardId(cardIdWithoutExtension);
  if (!deck) {
    console.error('Deck not found for cardId:', cardId);
    return null;
  }

  const fullPath = join(
    contentDirectory,
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

    const dbCardId = findCardIdInDb(cardIdWithoutExtension, deck.id);
    if (dbCardId === null) {
      console.error('Card not found in database for cardId:', cardId);
      return null;
    }

    const likes = getCardLikes(dbCardId);

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

export function getAllContributors(): ContributorType[] {
  return contributors;
}

export function getContributorById(id: string): ContributorType | null {
  return contributors.find((contributor) => contributor.id === id) || null;
}

export function findDeckByCardId(cardId: string): DeckType | undefined {
  return decks.find((deck) => readCardFiles(deck.id).includes(`${cardId}.mdx`));
}

export function getAllDecks(): DeckType[] {
  return decks;
}

export function getDeckById(id: string): DeckType | null {
  return decks.find((deck) => deck.id === id) || null;
}

export function getDecksByPathId(pathId: string): DeckType[] {
  return decks.filter((deck) => deck.pathId === pathId);
}

export function getDecksByContributorId(contributorId: string): DeckType[] {
  return decks.filter((deck) => deck.contributorId === contributorId);
}

export function getCardsOfDeck(deck: DeckType): CardType[] {
  return readCardFiles(deck.id)
    .map((cardFile) => getCardById(cardFile.replace(/\.mdx$/, '')))
    .filter((card): card is CardType => card !== null);
}

function readCardFiles(folder: string): string[] {
  if (!folder) {
    console.error('Invalid folder name:', folder);
    return [];
  }
  return cardFilesCache[folder] || [];
}

export function indexCardIds(): { cardId: string }[] {
  return decks.flatMap(({ id: folder }) => {
    const cardFiles = readCardFiles(folder);
    return cardFiles.map((cardId) => ({
      cardId: cardId.replace(/\.mdx$/, ''),
    }));
  });
}

export function indexDeckIds(): { deckId: string }[] {
  return decks.map(({ id }) => ({ deckId: id }));
}

export function indexPathIds(): { pathId: string }[] {
  return paths.map(({ id }) => ({ pathId: id }));
}

export function indexContributorIds(): { contributorId: string }[] {
  return contributors.map(({ id }) => ({ contributorId: id }));
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

function getPathOfDeck(deckId: string): PathType | null {
  const deck = decks.find((deck) => deck.id === deckId);
  if (deck) {
    return paths.find((path) => path.id === deck.pathId) || null;
  }
  return null;
}

export function getUser(): UserType | null {
  const userIdOfActiveSession = getActiveSession();
  if (userIdOfActiveSession === null) {
    return null;
  }
  return getUserById(userIdOfActiveSession);
}
