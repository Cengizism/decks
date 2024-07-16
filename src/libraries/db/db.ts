import sql from 'better-sqlite3';

export const db = new sql('data.db');

export function initDb() {
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

  const stmt = db.prepare('SELECT COUNT(*) AS count FROM users');
  const userCount = (stmt.get() as { count: number }).count;

  if (userCount === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO users (name, avatar, email)
      VALUES (?, ?, ?)
    `);

    const transaction = db.transaction(() => {
      insertStmt.run(
        'John de Wolf',
        'https://picsum.photos/id/237/200/300',
        'john@example.com'
      );
      insertStmt.run(
        'Max Verstappen',
        'https://picsum.photos/id/450/200/300',
        'max@example.com'
      );
    });

    transaction();
  }
}

initDb();
