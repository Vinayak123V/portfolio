import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import useConfirm from '../../hooks/useConfirm';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';
import './Team.css';

const deptColors = {
  Hardware:      '#0066cc',
  Firmware:      '#6f42c1',
  Software:      '#28a745',
  Data:          '#fd7e14',
  Verification_and_Validation:'#dc3545',
  'Manufacturing_Supply Chain':'#20c997',
  Production:    '#e83e8c',
};

const initialMembers = [
  { id: 1, name: 'Dr. Rajesh Kumar',  role: 'Hardware Engineering Lead', dept: 'Hardware', email: 'hardware@rclabs.co',    skills: ['Circuit Design', 'PCB Layout', 'Power Electronics'], photo: null },
  { id: 2, name: "Anita Desai",       role: 'Firmware Engineering Lead', dept: 'Firmware', email: 'firmware@rclabs.co',    skills: ['Embedded C', 'RTOS', 'CAN Protocol'],                photo: null },
  { id: 3, name: "Kevin O'Brien",     role: 'Software Engineering Lead', dept: 'Software', email: 'software@rclabs.co',    skills: ['Python', 'React', 'Cloud Architecture'],             photo: null },
  { id: 4, name: 'Sophia Martinez',   role: 'Data Science Lead',         dept: 'Data',     email: 'datascience@rclabs.co', skills: ['ML/AI', 'Battery Modelling', 'Python'],              photo: null },
  { id: 5, name: 'Thomas Anderson',   role: 'Battery Engineering Lead',  dept: 'Battery',  email: 'battery@rclabs.co',     skills: ['Electrochemistry', 'Cell Testing', 'Thermal Mgmt'], photo: null },
  { id: 6, name: 'Sarah Chen',        role: 'Hardware Engineer',         dept: 'Hardware', email: 'sarah.chen@rclabs.co',  skills: ['Altium Designer', 'Signal Integrity', 'EMC'],        photo: null },
  { id: 7, name: 'Yuki Tanaka',       role: 'Firmware Engineer',         dept: 'Firmware', email: 'yuki.t@rclabs.co',      skills: ['STM32', 'FreeRTOS', 'BLE'],                          photo: null },
  { id: 8, name: 'James Wilson',      role: 'Software Engineer',         dept: 'Software', email: 'james.w@rclabs.co',     skills: ['Node.js', 'React', 'AWS'],                           photo: null },
  { id: 9, name: 'Maya Patel',        role: 'ML Engineer',               dept: 'Data',     email: 'maya.p@rclabs.co',      skills: ['TensorFlow', 'SOC Estimation', 'Data Pipelines'],    photo: null },
  { id: 10, name: 'Wei Zhang',        role: 'Hardware Engineer',         dept: 'Hardware', email: 'wei.z@rclabs.co',       skills: ['Thermal Design', 'MOSFET Drivers', 'Simulation'],    photo: null },
  { id: 11, name: 'Fatima Ali',       role: 'Firmware Engineer',         dept: 'Firmware', email: 'fatima.a@rclabs.co',    skills: ['CAN/LIN', 'Bootloader', 'Unit Testing'],             photo: null },
  { id: 12, name: 'Omar Farooq',      role: 'Backend Engineer',          dept: 'Software', email: 'omar.f@rclabs.co',      skills: ['Django', 'PostgreSQL', 'Docker'],                    photo: null },
];

const emptyMember = {
  name: '', role: '', dept: 'Hardware', email: '', skills: [], photo: null
};

