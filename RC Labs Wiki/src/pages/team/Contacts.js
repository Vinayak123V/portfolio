import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';
import './Team.css';

const initialDepartments = [
  { id: 1,  dept: 'Human Resources',    email: 'hr@rclabs.co',          ext: '1100',  },
  { id: 2,  dept: 'IT Support',         email: 'itsupport@rclabs.co',   ext: '1234',  },
  { id: 3,  dept: 'Finance & Accounts', email: 'finance@rclabs.co',     ext: '1200', },
  { id: 4,  dept: 'Engineering',        email: 'engineering@rclabs.co', ext: '1300', },
  { id: 5,  dept: 'Sales',              email: 'sales@rclabs.co',       ext: '1400',  },
  { id: 6,  dept: 'Operations',         email: 'operations@rclabs.co',  ext: '1500', },
  { id: 7,  dept: 'Product Management', email: 'product@rclabs.co',     ext: '1600', },
  { id: 8,  dept: 'Quality Assurance',  email: 'qa@rclabs.co',          ext: '1700',  },
  { id: 9,  dept: 'Marketing',          email: 'marketing@rclabs.co',   ext: '1800', },
  { id: 10, dept: 'General Inquiries',  email: 'info@rclabs.co',        ext: '1000', },
];

const initialEmergency = [
  { id: 1, label: 'Security',       ext: '9999', color: '#dc3545' },
  { id: 2, label: 'First Aid',      ext: '8888', color: '#fd7e14' },
  { id: 3, label: 'Fire Emergency', ext: '7777', color: '#dc3545' },
  { id: 4, label: 'IT Emergency',   ext: '1234', color: '#0066cc' },
];

const emptyDept = { dept: '', email: '', ext: ''};

