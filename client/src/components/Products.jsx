import React, { useEffect, useState } from 'react';
import { productsApi } from '../api';
import ProductForm from './ProductForm';

export default function Products(){
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(()=>load(), []);
  async function load(){
    const res = await productsApi.list();
    setItems(res.items || []);
  }

  async function remove(id){
    await productsApi.delete(id);
    load();
  }

  async function save(data){
    if (data.id) {
      await productsApi.update(data.id, data);
    } else {
      await productsApi.create(data);
    }
    setEditing(null);
    load();
  }

  return (
    <div>
      <h2>Products</h2>
      <ProductForm onSave={save} product={editing} onCancel={()=>setEditing(null)} />
      <hr />
      <ul className="list">
        {items.map(p => (
          <li key={p.id}>
            <div>
              <strong>{p.name}</strong> <span className="small">₹{p.unit_price} • qty: {p.qty}</span>
            </div>
            <div>
              <button className="btn" onClick={()=>setEditing(p)} style={{ marginRight:8 }}>Edit</button>
              <button className="btn" onClick={()=>remove(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
