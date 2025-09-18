import React, { useState } from 'react';
import { checkoutOrder } from '../api/hooks';
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
      // Placeholder payload; backend can map address objects or IDs as needed.
      const payload = { shipping, billing: billingSame ? shipping : shipping, payment_method: 'placeholder' };
      const order = await checkoutOrder(payload);
      navigate('/orders');
    } catch (err) {
      setError(err?.message || 'Checkout failed');
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
