import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
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
      <div className="card" style={{ padding: 18 }}>
        <div className="title" style={{ textAlign: 'center' }}>Create an account</div>
        {msg && <div className="helper" style={{ color: 'var(--primary)' }}>{msg}</div>}
        <form className="form" onSubmit={submit}>
          <input className="input" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
          <input className="input" placeholder="Email (optional)" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="input" placeholder="Password (min 8)" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button className="btn btn-primary" type="submit">Sign Up</button>
        </form>
        <div className="helper" style={{ marginTop: 8 }}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
