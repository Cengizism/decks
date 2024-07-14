import { db } from './db';

export function findCardIdInDb(card: string, deck: string): number | null {
  const stmt = db.prepare('SELECT id FROM cards WHERE card = ? AND deck = ?');
  const result = stmt.get(card, deck) as { id: number } | undefined;
  return result ? result.id : null;
}

export function getCardLikes(cardIdInDb: number): number {
  const stmt = db.prepare(
    'SELECT COUNT(*) AS count FROM likes WHERE card_id = ?'
  );
  const result = stmt.get(cardIdInDb) as { count: number };
  return result.count;
}

export function isCardLikedByUser(cardIdInDb: number, userId: number): boolean {
  const stmt = db.prepare(
    'SELECT COUNT(*) AS count FROM likes WHERE card_id = ? AND user_id = ?'
  );
  const result = stmt.get(cardIdInDb, userId) as { count: number };
  return result.count > 0;
}

export function isCardBookmarkedByUser(cardIdInDb: number, userId: number): boolean {
  const stmt = db.prepare(
    'SELECT COUNT(*) AS count FROM bookmarks WHERE card_id = ? AND user_id = ?'
  );
  const result = stmt.get(cardIdInDb, userId) as { count: number };
  return result.count > 0;
}

export function getCardsFromDb(maxNumber: number): any[] {
  const limitClause = maxNumber ? 'LIMIT ?' : '';

  const stmt = db.prepare(`
    SELECT id, card, deck, COUNT(likes.card_id) AS likes, 
           EXISTS(SELECT 1 FROM likes WHERE likes.card_id = id AND likes.user_id = 2) AS isLiked
    FROM cards
    LEFT JOIN likes ON id = likes.card_id
    GROUP BY id
    ORDER BY id DESC
    ${limitClause}
  `);

  return maxNumber ? stmt.all(maxNumber) : stmt.all();
}

export function storeCard(card: string, deck: string): boolean {
  try {
    const stmt = db.prepare(`
      INSERT INTO cards (card, deck)
      VALUES (?, ?)
    `);
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

export async function updateCardLikeStatus(
  cardId: number,
  userId: number
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const checkStmt = db.prepare(`
        SELECT COUNT(*) AS count
        FROM likes
        WHERE user_id = ? AND card_id = ?
      `);
      const isLiked =
        (checkStmt.get(userId, cardId) as { count: number }).count > 0;

      if (isLiked) {
        const deleteStmt = db.prepare(`
          DELETE FROM likes
          WHERE user_id = ? AND card_id = ?
        `);
        const result = deleteStmt.run(userId, cardId);
        resolve(result.changes > 0);
      } else {
        const insertStmt = db.prepare(`
          INSERT INTO likes (user_id, card_id)
          VALUES (?, ?)
        `);
        const result = insertStmt.run(userId, cardId);
        resolve(result.changes > 0);
      }
    } catch (error) {
      console.error('Error updating like status:', error);
      reject(error);
    }
  });
}


export async function updateCardBookmarkStatus(
  cardId: number,
  userId: number
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const checkStmt = db.prepare(`
        SELECT COUNT(*) AS count
        FROM bookmarks
        WHERE user_id = ? AND card_id = ?
      `);
      const isBookmarked =
        (checkStmt.get(userId, cardId) as { count: number }).count > 0;

      if (isBookmarked) {
        const deleteStmt = db.prepare(`
          DELETE FROM bookmarks
          WHERE user_id = ? AND card_id = ?
        `);
        const result = deleteStmt.run(userId, cardId);
        resolve(result.changes > 0);
      } else {
        const insertStmt = db.prepare(`
          INSERT INTO bookmarks (user_id, card_id)
          VALUES (?, ?)
        `);
        const result = insertStmt.run(userId, cardId);
        resolve(result.changes > 0);
      }
    } catch (error) {
      console.error('Error updating bookmark status:', error);
      reject(error);
    }
  });
}
