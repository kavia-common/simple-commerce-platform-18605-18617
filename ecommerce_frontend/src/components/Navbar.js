import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

/**
 * PUBLIC_INTERFACE
 * Navbar component: top navigation with brand, actions, and cart count.
 */
export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="badge" aria-hidden>OS</span>
          OceanShop
        </Link>

        <div className="nav-actions">
          <Link to="/" className="link">Home</Link>
          <Link to="/orders" className="link">Orders</Link>
          <Link to="/admin" className="link">Admin</Link>
          <Link to="/cart" className="link link-pill" aria-label="Cart">
            Cart • {cartCount}
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="link">Hi, {user.username}</Link>
              <button className="btn" onClick={logout} title="Logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="link">Login</Link>
              <Link to="/signup" className="link">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
