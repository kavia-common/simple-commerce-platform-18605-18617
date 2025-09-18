import React, { useEffect, useState } from 'react';
import { useProducts, listCategories } from '../api/hooks';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAdd }) {
  return (
    <div className="card product-card">
      <img
        src={product.image_url || 'https://picsum.photos/seed/' + product.id + '/600/400'}
        alt={product.name}
        className="product-image"
      />
      <div className="product-content">
        <div className="title">{product.name}</div>
        <div className="helper">{product.category?.name || ''}</div>
        <div className="price">{product.currency || '$'} {product.price}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link className="btn" to={`/products/${product.id}`}>Details</Link>
          <button className="btn btn-primary" onClick={() => onAdd(product.id)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function ProductGrid() {
  const [q, setQ] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { results, loading, error, reload } = useProducts(q);
  const { addItem } = useCart();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await listCategories();
      setCategories(data?.results || []);
    })();
  }, []);

  const filtered = results.filter(p => {
    if (!categoryId) return true;
    const pid = p?.category?.id;
    return Number(pid) === Number(categoryId);
  });

  return (
    <div className="section">
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 220px 120px' }}>
          <input
            className="input"
            placeholder="Search products..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <select
            className="select"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button className="btn" onClick={reload}>Refresh</button>
        </div>
      </div>

      {loading && <div className="helper">Loading products...</div>}
      {error && <div className="helper" style={{ color: 'var(--error)' }}>{error}</div>}

      <div className="grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addItem} />
        ))}
      </div>
    </div>
  );
}
