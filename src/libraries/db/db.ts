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
