import React, { useEffect } from 'react';
import './Toast.css';

const ICONS = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

const Toast = ({ toasts, onDismiss }) => (
  <div className="toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`toast toast-${t.type}`} onClick={() => onDismiss(t.id)}>
        <span className="toast-icon">{ICONS[t.type] || ICONS.info}</span>
        <div className="toast-body">
          {t.title && <div className="toast-title">{t.title}</div>}
          <div className="toast-message">{t.message}</div>
        </div>
        <button className="toast-close" onClick={() => onDismiss(t.id)}>×</button>
      </div>
    ))}
  </div>
);

export default Toast;
