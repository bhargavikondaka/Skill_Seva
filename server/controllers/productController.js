import * as model from 'models/productModel.js';

export function lowStockAlerts(_req, res) {
  const all = model.allProducts();
  const alerts = all.filter(p => Number(p.qty) <= Number(p.low_stock_alert));
  res.json({ alerts });
}

export default { lowStockAlerts };
