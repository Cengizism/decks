import { db } from './db';

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

export function getCardLikes(cardIdInDb: number): number {
  return getCount('likes', cardIdInDb);
}

export function getCardBookmarks(cardIdInDb: number): number {
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

export function isCardLikedByUser(cardIdInDb: number, userId: number): boolean {
  return isActionByUser('likes', cardIdInDb, userId);
}

export function isCardBookmarkedByUser(
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

export function getCardsFromDb(maxNumber: number): any[] {
  const limitClause = maxNumber ? 'LIMIT ?' : '';
  const stmt = db.prepare(`
    SELECT id, card, deck, COUNT(likes.card_id) AS likes,
           EXISTS(SELECT 1 FROM likes WHERE likes.card_id = id AND likes.user_id = 2) AS isLiked,
           EXISTS(SELECT 1 FROM bookmarks WHERE bookmarks.card_id = id AND bookmarks.user_id = 2) AS isBookmarked
    FROM cards
    LEFT JOIN likes ON id = likes.card_id
    LEFT JOIN bookmarks ON id = bookmarks.card_id
    GROUP BY id
    ORDER BY id DESC
    ${limitClause}
  `);

  return maxNumber ? stmt.all(maxNumber) : stmt.all();
}

export function storeCard(card: string, deck: string): boolean {
  try {
    const stmt = db.prepare('INSERT INTO cards (card, deck) VALUES (?, ?)');
    const result = stmt.run(card, deck);
    return result.changes > 0;
  } catch (error) {
    console.error('Error storing card:', error);
    return false;
  }
}

export function cardExists(card: string, deck: string): boolean {
  const stmt = db.prepare(
    'SELECT COUNT(*) AS count FROM cards WHERE card = ? AND deck = ?'
  );
  const result = stmt.get(card, deck) as { count: number };
  return result.count > 0;
}
