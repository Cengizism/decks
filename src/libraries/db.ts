import sql from 'better-sqlite3';

const db = new sql('data.db');

const createTablesSql = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    avatar TEXT,
    email TEXT UNIQUE
  );

  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card TEXT NOT NULL,
    deck TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS likes (
    user_id INTEGER,
    card_id INTEGER,
    PRIMARY KEY(user_id, card_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(card_id) REFERENCES cards(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS bookmarks (
    user_id INTEGER,
    card_id INTEGER,
    PRIMARY KEY(user_id, card_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(card_id) REFERENCES cards(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS sessions (
    user_id INTEGER,
    PRIMARY KEY(user_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

const dummies = {
  users: [
    {
      name: 'Katri Athokas',
      avatar:
        'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
      email: 'katri.athokas@inbox.com',
    },
    {
      name: 'Kevin Sturgis',
      avatar:
        'https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png',
      email: 'max.kevin@email.com',
    },
  ],
};

function initDb(): void {
  try {
    db.exec(createTablesSql);

    const query = db.prepare('SELECT COUNT(*) AS count FROM users');
    const userCount = (query.get() as { count: number }).count;

    if (userCount === 0) {
      const insertStmt = db.prepare(`
        INSERT INTO users (name, avatar, email)
        VALUES (?, ?, ?)
      `);

      const transaction = db.transaction(() => {
        dummies.users.forEach((user) => {
          insertStmt.run(user.name, user.avatar, user.email);
        });
      });

      transaction();
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDb();

export default db;
