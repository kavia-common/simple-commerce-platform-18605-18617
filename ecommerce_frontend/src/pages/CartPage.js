import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Cart page styled per Ocean Professional; responsive with clear hierarchy.
 */
export default function CartPage() {
  const { cart, updateItem, removeItem, clear } = useCart();
  const navigate = useNavigate();

  const items = cart?.items || [];
  const total = cart?.subtotal || 0;

  return (
    <>
      <div className="page-heading">
        <h2 className="h1">Shopping Cart</h2>
        <span className="subtitle">{items.length} item(s)</span>
      </div>

      <div className="card">
        <div className="card-body">
          {items.length === 0 ? (
            <div className="helper">
              Your cart is empty. <Link to="/">Go shopping</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {items.map(item => (
                <div key={item.product_id} className="card" style={{ padding: 12 }}>
                  <div className="row" style={{ gridTemplateColumns: '1fr 120px 120px 110px' }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>{item.product_name || `Product #${item.product_id}`}</div>
                      <div className="helper">{item.currency || '$'} {item.price}</div>
                    </div>
                    <input
                      className="input"
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => updateItem(item.product_id, Number(e.target.value))}
                      aria-label={`Quantity for ${item.product_name || 'product'}`}
                    />
                    <div style={{ fontWeight: 800, color: 'var(--ocean-blue)' }}>
                      {item.currency || '$'} {Number(item.price) * Number(item.quantity)}
                    </div>
                    <button className="btn btn-danger" onClick={() => removeItem(item.product_id)}>Remove</button>
                  </div>
                </div>
              ))}

              <div className="summary">
                <button className="btn" onClick={clear}>Clear Cart</button>
                <div style={{ fontSize: 18, fontWeight: 800 }}>Total: ${total}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
