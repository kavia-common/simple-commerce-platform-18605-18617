import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Ocean-styled signup page.
 */
export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    setMsg('Account created. You can now log in.');
    setTimeout(() => navigate('/login'), 800);
  };

  return (
    <div className="section" style={{ maxWidth: 420, margin: '0 auto' }}>
      <div className="card">
        <div className="card-body">
          <div className="page-heading" style={{ marginBottom: 8 }}>
            <h2 className="h1" style={{ fontSize: 24 }}>Create an account</h2>
          </div>
          {msg && <div className="helper ok mb-3">{msg}</div>}
          <form className="form" onSubmit={submit}>
            <div>
              <label className="label" htmlFor="s-username">Username</label>
              <input id="s-username" className="input" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
            </div>
            <div>
              <label className="label" htmlFor="s-email">Email (optional)</label>
              <input id="s-email" className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="s-password">Password (min 8)</label>
              <input id="s-password" className="input" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button className="btn btn-primary" type="submit">Sign Up</button>
          </form>
          <div className="helper mt-3">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
