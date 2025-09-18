import React, { useEffect, useState } from 'react';
import { listOrders } from '../api/hooks';

/**
 * PUBLIC_INTERFACE
 * Orders history page with Ocean styling.
 */
export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await listOrders();
        setOrders(data?.results || data || []);
      } catch {
        setOrders([]);
      }
    })();
  }, []);

  return (
    <>
      <div className="page-heading">
        <h2 className="h1">Your Orders</h2>
        <span className="subtitle">{orders.length} total</span>
      </div>
      <div className="card">
        <div className="card-body" style={{ display: 'grid', gap: 12 }}>
          {orders.length === 0 && <div className="helper">No orders yet.</div>}
          {orders.map(o => (
            <div key={o.id} className="card" style={{ padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><strong>Order #{o.id}</strong></div>
                <div className="helper">{new Date(o.created_at || Date.now()).toLocaleString()}</div>
              </div>
              <div className="helper">Total: ${o.total || '—'}</div>
              {o.items && (
                <ul className="helper">
                  {o.items.map(it => (
                    <li key={it.product_id}>{it.product_name} × {it.quantity}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
