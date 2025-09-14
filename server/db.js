import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_FILE = process.env.DB_FILE || path.resolve('./server/data/skill_seva.db');
const dir = path.dirname(DB_FILE);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new Database(DB_FILE);
initialize();

function initialize() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sku TEXT,
      qty INTEGER DEFAULT 0,
      unit_price REAL DEFAULT 0,
      low_stock_alert INTEGER DEFAULT 10,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      qty INTEGER,
      unit_price REAL,
      total REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export default db;
