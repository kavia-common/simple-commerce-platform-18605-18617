import React, { useState } from 'react';
import { checkoutOrder } from '../api/hooks';
import { api } from '../api/client';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function CheckoutPage() {
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    full_name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
    phone: ''
  });
  const [billingSame, setBillingSame] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1) Create shipping address
      const shipRes = await api.post('/addresses/', { ...shipping, address_type: 'shipping', is_default: true });
      const shippingId = shipRes.data?.id;

      // 2) Create billing (same as shipping or separate - for simplicity reuse shipping)
      const billingData = billingSame ? shipping : shipping; // extend to a separate form if needed
      const billRes = await api.post('/addresses/', { ...billingData, address_type: 'billing', is_default: true });
      const billingId = billRes.data?.id;

      if (!shippingId || !billingId) {
        throw new Error('Failed to create addresses for checkout.');
      }

      // 3) Checkout with required IDs
      await checkoutOrder({ shipping_address_id: shippingId, billing_address_id: billingId });
      navigate('/orders');
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const update = (k, v) => setShipping(s => ({ ...s, [k]: v }));

  return (
    <div className="section">
      <div className="title" style={{ fontSize: 22 }}>Checkout</div>
      <form className="card form" style={{ padding: 16 }} onSubmit={submit}>
        {error && <div className="helper" style={{ color: 'var(--error)' }}>{error}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input className="input" placeholder="Full name" value={shipping.full_name} onChange={e => update('full_name', e.target.value)} required />
          <input className="input" placeholder="Phone" value={shipping.phone} onChange={e => update('phone', e.target.value)} />
          <input className="input" placeholder="Address line 1" value={shipping.line1} onChange={e => update('line1', e.target.value)} required />
          <input className="input" placeholder="Address line 2" value={shipping.line2} onChange={e => update('line2', e.target.value)} />
          <input className="input" placeholder="City" value={shipping.city} onChange={e => update('city', e.target.value)} required />
          <input className="input" placeholder="State" value={shipping.state} onChange={e => update('state', e.target.value)} />
          <input className="input" placeholder="Postal code" value={shipping.postal_code} onChange={e => update('postal_code', e.target.value)} required />
          <input className="input" placeholder="Country" value={shipping.country} onChange={e => update('country', e.target.value)} />
        </div>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} />
          Billing address same as shipping
        </label>

        <button className="btn btn-primary" disabled={loading} type="submit">
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
