import React, { useEffect, useState } from 'react';

export default function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState({ name: '', sku: '', qty: 0, unit_price: 0, low_stock_alert: 10 });

  useEffect(()=> { if (product) setForm(product); }, [product]);

  function change(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    onSave({ ...form, qty: Number(form.qty), unit_price: Number(form.unit_price), low_stock_alert: Number(form.low_stock_alert) });
    setForm({ name: '', sku: '', qty: 0, unit_price: 0, low_stock_alert: 10 });
  }

  return (
    <form onSubmit={submit}>
      <label>Name</label>
      <input className="input" name="name" value={form.name} onChange={change} required />
      <label>SKU</label>
      <input className="input" name="sku" value={form.sku || ''} onChange={change} />
      <label>Qty</label>
      <input className="input" name="qty" value={form.qty} onChange={change} />
      <label>Unit Price</label>
      <input className="input" name="unit_price" value={form.unit_price} onChange={change} />
      <label>Low stock alert</label>
      <input className="input" name="low_stock_alert" value={form.low_stock_alert} onChange={change} />
      <div style={{ marginTop:8 }}>
        <button className="btn" type="submit">Save</button>{' '}
        <button className="btn" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
