import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './theme.css';
import './index.css';
import Navbar from './components/Navbar';
import ProductGrid from './pages/ProductGrid';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './hooks/useAuth';

/**
 * PUBLIC_INTERFACE
 * App root with Ocean Professional theme, routing, and providers.
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="app-shell">
            <Navbar />
            <main>
              <div className="section">
                <div className="page-heading">
                  <h1 className="h1">OceanShop</h1>
                  <span className="badge-soft">Modern eCommerce</span>
                </div>
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
                </Routes>
              </div>
            </main>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
