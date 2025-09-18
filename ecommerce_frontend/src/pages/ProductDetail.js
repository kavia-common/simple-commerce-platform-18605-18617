import React, { useEffect, useState } from 'react';
import { getProduct } from '../api/hooks';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// PUBLIC_INTERFACE
export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="helper">Loading...</div>;
  if (!product) return <div className="helper">Product not found</div>;

  return (
    <div className="section">
      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, padding: 18 }}>
        <img
          src={product.image_url || 'https://picsum.photos/seed/detail' + product.id + '/800/600'}
          alt={product.name}
          className="product-image"
          style={{ height: 320, borderRadius: 12 }}
        />
        <div style={{ display: 'grid', gap: 10 }}>
          <div className="title" style={{ fontSize: 24 }}>{product.name}</div>
          <div className="helper">{product.category?.name || ''}</div>
          <div className="price" style={{ fontSize: 20 }}>{product.currency || '$'} {product.price}</div>
          <div className="helper">{product.description}</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              className="input"
              type="number"
              value={qty}
              min={1}
              onChange={e => setQty(Number(e.target.value))}
              style={{ width: 120 }}
            />
            <button className="btn btn-primary" onClick={() => addItem(product.id, qty)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
