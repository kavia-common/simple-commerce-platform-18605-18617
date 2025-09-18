import { useCallback, useEffect, useState } from 'react';
import { api, getErrorMessage } from './client';

/**
 * PRODUCTS
 */
export function useProducts(query = '') {
  const [data, setData] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/products/', { params: query ? { search: query } : {} });
      setData(res.data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => { load(); }, [load]);

  return { ...data, loading, error, reload: load };
}

export async function getProduct(id) {
  const res = await api.get(`/products/${id}/`);
  return res.data;
}

/**
 * CATEGORIES
 */
export async function listCategories(params = {}) {
  const res = await api.get('/categories/', { params });
  return res.data;
}

/**
 * AUTH
 */
export async function loginApi({ username, password }) {
  const res = await api.post('/auth/login/', { username, password });
  // Token handling placeholder if backend returns a token
  if (res.data?.token) localStorage.setItem('authToken', res.data.token);
  return res.data;
}

export async function registerApi({ username, email, password }) {
  const res = await api.post('/auth/register/', { username, email, password });
  return res.data;
}

export async function meApi() {
  const res = await api.get('/auth/me/');
  return res.data;
}

export async function logoutApi() {
  await api.post('/auth/logout/');
  localStorage.removeItem('authToken');
}

/**
 * CART
 */
export async function getCart() {
  const res = await api.get('/cart/');
  return res.data;
}
export async function cartAddItem(product_id, quantity = 1) {
  const res = await api.post('/cart/add_item/', { product_id, quantity });
  return res.data;
}
export async function cartUpdateItem(product_id, quantity) {
  const res = await api.post('/cart/update_item/', { product_id, quantity });
  return res.data;
}
export async function cartRemoveItem(product_id) {
  const res = await api.post('/cart/remove_item/', { product_id });
  return res.data;
}
export async function cartClear() {
  const res = await api.post('/cart/clear/', {});
  return res.data;
}

/**
 * ORDERS
 */
export async function listOrders() {
  const res = await api.get('/orders/');
  return res.data;
}
export async function getOrder(id) {
  const res = await api.get(`/orders/${id}/`);
  return res.data;
}
export async function checkoutOrder(payload) {
  // payload may include shipping_address_id, billing_address_id, payment_method placeholder
  const res = await api.post('/orders/checkout/', payload || {});
  return res.data;
}
