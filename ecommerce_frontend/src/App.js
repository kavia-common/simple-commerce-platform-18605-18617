import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import { CartProvider, useCart } from './context/CartContext';
import { useAuth } from './hooks/useAuth';
import ProductGrid from './pages/ProductGrid';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';

// Top Navigation Bar component
function NavBar({ onToggleTheme, theme }) {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="brand">
          <span className="brand-badge">OceanShop</span>
          <span style={{ color: 'var(--muted)', fontWeight: 600 }}>by KAVIA</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="navlink">Products</Link>
          {user && <Link to="/orders" className="navlink">Orders</Link>}
          {user && <Link to="/profile" className="navlink">Profile</Link>}
          {user?.is_staff && <Link to="/admin" className="navlink">Admin</Link>}
          <Link to="/cart" className="navlink">Cart <span className="badge">{cartCount}</span></Link>
          {!user ? (
            <>
              <Link to="/login" className="navlink">Login</Link>
              <Link to="/signup" className="navlink">Sign Up</Link>
            </>
          ) : (
            <button className="btn" onClick={logout}>Logout</button>
          )}
          <button className="btn" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}

// App layout wrapper
function Layout({ children, onToggleTheme, theme }) {
  return (
    <>
      <NavBar onToggleTheme={onToggleTheme} theme={theme} />
      <main className="main container">
        {children}
      </main>
      <footer className="footer">
        Ocean Professional UI • © {new Date().getFullYear()} OceanShop
      </footer>
    </>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <BrowserRouter>
      <CartProvider>
        <Layout onToggleTheme={toggleTheme} theme={theme}>
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
