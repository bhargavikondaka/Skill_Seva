import db from '../db.js';

export function allProducts() {
  const stmt = db.prepare('SELECT * FROM products ORDER BY created_at DESC');
  return stmt.all();
}

export function getProduct(id) {
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  return stmt.get(id);
}

export function createProduct({ name, sku = null, qty = 0, unit_price = 0, low_stock_alert = 10 }) {
  const stmt = db.prepare(`INSERT INTO products (name, sku, qty, unit_price, low_stock_alert)
    VALUES (@name, @sku, @qty, @unit_price, @low_stock_alert)`);
  const info = stmt.run({ name, sku, qty, unit_price, low_stock_alert });
  return getProduct(info.lastInsertRowid);
}

export function updateProduct(id, fields) {
  const existing = getProduct(id);
  if (!existing) return null;
  const merged = { ...existing, ...fields };
  const stmt = db.prepare(`UPDATE products SET name=@name, sku=@sku, qty=@qty, unit_price=@unit_price, low_stock_alert=@low_stock_alert WHERE id=@id`);
  stmt.run({ id, name: merged.name, sku: merged.sku, qty: merged.qty, unit_price: merged.unit_price, low_stock_alert: merged.low_stock_alert });
  return getProduct(id);
}

export function deleteProduct(id) {
  const stmt = db.prepare('DELETE FROM products WHERE id = ?');
  const info = stmt.run(id);
  return info.changes > 0;
}
