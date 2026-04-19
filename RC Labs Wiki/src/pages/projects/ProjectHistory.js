import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import './ProjectHistory.css';

const ACTION_META = {
  created:           {  label: 'Created',           color: '#28a745' },
  updated:           {  label: 'Updated',           color: '#0066cc' },
  deleted:           {  label: 'Deleted',           color: '#dc3545' },
  deadline_extended: {   label: 'Deadline Extended', color: '#fd7e14' },
};

const fmt = (iso) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const ProjectHistory = ({ filterStatuses }) => {
  const { history, clearHistory } = useProjects();
  const [show, setShow] = useState(false);

  // For completed/withheld pages we don't filter — show all project history
  // filterStatuses is optional; if provided, we can't filter by status since
  // history only stores projectId/name, not status. So we show all history.
  const entries = history;

  return (
    <div className="ph-wrapper">
      <button className="ph-toggle-btn" onClick={() => setShow(s => !s)}>
         Project History
        {entries.length > 0 && <span className="ph-badge">{entries.length}</span>}
        <span className="ph-chevron">{show ? '▲' : '▼'}</span>
      </button>

      {show && (
        <div className="ph-panel">
          <div className="ph-panel-header">
            <span className="ph-panel-title">Change History</span>
            {entries.length > 0 && (
              <button className="ph-clear-btn" onClick={clearHistory}>Clear All</button>
            )}
          </div>

          {entries.length === 0 ? (
            <p className="ph-empty">No changes recorded yet.</p>
          ) : (
            <ul className="ph-list">
              {entries.map(entry => {
                const meta = ACTION_META[entry.action] || { icon: '•', label: entry.action, color: '#888' };
                return (
                  <li key={entry.id} className="ph-item" style={{ borderLeftColor: meta.color }}>
                    <span className="ph-icon">{meta.icon}</span>
                    <div className="ph-text">
                      <span className="ph-project">{entry.projectName}</span>
                      {' — '}
                      <span className="ph-action" style={{ color: meta.color }}>{meta.label}</span>
                      {' by '}
                      <span className="ph-by">{entry.by}</span>
                      {entry.action === 'deadline_extended' && entry.oldDeadline && (
                        <span className="ph-detail">
                          {' '}({fmtDate(entry.oldDeadline)} → {fmtDate(entry.newDeadline)})
                        </span>
                      )}
                    </div>
                    <span className="ph-time">{fmt(entry.at)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectHistory;
