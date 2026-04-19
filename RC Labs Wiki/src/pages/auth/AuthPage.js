import React, { useState } from 'react';
import LoginPage    from './LoginPage';
import RegisterPage from './RegisterPage';
import './Auth.css';

const AuthPage = () => {
  const [mode, setMode] = useState('login');

  return (
    <div className="auth-page">
      {/* Background blobs */}
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />
      <div className="auth-blob auth-blob-3" />

      <div className="auth-wrapper">
        {/* Left branding */}
        <div className="auth-left">
          <img src="/RCLabs_Logo.png" alt="RC Labs" className="auth-logo" />
          <h1 className="auth-brand-title">RC Labs Internal Wiki</h1>
          <p className="auth-brand-sub">Intelergy India Private Limited</p>
        </div>

        {/* Right form */}
        <div className="auth-right">
          {mode === 'login'
            ? <LoginPage    onSwitch={() => setMode('register')} />
            : <RegisterPage onSwitch={() => setMode('login')} />
          }
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