const Contacts = () => {
  const { user } = useAuth();
  const [departments, setDepartments] = useLocalStorage('contacts_departments', initialDepartments);
  const [emergency,   setEmergency]   = useLocalStorage('contacts_emergency',   initialEmergency);
  const [history,     setHistory]     = useLocalStorage('contacts_history',      []);
  const [showHistory, setShowHistory] = useState(false);

  const [modal,         setModal]         = useState(null); // { type: 'dept'|'emergency', mode: 'add'|'edit', data }
  const [form,          setForm]          = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type, id }

  const logHistory = (action, name) => {
    setHistory(prev => [{
      id: Date.now(), action, memberName: name,
      by: user?.name || 'Unknown',
      at: new Date().toISOString(),
    }, ...prev].slice(0, 100));
  };

  /* ── Dept handlers ── */
  const openAddDept = () => {
    setForm({ ...emptyDept, id: Date.now() });
    setModal({ type: 'dept', mode: 'add' });
  };

  const openEditDept = (d) => {
    setForm({ ...d });
    setModal({ type: 'dept', mode: 'edit' });
  };

  const saveDept = () => {
    if (!form.dept || !form.email) { alert('Department name and email are required'); return; }
    if (modal.mode === 'add') {
      setDepartments(prev => [...prev, form]);
      logHistory('added', form.dept);
    } else {
      setDepartments(prev => prev.map(d => d.id === form.id ? form : d));
      logHistory('edited', form.dept);
    }
    setModal(null); setForm(null);
  };

  const deleteDept = (id) => {
    const dept = departments.find(d => d.id === id);
    setDepartments(prev => prev.filter(d => d.id !== id));
    logHistory('deleted', dept?.dept || 'Unknown');
    setDeleteConfirm(null);
  };

  /* ── Emergency handlers ── */
  const openEditEmergency = (e) => {
    setForm({ ...e });
    setModal({ type: 'emergency', mode: 'edit' });
  };

  const saveEmergency = () => {
    if (!form.label || !form.ext) { alert('Label and extension are required'); return; }
    setEmergency(prev => prev.map(e => e.id === form.id ? form : e));
    logHistory('edited', form.label);
    setModal(null); setForm(null);
  };

  const deleteEmergency = (id) => {
    const entry = emergency.find(e => e.id === id);
    setEmergency(prev => prev.filter(e => e.id !== id));
    logHistory('deleted', entry?.label || 'Unknown');
    setDeleteConfirm(null);
  };

  const closeModal = () => { setModal(null); setForm(null); };

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/team-directory">Team Directory</Link><span>/</span>
        <span>Contacts</span>
      </div>

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title"> Contacts</h1>
          <p className="page-description">All department contacts and emergency numbers at RC Labs.</p>
        </div>
        <button className="eng-history-btn" onClick={() => setShowHistory(h => !h)}>
          History {history.length > 0 && <span className="eng-history-count">{history.length}</span>}
        </button>
      </div>

      {showHistory && (
        <div className="eng-history-panel">
          <div className="eng-history-header">
            <h3>Change History</h3>
            {history.length > 0 && (
              <button className="eng-history-clear" onClick={() => setHistory([])}>Clear All</button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="eng-history-empty">No changes recorded yet.</p>
          ) : (
            <ul className="eng-history-list">
              {history.map(entry => (
                <li key={entry.id} className={`eng-history-item eng-history-${entry.action}`}>
                  <span className="eng-history-icon">
                    {entry.action === 'added'   && '➕'}
                    {entry.action === 'edited'  && '✏️'}
                    {entry.action === 'deleted' && '🗑️'}
                  </span>
                  <div className="eng-history-text">
                    <span className="eng-history-member">{entry.memberName}</span>
                    {' '}was <strong>{entry.action}</strong> by{' '}
                    <span className="eng-history-by">{entry.by}</span>
                  </div>
                  <span className="eng-history-time">
                    {new Date(entry.at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ── Department Contacts ── */}
      <div className="content-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 className="section-title" style={{ margin: 0 }}>Department Contacts</h2>
          <button className="eng-add-btn" onClick={openAddDept}>+ Add Contact</button>
        </div>

        <div className="contacts-grid">
          {departments.map((d) => (
            <div key={d.id} className="contact-card">
              <span className="contact-icon">{d.icon}</span>
              <div className="contact-info" style={{ flex: 1 }}>
                <h4>{d.dept}</h4>
                <a href={`mailto:${d.email}`} className="team-email">{d.email}</a>
                <span className="contact-ext">Ext: {d.ext}</span>
              </div>
              <div className="contact-actions">
                <button className="tc-edit-btn"   onClick={() => openEditDept(d)}>📝</button>
                <button className="tc-delete-btn" onClick={() => setDeleteConfirm({ type: 'dept', id: d.id })}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Emergency Contacts ── */}
      <div className="content-section">
        <h2 className="section-title">Emergency Contacts</h2>
        <div className="emergency-grid">
          {emergency.map((e) => (
            <div key={e.id} className="emergency-card" style={{ borderLeftColor: e.color }}>
              <div>
                <span className="emergency-label">{e.label}</span>
                <span className="emergency-ext" style={{ color: e.color, display: 'block', marginTop: 4 }}>Ext: {e.ext}</span>
              </div>
              <div className="contact-actions">
                <button className="tc-edit-btn"   onClick={() => openEditEmergency(e)}>📝</button>
                <button className="tc-delete-btn" onClick={() => setDeleteConfirm({ type: 'emergency', id: e.id })}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Office Info ── */}
      <div className="content-section">
        <h2 className="section-title">Office Information</h2>
        <div className="section-content">
          <ul>
            <li><strong>Main Office:</strong> 3rd Floor, RC Square</li>
            <li><strong>Reception:</strong> Ext: 1000</li>
            <li><strong>Website:</strong> <a href="https://rclabs.co" target="_blank" rel="noreferrer">www.rclabs.co</a></li>
            <li><strong>Working Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM</li>
          </ul>
        </div>
      </div>

      {/* ── Edit / Add Dept Modal ── */}
      {modal && modal.type === 'dept' && form && (
        <div className="eng-overlay" onClick={closeModal}>
          <div className="eng-modal eng-form-modal" onClick={e => e.stopPropagation()}>
            <button className="eng-modal-close" onClick={closeModal}>×</button>
            <h2 className="eng-modal-title">
              {modal.mode === 'add' ? 'Add Department Contact' : 'Edit Department Contact'}
            </h2>
            <div className="eng-form">
              <div className="eng-form-row">
                <div className="eng-form-group">
                  <label>Department Name <span className="required">*</span></label>
                  <input value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))} placeholder="e.g. Engineering" />
                </div>
                <div className="eng-form-group">
                  <label>Extension</label>
                  <input value={form.ext} onChange={e => setForm(f => ({ ...f, ext: e.target.value }))} placeholder="e.g. 1300" />
                </div>
              </div>
              <div className="eng-form-group">
                <label>Email <span className="required">*</span></label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="dept@rclabs.co" />
              </div>
            </div>
            <div className="eng-modal-footer">
              <button className="eng-save-btn" onClick={saveDept}>
                {modal.mode === 'add' ? ' Add Contact' : 'Save Changes'}
              </button>
              <button className="eng-cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Emergency Modal ── */}
      {modal && modal.type === 'emergency' && form && (
        <div className="eng-overlay" onClick={closeModal}>
          <div className="eng-modal" onClick={e => e.stopPropagation()}>
            <button className="eng-modal-close" onClick={closeModal}>×</button>
            <h2 className="eng-modal-title">Edit Emergency Contact</h2>
            <div className="eng-form">
              <div className="eng-form-row">
                <div className="eng-form-group">
                  <label>Label <span className="required">*</span></label>
                  <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="e.g. Security" />
                </div>
                <div className="eng-form-group">
                  <label>Extension <span className="required">*</span></label>
                  <input value={form.ext} onChange={e => setForm(f => ({ ...f, ext: e.target.value }))} placeholder="e.g. 9999" />
                </div>
              </div>
              <div className="eng-form-group">
                <label>Color</label>
                <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                  style={{ width: '100%', height: 44, padding: 4, border: '2px solid #e0e0e0', borderRadius: 8, cursor: 'pointer' }} />
              </div>
            </div>
            <div className="eng-modal-footer">
              <button className="eng-save-btn" onClick={saveEmergency}>Save Changes</button>
              <button className="eng-cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteConfirm && (
        <div className="eng-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="eng-confirm-modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Contact?</h3>
            <p>This action cannot be undone.</p>
            <div className="eng-confirm-actions">
              <button className="tc-delete-btn" onClick={() =>
                deleteConfirm.type === 'dept'
                  ? deleteDept(deleteConfirm.id)
                  : deleteEmergency(deleteConfirm.id)
              }>
                Yes, Delete
              </button>
              <button className="eng-cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
