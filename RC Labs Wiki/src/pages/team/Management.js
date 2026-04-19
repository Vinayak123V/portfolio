import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import useConfirm from '../../hooks/useConfirm';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';
import './Team.css';

const roleColors = {
  'Executive':        '#0066cc',
  'Engineering':      '#6f42c1',
  'Operations':       '#28a745',
  'Finance':          '#fd7e14',
  'Sales & Marketing':'#dc3545',
  'HR':               '#20c997',
  'Product':          '#e83e8c',
};

const initialLeaders = [
  { id: 1,  name: '[CEO Name]',        role: 'Chief Executive Officer',    dept: 'Executive',         email: 'ceo@rclabs.co',       bio: "Leads RC Labs' overall vision, strategy, and business development across global markets.",                                    photo: null },
  { id: 2,  name: '[CTO Name]',        role: 'Chief Technology Officer',   dept: 'Engineering',       email: 'cto@rclabs.co',       bio: 'Oversees all technology development, R&D roadmap, and engineering excellence at RC Labs.',                                    photo: null },
  { id: 3,  name: '[VP Eng Name]',     role: 'VP Engineering',             dept: 'Engineering',       email: 'vpeng@rclabs.co',     bio: 'Manages engineering teams, product delivery, and technical operations across all BMS projects.',                               photo: null },
  { id: 4,  name: '[VP Ops Name]',     role: 'VP Operations',              dept: 'Operations',        email: 'vpops@rclabs.co',     bio: 'Responsible for supply chain, manufacturing, quality assurance, and operational efficiency.',                                  photo: null },
  { id: 5,  name: '[CFO Name]',        role: 'Chief Financial Officer',    dept: 'Finance',           email: 'cfo@rclabs.co',       bio: 'Manages financial planning, investor relations, budgeting, and financial reporting.',                                          photo: null },
  { id: 6,  name: '[HR Manager]',      role: 'HR Manager',                 dept: 'HR',                email: 'hr@rclabs.co',        bio: 'Leads talent acquisition, employee experience, culture, and HR policies at RC Labs.',                                          photo: null },
  { id: 7,  name: '[Sales Director]',  role: 'Sales Director',             dept: 'Sales & Marketing', email: 'sales@rclabs.co',     bio: "Drives revenue growth, manages key accounts, and expands RC Labs' customer base globally.",                                    photo: null },
  { id: 8,  name: '[Product Manager]', role: 'Product Manager',            dept: 'Product',           email: 'product@rclabs.co',   bio: 'Defines product roadmap, gathers customer requirements, and coordinates cross-functional delivery.',                           photo: null },
];

const emptyLeader = { name: '', role: '', dept: 'Executive', email: '', bio: '', photo: null };

