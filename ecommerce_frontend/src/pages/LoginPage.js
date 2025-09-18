import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Ocean-styled login page.
 */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="section" style={{ maxWidth: 420, margin: '0 auto' }}>
      <div className="card">
        <div className="card-body">
          <div className="page-heading" style={{ marginBottom: 8 }}>
            <h2 className="h1" style={{ fontSize: 24 }}>Welcome back</h2>
          </div>
          {error && <div className="helper error mb-3">{error}</div>}
          <form className="form" onSubmit={submit}>
            <div>
              <label className="label" htmlFor="username">Username</label>
              <input id="username" className="input" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" className="input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button className="btn btn-primary" type="submit">Login</button>
          </form>
          <div className="helper mt-3">
            No account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
