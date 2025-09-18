import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { cartAddItem, cartClear, cartRemoveItem, cartUpdateItem, getCart } from '../api/hooks';

const CartContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * CartProvider wraps the app to provide cart data and actions.
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(false);

  // Map backend CartSerializer shape into UI-friendly shape
  const normalizeCart = (data) => {
    const items = Array.isArray(data?.items) ? data.items.map((it) => {
      // it.product is nested Product; it.line_total is provided as string
      const p = it.product || {};
      return {
        product_id: p.id,
        product_name: p.name,
        price: p.price,
        currency: p.currency || 'USD',
        quantity: it.quantity,
        image_url: p.image_url || '',
        line_total: Number(it.line_total || 0),
      };
    }) : [];
    const subtotal = Number(data?.subtotal || items.reduce((s, i) => s + (Number(i.price) * Number(i.quantity)), 0));
    return { items, subtotal };
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(normalizeCart(data));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const addItem = async (product_id, quantity = 1) => {
    await cartAddItem(product_id, quantity);
    await refresh();
  };
  const updateItem = async (product_id, quantity) => {
    await cartUpdateItem(product_id, quantity);
    await refresh();
  };
  const removeItem = async (product_id) => {
    await cartRemoveItem(product_id);
    await refresh();
  };
  const clear = async () => {
    await cartClear();
    await refresh();
  };

  const value = useMemo(() => {
    const cartCount = cart?.items?.reduce((sum, i) => sum + (i.quantity || 0), 0) || 0;
    return { cart, cartCount, loading, refresh, addItem, updateItem, removeItem, clear };
  }, [cart, loading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useCart hook to access cart state/actions
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
