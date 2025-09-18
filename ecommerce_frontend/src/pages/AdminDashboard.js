import React, { useEffect, useState } from 'react';
import { api, getErrorMessage } from '../api/client';
import { useProducts } from '../api/hooks';

// PUBLIC_INTERFACE
export default function AdminDashboard() {
  const { results, reload } = useProducts('');
  const [form, setForm] = useState({
    name: '',
    slug: '',
    price: '0.00',
    currency: 'USD',
    category_id: ''
  });
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setOk('');
    try {
      await api.post('/products/', form);
      setOk('Product created');
      setForm({ name: '', slug: '', price: '0.00', currency: 'USD', category_id: '' });
      reload();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="section">
      <div className="title" style={{ fontSize: 22 }}>Admin Dashboard</div>

      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div className="title">Create Product</div>
        {error && <div className="helper" style={{ color: 'var(--error)' }}>{error}</div>}
        {ok && <div className="helper" style={{ color: 'var(--primary)' }}>{ok}</div>}
        <form className="form" onSubmit={submit}>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
            <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input className="input" placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
            <input className="input" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
            <input className="input" placeholder="Currency" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} />
            <input className="input" placeholder="Category ID" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} required />
          </div>
          <button className="btn btn-primary" type="submit">Create</button>
        </form>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div className="title">Products</div>
        <div className="grid">
          {results.map(p => (
            <div key={p.id} className="card product-card">
              <img className="product-image" alt={p.name} src={p.image_url || 'https://picsum.photos/seed/admin' + p.id + '/600/400'} />
              <div className="product-content">
                <div className="title">{p.name}</div>
                <div className="helper">#{p.id} • {p.slug}</div>
                <div className="price">{p.currency || '$'} {p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
