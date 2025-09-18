import React, { useEffect, useState } from 'react';
import { useProducts, listCategories } from '../api/hooks';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAdd }) {
  return (
    <div className="card product-card" role="article" aria-label={product.name}>
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

/**
 * PUBLIC_INTERFACE
 * Product list page with search and category filter, styled per Ocean Professional.
 */
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
    <>
      <div className="card mb-4">
        <div className="card-body">
          <div className="stack-sm">
            <div>
              <label className="label" htmlFor="search">Search</label>
              <input
                id="search"
                className="input"
                placeholder="Search products..."
                value={q}
                onChange={e => setQ(e.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="category">Category</label>
              <select
                id="category"
                className="select"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
              >
                <option value="">All categories</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-3">
            <button className="btn" onClick={reload} aria-label="Refresh products">Refresh</button>
          </div>
        </div>
      </div>

      {loading && <div className="helper">Loading products...</div>}
      {error && <div className="helper error">{error}</div>}

      <div className="grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={addItem} />
        ))}
      </div>
    </>
  );
}