const EngineeringTeam = () => {
  const { user } = useAuth();
  const [members, setMembers] = useLocalStorage('eng_team_members', initialMembers);
  const [history, setHistory] = useLocalStorage('eng_team_history', []);
  const [showHistory, setShowHistory] = useState(false);
  const [modal, setModal]           = useState(null);
  const [form, setForm]             = useState(null);
  const [skillInput, setSkillInput] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const photoRef = useRef();
  const { confirm: showConfirm, config, handleConfirm, handleCancel } = useConfirm();

  const logHistory = (action, memberName) => {
    const entry = {
      id: Date.now(),
      action,       // 'added' | 'edited' | 'deleted'
      memberName,
      by: user?.name || 'Unknown',
      at: new Date().toISOString(),
    };
    setHistory(prev => [entry, ...prev].slice(0, 100)); // keep last 100
  };

  /* ── helpers ── */
  const initials = (name) =>
    name.trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  const openView = (m) => setModal({ mode: 'view', member: m });

  const openEdit = (m, e) => {
    e.stopPropagation();
    setForm({ ...m, skills: [...m.skills] });
    setSkillInput('');
    setModal({ mode: 'edit', member: m });
  };

  const openAdd = () => {
    setForm({ ...emptyMember, skills: [], id: Date.now() });
    setSkillInput('');
    setModal({ mode: 'add', member: null });
  };

  const closeModal = () => { setModal(null); setForm(null); };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm(f => ({ ...f, skills: [...f.skills, s] }));
    }
    setSkillInput('');
  };

  const removeSkill = (skill) =>
    setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }));

  const handleSave = () => {
    if (!form.name.trim() || !form.role.trim() || !form.email.trim()) {
      setDeleteConfirm({ type: 'alert', message: 'Name, Role, and Email are required.' });
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

  const confirmDelete = async (id, e) => {
    e.stopPropagation();
    const ok = await showConfirm({
      title: 'Delete Team Member?',
      message: 'This will permanently remove this member from the Engineering Team.',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
      type: 'danger',
    });
    if (ok) {
      const member = members.find(m => m.id === id);
      setMembers(prev => prev.filter(m => m.id !== id));
      logHistory('deleted', member?.name || 'Unknown');
      if (modal?.member?.id === id) closeModal();
    }
  };

  const isFormMode = modal?.mode === 'edit' || modal?.mode === 'add';

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/team-directory">Team Directory</Link><span>/</span>
        <span>Engineering Team</span>
      </div>

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title"> Engineering Team</h1>
          <p className="page-description">The technical backbone of RC Labs — building the future of battery management.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="eng-history-btn" onClick={() => setShowHistory(h => !h)}>
            History {history.length > 0 && <span className="eng-history-count">{history.length}</span>}
          </button>
          <button className="eng-add-btn" onClick={openAdd}>+ Add Member</button>
        </div>
      </div>

      {/* ── History Panel ── */}
      {showHistory && (
        <div className="eng-history-panel">
          <div className="eng-history-header">
            <h3>Change History</h3>
            {history.length > 0 && (
              <button className="eng-history-clear" onClick={() => { setHistory([]); }}>Clear All</button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="eng-history-empty">No changes recorded yet.</p>
          ) : (
            <ul className="eng-history-list">
              {history.map(entry => (
                <li key={entry.id} className={`eng-history-item eng-history-${entry.action}`}>
                  <span className="eng-history-icon">
                    {entry.action === 'added'   && ''}
                    {entry.action === 'edited'  && ''}
                    {entry.action === 'deleted' && ''}
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

      {/* ── Cards Grid ── */}
      <div className="team-grid">
        {members.map((m) => (
          <div key={m.id} className="team-card" onClick={() => openView(m)}>
            {/* Photo / Avatar */}
            <div className="team-avatar-wrap">
              {m.photo
                ? <img src={m.photo} alt={m.name} className="team-photo" />
                : <div className="team-avatar" style={{ background: deptColors[m.dept] }}>{initials(m.name)}</div>
              }
            </div>

            <div className="team-info">
              <h3 className="team-name">{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <span className="team-dept-badge" style={{ background: deptColors[m.dept] }}>{m.dept}</span>
              <a href={`mailto:${m.email}`} className="team-email" onClick={e => e.stopPropagation()}>{m.email}</a>
              <div className="team-skills">
                {m.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
              </div>
              <div className="team-card-actions">
                <button className="tc-edit-btn" onClick={(e) => openEdit(m, e)}>Edit</button>
                <button className="tc-delete-btn" onClick={(e) => confirmDelete(m.id, e)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog config={config} onConfirm={handleConfirm} onCancel={handleCancel} />

      {/* ── View Modal ── */}
      {modal?.mode === 'view' && (
        <div className="eng-overlay" onClick={closeModal}>
          <div className="eng-modal" onClick={e => e.stopPropagation()}>
            <button className="eng-modal-close" onClick={closeModal}>×</button>
            <div className="eng-view-header">
              {modal.member.photo
                ? <img src={modal.member.photo} alt={modal.member.name} className="eng-view-photo" />
                : <div className="eng-view-avatar" style={{ background: deptColors[modal.member.dept] }}>
                    {initials(modal.member.name)}
                  </div>
              }
              <div>
                <h2 className="eng-view-name">{modal.member.name}</h2>
                <p className="eng-view-role">{modal.member.role}</p>
                <span className="team-dept-badge" style={{ background: deptColors[modal.member.dept] }}>
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
                <span className="eng-detail-label">Skills</span>
                <div className="team-skills" style={{ marginTop: 6 }}>
                  {modal.member.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
                </div>
              </div>
            </div>
            <div className="eng-modal-footer">
              <button className="tc-edit-btn" onClick={(e) => openEdit(modal.member, e)}>Edit</button>
              <button className="tc-delete-btn" onClick={(e) => confirmDelete(modal.member.id, e)}>Delete</button>
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
              {modal.mode === 'add' ? ' Add Team Member' : ' Edit Team Member'}
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
              <input
                ref={photoRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
            </div>

            <div className="eng-form">
              <div className="eng-form-row">
                <div className="eng-form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Enter you name" />
                </div>
                <div className="eng-form-group">
                  <label>Role / Title <span className="required">*</span></label>
                  <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Hardware Engineer" />
                </div>
              </div>

              <div className="eng-form-row">
                <div className="eng-form-group">
                  <label>Department</label>
                  <select value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))}>
                    {Object.keys(deptColors).map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="eng-form-group">
                  <label>Email <span className="required">*</span></label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="name@rclabs.co" />
                </div>
              </div>

              <div className="eng-form-group">
                <label>Skills</label>
                <div className="eng-skill-input-row">
                  <input
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Type a skill and press Enter or Add"
                  />
                  <button type="button" className="eng-skill-add-btn" onClick={addSkill}>Add</button>
                </div>
                <div className="team-skills" style={{ marginTop: 10 }}>
                  {form.skills.map((s, i) => (
                    <span key={i} className="skill-tag skill-tag-removable">
                      {s}
                      <button className="skill-remove" onClick={() => removeSkill(s)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="eng-modal-footer">
              <button className="eng-save-btn" onClick={handleSave}>
                {modal.mode === 'add' ? 'Add Member' : 'Save Changes'}
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
              <button className="tc-delete-btn" onClick={() => {
                setMembers(prev => prev.filter(m => m.id !== deleteConfirm));
                if (modal?.member?.id === deleteConfirm) closeModal();
                setDeleteConfirm(null);
              }}>Yes, Delete</button>
              <button className="eng-cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineeringTeam;
