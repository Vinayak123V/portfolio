import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const DEPARTMENTS = [
  'Engineering', 'Firmware', 'Software', 'Data Science',
  'Battery', 'Supply Chain', 'Production', 'HR',
  'Finance', 'Sales', 'Operations', 'Product',
];

const getStrength = (pwd) => {
  if (!pwd) return { score: 0, label: '', color: '#e0e0e0', width: '0%' };
  let s = 0;
  if (pwd.length >= 6)           s++;
  if (pwd.length >= 10)          s++;
  if (/[A-Z]/.test(pwd))         s++;
  if (/[0-9]/.test(pwd))         s++;
  if (/[^A-Za-z0-9]/.test(pwd))  s++;
  const map = [
    { label: '',           color: '#e0e0e0', width: '0%'   },
    { label: 'Weak',       color: '#dc3545', width: '20%'  },
    { label: 'Fair',       color: '#fd7e14', width: '40%'  },
    { label: 'Good',       color: '#ffc107', width: '65%'  },
    { label: 'Strong',     color: '#28a745', width: '85%'  },
    { label: 'Very Strong',color: '#20c997', width: '100%' },
  ];
  return map[s];
};

const RegisterPage = ({ onSwitch }) => {
  const { register } = useAuth();

  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '', department: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const strength = getStrength(form.password);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Name, email and password are required'); return; }
    if (form.password.length < 6)                    { setError('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirm)              { setError('Passwords do not match'); return; }

    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.department);
      setShowPopup(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      {/* ── Success Popup ── */}
      {showPopup && (
        <div className="reg-popup-overlay">
          <div className="reg-popup">
            <div className="reg-popup-icon">🎉</div>
            <h3>Registration Successful!</h3>
            <p>Your RC Labs account has been created.<br />Please sign in to continue.</p>
            <button
              className="auth-submit"
              style={{ marginTop: 8 }}
              onClick={() => { setShowPopup(false); onSwitch(); }}
            >
              Go to Login →
            </button>
          </div>
        </div>
      )}
      <div className="auth-card-header">
        <h2>Create Account </h2>
        <p>Join the RC Labs internal wiki</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error"><span>⚠️</span> {error}</div>}

        <div className="auth-form-row">
          <div className="auth-field">
            <label>Full Name *</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon"></span>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" autoComplete="name" />
            </div>
          </div>

          <div className="auth-field">
            <label>Email *</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon"></span>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@rclabs.co" autoComplete="email" />
            </div>
          </div>
        </div>

        <div className="auth-field">
          <label>Department <span style={{ color: '#aaa', fontWeight: 400 }}>(optional)</span></label>
          <div className="dept-chips">
            {DEPARTMENTS.map(d => (
              <span
                key={d}
                className={`dept-chip ${form.department === d ? 'selected' : ''}`}
                onClick={() => { setForm(f => ({ ...f, department: f.department === d ? '' : d })); setError(''); }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="auth-field">
          <label>Password *</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon">🔒</span>
            <input
              type={showPwd ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              autoComplete="new-password"
            />
            <button type="button" className="password-toggle" onClick={() => setShowPwd(v => !v)}>
              {showPwd ? '🙈' : '👁️'}
            </button>
          </div>
          {form.password && (
            <div className="password-strength">
              <div className="strength-bar">
                <div className="strength-fill" style={{ width: strength.width, background: strength.color }} />
              </div>
              <span className="strength-label" style={{ color: strength.color }}>{strength.label}</span>
            </div>
          )}
        </div>

        <div className="auth-field">
          <label>Confirm Password *</label>
          <div className="auth-input-wrap">
            <span className="auth-input-icon">🔐</span>
            <input
              type={showPwd ? 'text' : 'password'}
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
              className={form.confirm && form.confirm !== form.password ? 'error' : ''}
            />
            {form.confirm && form.confirm === form.password && (
              <span style={{ position: 'absolute', right: 12, color: '#28a745', fontSize: '1.1rem' }}>✓</span>
            )}
          </div>
        </div>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? <><span className="auth-spinner" /> Creating account...</> : '✅ Create Account'}
        </button>
      </form>

      <div className="auth-divider">or</div>

      <div className="auth-switch">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch}>Sign in</button>
      </div>
    </div>
  );
};

export default RegisterPage;
