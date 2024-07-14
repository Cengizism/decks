import sql from 'better-sqlite3';

// Initialize the database connection
export const db = new sql('data.db');

export function initDb() {
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
