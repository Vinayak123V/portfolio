import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API = 'http://localhost:5000/api';

// Simple event bus so AuthContext can notify ProjectContext after login/logout
export const authEvents = new EventTarget();

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount — gracefully handles backend being offline
  useEffect(() => {
    const token = localStorage.getItem('rc_token');
    const saved = localStorage.getItem('rc_user');

    if (!token) { setLoading(false); return; }

    // Optimistically restore from localStorage first so UI isn't blank
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }

    // Then verify with backend (non-blocking)
    fetch(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setUser(data);
          localStorage.setItem('rc_user', JSON.stringify(data));
        } else {
          // Token invalid — clear
          localStorage.removeItem('rc_token');
          localStorage.removeItem('rc_user');
          setUser(null);
        }
      })
      .catch(() => {
        // Backend offline — keep the locally saved user so app still works
        if (!saved) {
          localStorage.removeItem('rc_token');
          setUser(null);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const register = async (name, email, password, department) => {
    const res = await fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, department }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    // Do NOT set user or save token — user must log in manually after registering
    return data.user;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    localStorage.setItem('rc_token', data.token);
    localStorage.setItem('rc_user', JSON.stringify(data.user));
    setUser(data.user);
    authEvents.dispatchEvent(new Event('login'));
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('rc_token');
    localStorage.removeItem('rc_user');
    setUser(null);
    authEvents.dispatchEvent(new Event('logout'));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
