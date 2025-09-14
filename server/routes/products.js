import express from 'express';
import * as model from 'models/productModel.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const items = model.allProducts();
  res.json({ items });
});

router.post('/', (req, res) => {
  const data = req.body || {};
  if (!data.name) return res.status(400).json({ error: 'name required' });
  const created = model.createProduct(data);
  res.json({ product: created });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const updated = model.updateProduct(id, req.body);
  if (!updated) return res.status(404).json({ error: 'not found' });
  res.json({ product: updated });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const ok = model.deleteProduct(id);
  res.json({ ok });
});

export default router;
