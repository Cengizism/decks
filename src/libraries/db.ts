import sql from 'better-sqlite3';

const db = new sql('data.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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

  const stmt = db.prepare('SELECT COUNT(*) AS count FROM users');
  const userCount = (stmt.get() as { count: number }).count;

  if (userCount === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO users (email)
      VALUES (?)
    `);

    const transaction = db.transaction(() => {
      insertStmt.run('john@example.com');
      insertStmt.run('max@example.com');
    });

    transaction();
  }
}

initDb();

export function getCardsFromDb(maxNumber: number): any {
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

export function storeCard(card: string, deck: string): any {
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
  const stmt = db.prepare('SELECT COUNT(*) AS count FROM cards WHERE card = ? AND deck = ?');
  const result = stmt.get(card, deck) as { count: number };
  return result.count > 0;
}

export function updatePostLikeStatus(cardId: number, userId: number): any {
  try {
    const checkStmt = db.prepare(`
      SELECT COUNT(*) AS count
      FROM likes
      WHERE user_id = ? AND card_id = ?
    `);
    const isLiked = (checkStmt.get(userId, cardId) as { count: number }).count > 0;

    if (isLiked) {
      const deleteStmt = db.prepare(`
        DELETE FROM likes
        WHERE user_id = ? AND card_id = ?
      `);
      const result = deleteStmt.run(userId, cardId);
      return result.changes > 0;
    } else {
      const insertStmt = db.prepare(`
        INSERT INTO likes (user_id, card_id)
        VALUES (?, ?)
      `);
      const result = insertStmt.run(userId, cardId);
      return result.changes > 0;
    }
  } catch (error) {
    console.error('Error updating like status:', error);
    return false;
  }
}
