import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ config, onConfirm, onCancel }) => {
  if (!config) return null;

  const { title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' } = config;

  return (
    <div className="cd-overlay" onClick={onCancel}>
      <div className="cd-modal" onClick={e => e.stopPropagation()}>
        <div className={`cd-icon-wrap cd-icon-${type}`}>
          {type === 'danger'  && <span>🗑️</span>}
          {type === 'warning' && <span>⚠️</span>}
          {type === 'info'    && <span>ℹ️</span>}
          {type === 'success' && <span>✅</span>}
        </div>
        <h3 className="cd-title">{title}</h3>
        <p className="cd-message">{message}</p>
        <div className="cd-actions">
          <button className="cd-cancel" onClick={onCancel}>{cancelText}</button>
          <button className={`cd-confirm cd-confirm-${type}`} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
