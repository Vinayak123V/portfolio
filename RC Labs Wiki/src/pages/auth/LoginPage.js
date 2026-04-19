import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const LoginPage = ({ onSwitch }) => {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [form,     setForm]     = useState({ email: '', password: '' });
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2>Welcome back </h2>
        <p>Sign in to your RC Labs Wiki account</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="auth-field">
          <label>Email Address</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon">📧</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@rclabs.co"
              className={error ? 'error' : ''}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="auth-field">
          <label>Password</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon">🔒</span>
            <input
              type={showPwd ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={error ? 'error' : ''}
              autoComplete="current-password"
            />
            <button type="button" className="password-toggle" onClick={() => setShowPwd(v => !v)}>
              {showPwd ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? <><span className="auth-spinner" /> Signing in...</> : '🔑 Sign In'}
        </button>
      </form>

      <div className="auth-divider">or</div>

      <div className="auth-switch">
        Don't have an account?{' '}
        <button onClick={onSwitch}>Create one</button>
      </div>
    </div>
  );
};

export default LoginPage;