const Management = () => {
  const { user } = useAuth();
  const [members, setMembers] = useLocalStorage('mgmt_team_members', initialLeaders);
  const [history, setHistory] = useLocalStorage('mgmt_team_history', []);
  const [showHistory, setShowHistory] = useState(false);
  const [modal, setModal]                 = useState(null);
  const [form, setForm]                   = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const photoRef = useRef();

  const logHistory = (action, memberName) => {
    setHistory(prev => [{
      id: Date.now(), action, memberName,
      by: user?.name || 'Unknown',
      at: new Date().toISOString(),
    }, ...prev].slice(0, 100));
  };

  const initials = (name) =>
    name.replace(/[\[\]]/g, '').trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  const openView = (m)      => setModal({ mode: 'view', member: m });
  const openEdit = (m, e)   => { e.stopPropagation(); setForm({ ...m }); setModal({ mode: 'edit', member: m }); };
  const openAdd  = ()       => { setForm({ ...emptyLeader, id: Date.now() }); setModal({ mode: 'add', member: null }); };
  const closeModal = ()     => { setModal(null); setForm(null); };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.role.trim() || !form.email.trim()) {
      alert('Name, Role, and Email are required.');
      return;
    }
    if (modal.mode === 'add') {
      setMembers(prev => [...prev, form]);
      logHistory('added', form.name);
    } else {
      setMembers(prev => prev.map(m => m.id === form.id ? form : m));
      logHistory('edited', form.name);
    }
    closeModal();
  };

  const confirmDelete = (id, e) => { e.stopPropagation(); setDeleteConfirm(id); };

  const handleDelete = () => {
    const member = members.find(m => m.id === deleteConfirm);
    setMembers(prev => prev.filter(m => m.id !== deleteConfirm));
    logHistory('deleted', member?.name || 'Unknown');
    setDeleteConfirm(null);
    if (modal?.member?.id === deleteConfirm) closeModal();
  };

  const isFormMode = modal?.mode === 'edit' || modal?.mode === 'add';

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/team-directory">Team Directory</Link><span>/</span>
        <span>Management</span>
      </div>

      <div className="mgmt-bg-wrapper">      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title">Management Team</h1>
          <p className="page-description">The leadership driving RC Labs' mission to power a greener world.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="eng-history-btn" onClick={() => setShowHistory(h => !h)}>
            History {history.length > 0 && <span className="eng-history-count">{history.length}</span>}
          </button>
          <button className="eng-add-btn" onClick={openAdd}>+ Add Member</button>
        </div>
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

      {/* ── Cards Grid ── */}
      <div className="management-grid">
        {members.map((m) => (
          <div key={m.id} className="management-card" onClick={() => openView(m)}>
            {m.photo
              ? <img src={m.photo} alt={m.name} className="mgmt-photo" />
              : <div className="mgmt-avatar" style={{ background: roleColors[m.dept] || '#0066cc' }}>
                  {initials(m.name)}
                </div>
            }
            <div className="mgmt-info">
              <h3 className="mgmt-name">{m.name}</h3>
              <p className="mgmt-role" style={{ color: roleColors[m.dept] || '#0066cc' }}>{m.role}</p>
              <span className="team-dept-badge" style={{ background: roleColors[m.dept] || '#0066cc' }}>{m.dept}</span>
              <p className="mgmt-bio">{m.bio}</p>
              <a href={`mailto:${m.email}`} className="team-email" onClick={e => e.stopPropagation()}>{m.email}</a>
              <div className="team-card-actions">
                <button className="tc-edit-btn"   onClick={(e) => openEdit(m, e)}>Edit</button>
                <button className="tc-delete-btn" onClick={(e) => confirmDelete(m.id, e)}> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── View Modal ── */}
      {modal?.mode === 'view' && (
        <div className="eng-overlay" onClick={closeModal}>
          <div className="eng-modal" onClick={e => e.stopPropagation()}>
            <button className="eng-modal-close" onClick={closeModal}>×</button>
            <div className="eng-view-header">
              {modal.member.photo
                ? <img src={modal.member.photo} alt={modal.member.name} className="eng-view-photo" />
                : <div className="eng-view-avatar" style={{ background: roleColors[modal.member.dept] || '#0066cc' }}>
                    {initials(modal.member.name)}
                  </div>
              }
              <div>
                <h2 className="eng-view-name">{modal.member.name}</h2>
                <p className="eng-view-role">{modal.member.role}</p>
                <span className="team-dept-badge" style={{ background: roleColors[modal.member.dept] || '#0066cc' }}>
                  {modal.member.dept}
                </span>
              </div>
            </div>
            <div className="eng-view-body">
              <div className="eng-detail-row">
                <span className="eng-detail-label">Email</span>
                <a href={`mailto:${modal.member.email}`} className="team-email">{modal.member.email}</a>
              </div>
              <div className="eng-detail-row">
                <span className="eng-detail-label">About</span>
                <p style={{ color: '#444', lineHeight: 1.7, margin: 0 }}>{modal.member.bio}</p>
              </div>
            </div>
            <div className="eng-modal-footer">
              <button className="tc-edit-btn"   onClick={(e) => openEdit(modal.member, e)}>Edit</button>
              <button className="tc-delete-btn" onClick={(e) => confirmDelete(modal.member.id, e)}> Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit / Add Modal ── */}
      {isFormMode && form && (
        <div className="eng-overlay" onClick={closeModal}>
          <div className="eng-modal eng-form-modal" onClick={e => e.stopPropagation()}>
            <button className="eng-modal-close" onClick={closeModal}>×</button>
            <h2 className="eng-modal-title">
              {modal.mode === 'add' ? ' Add Management Member' : 'Edit Management Member'}
            </h2>

            {/* Photo Upload */}
            <div className="eng-photo-upload" onClick={() => photoRef.current.click()}>
              {form.photo
                ? <img src={form.photo} alt="preview" className="eng-photo-preview" />
                : <div className="eng-photo-placeholder">
                    <span style={{ fontSize: '2.5rem' }}>📷</span>
                    <span>Click to upload photo</span>
                  </div>
              }
              <input ref={photoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
            </div>

            <div className="eng-form">
              <div className="eng-form-row">
                <div className="eng-form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter your name" />
                </div>
                <div className="eng-form-group">
                  <label>Role / Title <span className="required">*</span></label>
                  <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Chief Executive Officer" />
                </div>
              </div>

              <div className="eng-form-row">
                <div className="eng-form-group">
                  <label>Department</label>
                  <select value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))}>
                    {Object.keys(roleColors).map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="eng-form-group">
                  <label>Email <span className="required">*</span></label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="name@rclabs.co" />
                </div>
              </div>

              <div className="eng-form-group">
                <label>Bio / About</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  placeholder="Brief description of responsibilities and background..."
                  style={{ padding: '10px 14px', border: '2px solid #e0e0e0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.95rem', resize: 'vertical', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#0066cc'}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>

            <div className="eng-modal-footer">
              <button className="eng-save-btn" onClick={handleSave}>
                {modal.mode === 'add' ? 'Add Member' : ' Save Changes'}
              </button>
              <button className="eng-cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteConfirm && (
        <div className="eng-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="eng-confirm-modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Member?</h3>
            <p>This action cannot be undone.</p>
            <div className="eng-confirm-actions">
              <button className="tc-delete-btn" onClick={handleDelete}>Yes, Delete</button>
              <button className="eng-cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div> {/* end mgmt-bg-wrapper */}
    </div>
  );
};

export default Management;
