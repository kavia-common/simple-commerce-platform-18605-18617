import React, { useState } from 'react';
import { checkoutOrder } from '../api/hooks';
import { api } from '../api/client';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Checkout page with Ocean styling and responsive form.
 */
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
      const shipRes = await api.post('/addresses/', { ...shipping, address_type: 'shipping', is_default: true });
      const shippingId = shipRes.data?.id;

      const billingData = billingSame ? shipping : shipping;
      const billRes = await api.post('/addresses/', { ...billingData, address_type: 'billing', is_default: true });
      const billingId = billRes.data?.id;

      if (!shippingId || !billingId) {
        throw new Error('Failed to create addresses for checkout.');
      }

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
    <>
      <div className="page-heading">
        <h2 className="h1">Checkout</h2>
        <span className="subtitle">Secure and fast</span>
      </div>

      <form className="card" onSubmit={submit}>
        <div className="card-body">
          {error && <div className="helper error mb-3">{error}</div>}
          <div className="stack-sm">
            <div>
              <label className="label" htmlFor="full_name">Full name</label>
              <input id="full_name" className="input" value={shipping.full_name} onChange={e => update('full_name', e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="phone">Phone</label>
              <input id="phone" className="input" value={shipping.phone} onChange={e => update('phone', e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="line1">Address line 1</label>
              <input id="line1" className="input" value={shipping.line1} onChange={e => update('line1', e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="line2">Address line 2</label>
              <input id="line2" className="input" value={shipping.line2} onChange={e => update('line2', e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="city">City</label>
              <input id="city" className="input" value={shipping.city} onChange={e => update('city', e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="state">State</label>
              <input id="state" className="input" value={shipping.state} onChange={e => update('state', e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="postal_code">Postal code</label>
              <input id="postal_code" className="input" value={shipping.postal_code} onChange={e => update('postal_code', e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="country">Country</label>
              <input id="country" className="input" value={shipping.country} onChange={e => update('country', e.target.value)} />
            </div>
          </div>

          <label className="mt-3" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} />
            <span>Billing address same as shipping</span>
          </label>

          <div className="mt-4" style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn" type="button" onClick={() => navigate('/cart')}>Back to cart</button>
            <button className="btn btn-primary" disabled={loading} type="submit">
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
