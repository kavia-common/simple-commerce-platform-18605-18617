import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

// PUBLIC_INTERFACE
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
      <div className="card" style={{ padding: 18 }}>
        <div className="title" style={{ textAlign: 'center' }}>Welcome back</div>
        {error && <div className="helper" style={{ color: 'var(--error)' }}>{error}</div>}
        <form className="form" onSubmit={submit}>
          <input className="input" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
          <input className="input" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button className="btn btn-primary" type="submit">Login</button>
        </form>
        <div className="helper" style={{ marginTop: 8 }}>
          No account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
