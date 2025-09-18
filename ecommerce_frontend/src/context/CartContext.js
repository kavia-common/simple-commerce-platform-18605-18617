import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { cartAddItem, cartClear, cartRemoveItem, cartUpdateItem, getCart } from '../api/hooks';

const CartContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * CartProvider wraps the app to provide cart data and actions.
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
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
