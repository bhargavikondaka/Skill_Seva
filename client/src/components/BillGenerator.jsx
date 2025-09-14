import React, { useState } from 'react';
import { billApi, productsApi } from '../api';

export default function BillGenerator(){
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState('');
  const [qty, setQty] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [result, setResult] = useState(null);
  const [tax, setTax] = useState(5);

  function add() {
    if (!productName) return;
    setItems(prev => [...prev, { name: productName, qty: Number(qty), unit_price: Number(unitPrice) }]);
    setProductName(''); setQty(1); setUnitPrice(0);
  }

  async function generate() {
    const res = await billApi.create({ items, tax_percent: Number(tax) });
    const data = res.bill || (await res.json());
    setResult(data);
  }

  return (
    <div>
      <h2>Bill Generator</h2>
      <div>
        <label>Product</label>
        <input className="input" value={productName} onChange={e=>setProductName(e.target.value)} />
        <label>Qty</label>
        <input className="input" type="number" value={qty} onChange={e=>setQty(e.target.value)} />
        <label>Unit Price</label>
        <input className="input" type="number" value={unitPrice} onChange={e=>setUnitPrice(e.target.value)} />
        <div style={{ marginTop:8 }}>
          <button className="btn" onClick={add}>Add item</button>
        </div>
      </div>
      <div style={{ marginTop:12 }}>
        <h4>Items</h4>
        <ul className="list">{items.map((it,i)=><li key={i}>{it.name} x {it.qty} — ₹{it.unit_price}</li>)}</ul>
      </div>
      <div style={{ marginTop:12 }}>
        <label>Tax %</label>
        <input className="input" value={tax} onChange={e=>setTax(e.target.value)} />
        <div style={{ marginTop:8 }}>
          <button className="btn" onClick={generate}>Generate Bill</button>
        </div>
      </div>

      {result && (
        <div style={{ marginTop: 12 }}>
          <h3>Bill</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
