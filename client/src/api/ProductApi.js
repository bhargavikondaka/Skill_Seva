const API_URL = "http://localhost:3000";

export const productsApi = {
  async list() {
    const res = await fetch(`${API_URL}/api/products`);
    return res.json();
  },
  async create(data) {
    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async update(id, data) {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async delete(id) {
    await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
  },
};
