import React, { useEffect, useState } from 'react';
import { api, getErrorMessage } from '../api/client';
import { useProducts } from '../api/hooks';

/**
 * PUBLIC_INTERFACE
 * Admin dashboard for creating products with Ocean styling.
 */
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
    <>
      <div className="page-heading">
        <h2 className="h1">Admin Dashboard</h2>
        <span className="subtitle">Manage products</span>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="title" style={{ marginBottom: 8 }}>Create Product</div>
          {error && <div className="helper error mb-2">{error}</div>}
          {ok && <div className="helper ok mb-2">{ok}</div>}
          <form className="form" onSubmit={submit}>
            <div className="stack-sm">
              <div>
                <label className="label" htmlFor="p-name">Name</label>
                <input id="p-name" className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="label" htmlFor="p-slug">Slug</label>
                <input id="p-slug" className="input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
              </div>
              <div>
                <label className="label" htmlFor="p-price">Price</label>
                <input id="p-price" className="input" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div>
                <label className="label" htmlFor="p-currency">Currency</label>
                <input id="p-currency" className="input" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} />
              </div>
              <div>
                <label className="label" htmlFor="p-category">Category ID</label>
                <input id="p-category" className="input" value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })} required />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="title mb-3">Products</div>
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
    </>
  );
}
