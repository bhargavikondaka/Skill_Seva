const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export async function fetchJSON(path, opts = {}) {
  const url = `${API}${path}`;
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opts });
  return res.json();
}

export const productsApi = {
  list: () => fetchJSON('/products'),
  create: (body) => fetchJSON('/products', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => fetchJSON(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => fetchJSON(`/products/${id}`, { method: 'DELETE' })
};

export const billApi = {
  create: (body) => fetchJSON('/bill', { method: 'POST', body: JSON.stringify(body) })
};

export const miscApi = {
  ocr: (formData) => fetch(`${API}/vision-ocr`, { method: 'POST', body: formData }),
  transcribe: (body) => fetchJSON('/transcribe', { method: 'POST', body: JSON.stringify(body) })
};
