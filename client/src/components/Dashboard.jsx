import React, { useEffect, useState } from 'react';
import { productsApi } from '../api';


export default function Dashboard(){
  const [items, setItems] = useState([]);

  useEffect(()=>{ load(); }, []);
  async function load(){
    const res = await productsApi.list();
    setItems(res.items || []);
  }

  const low = items.filter(i => Number(i.qty) <= Number(i.low_stock_alert));
  return (
    <div>
      <h2>Dashboard</h2>
      <p className="small">Total products: {items.length}</p>
      <div style={{ marginTop: 12 }}>
        <h4>Low stock alerts</h4>
        {low.length === 0 ? <p className="small">No alerts</p> : (
          <ul className="list">
            {low.map(p => <li key={p.id}>{p.name} — qty: {p.qty}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
