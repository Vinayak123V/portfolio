import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';
import useConfirm from '../../hooks/useConfirm';
import useToast from '../../hooks/useToast';
import ConfirmDialog from '../../components/ConfirmDialog';
import Toast from '../../components/Toast';
import ProjectHistory from './ProjectHistory';
import '../../App.css';
import './ProjectCard.css';

const ActiveProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { confirm, config, handleConfirm, handleCancel } = useConfirm();
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#28a745';
      case 'Withheld':
        return '#ffc107';
      case 'Aborted':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isDeadlineWarning = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    return deadlineDate <= today;
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineWarningMessage = (project) => {
    const daysUntil = getDaysUntilDeadline(project.deadline);
    if (daysUntil < 0) {
      return `Project "${project.name}" is ${Math.abs(daysUntil)} day${Math.abs(daysUntil) !== 1 ? 's' : ''} overdue!`;
    } else if (daysUntil === 0) {
      return `Project "${project.name}" deadline is TODAY!`;
    } else if (daysUntil <= 7) {
      return `Project "${project.name}" deadline is in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}!`;
    }
    return null;
  };

  const getProjectsWithDeadlineWarnings = () => {
    return filteredProjects.filter(project => {
      const daysUntil = getDaysUntilDeadline(project.deadline);
      return daysUntil <= 7; // Show warnings for deadlines within 7 days or overdue
    });
  };

  const handleEditClick = (project) => {
    setEditedProject({ ...project });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const saved = await updateProject(editedProject.id, editedProject);
      setSelectedProject(saved || editedProject);
      setIsEditing(false);
      showToast('Project updated successfully.', 'success', 'Saved');
    } catch (err) {
      showToast(`Failed to save changes: ${err.message}`, 'error', 'Error');
    }
  };

  const handleCancelEdit = () => {
    setEditedProject(null);
    setIsEditing(false);
  };

  const handleAddProject = () => {
    const maxId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) : 0;
    const newProject = {
      id: maxId + 1,
      name: '',
      category: selectedCategory,
      status: 'Active',
      startDate: new Date().toISOString().split('T')[0],
      deadline: '',
      projectLead: '',
      teamMembers: [],
      description: '',
      objectives: [''],
      progress: 0
    };
    setEditedProject(newProject);
    setIsAdding(true);
  };

  const handleSaveNewProject = async () => {
    if (!editedProject.name || !editedProject.deadline || !editedProject.projectLead) {
      showToast('Please fill in: Project Name, Deadline, and Project Lead.', 'warning', 'Missing Fields');
      return;
    }
    try {
      await addProject(editedProject);
      setEditedProject(null);
      setIsAdding(false);
      showToast(`"${editedProject.name}" was created successfully.`, 'success', 'Project Created');
    } catch (err) {
      showToast(`Failed to create project: ${err.message}`, 'error', 'Error');
    }
  };

  const handleCancelAdd = () => {
    setEditedProject(null);
    setIsAdding(false);
  };

  const handleDeleteProject = async (projectId, e) => {
    e.stopPropagation();
    const ok = await confirm({
      title: 'Delete Project?',
      message: 'This will permanently remove the project. This action cannot be undone.',
      confirmText: 'Yes, Delete',
      type: 'danger',
    });
    if (ok) {
      await deleteProject(projectId);
      if (selectedProject && selectedProject.id === projectId) setSelectedProject(null);
      showToast('Project deleted.', 'success', 'Deleted');
    }
  };

  const handleKeepWarning = async (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) await confirm({
      title: 'Deadline Acknowledged',
      message: `"${project.name}" will continue with the current deadline: ${formatDate(project.deadline)}`,
      confirmText: 'OK',
      cancelText: '',
      type: 'info',
    });
  };

  const handleExtendDeadline = async (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const newDeadline = new Date(project.deadline);
      newDeadline.setDate(newDeadline.getDate() + 7);
      const updatedProject = { ...project, deadline: newDeadline.toISOString().split('T')[0] };
      const saved = await updateProject(projectId, updatedProject, 'deadline_extended');
      if (selectedProject && selectedProject.id === projectId) setSelectedProject(saved || updatedProject);
    }
  };

  const handleRemoveProject = async (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const ok = await confirm({
      title: `Remove "${project.name}"?`,
      message: 'This will permanently remove the project. This action cannot be undone.',
      confirmText: 'Yes, Remove',
      type: 'danger',
    });
    if (ok) {
      await deleteProject(projectId);
      if (selectedProject && selectedProject.id === projectId) setSelectedProject(null);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedProject({ ...editedProject, [field]: value });
  };

  const handleObjectiveChange = (index, value) => {
    const newObjectives = [...editedProject.objectives];
    newObjectives[index] = value;
    setEditedProject({ ...editedProject, objectives: newObjectives });
  };

  const handleTeamMemberChange = (index, value) => {
    const newTeamMembers = [...editedProject.teamMembers];
    newTeamMembers[index] = value;
    setEditedProject({ ...editedProject, teamMembers: newTeamMembers });
  };

  const addObjective = () => {
    setEditedProject({
      ...editedProject,
      objectives: [...editedProject.objectives, '']
    });
  };

  const removeObjective = (index) => {
    const newObjectives = editedProject.objectives.filter((_, i) => i !== index);
    setEditedProject({ ...editedProject, objectives: newObjectives });
  };

  const addTeamMember = () => {
    setEditedProject({
      ...editedProject,
      teamMembers: [...editedProject.teamMembers, '']
    });
  };

  const removeTeamMember = (index) => {
    const newTeamMembers = editedProject.teamMembers.filter((_, i) => i !== index);
    setEditedProject({ ...editedProject, teamMembers: newTeamMembers });
  };

  const filteredProjects = selectedCategory 
    ? projects.filter(p => p.category === selectedCategory && p.status !== 'Completed' && p.status !== 'Withheld')
    : projects.filter(p => p.status !== 'Completed' && p.status !== 'Withheld');

  const softwareCount = projects.filter(p => p.category === 'Software' && p.status !== 'Completed' && p.status !== 'Withheld').length;
  const hardwareCount = projects.filter(p => p.category === 'Hardware' && p.status !== 'Completed' && p.status !== 'Withheld').length;

  return (
    <div>
      <Toast toasts={toasts} onDismiss={dismissToast} />
      <ConfirmDialog config={config} onConfirm={handleConfirm} onCancel={handleCancel} />
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/project-documentation">Project Documentation</Link>
        <span>/</span>
        <span>Active Projects</span>
      </div>

      <div className="page-header">
        <h1 className="page-title">Active Projects</h1>
        <p className="page-description">
          Browse all active projects at RC Labs with their current status and details.
        </p>
      </div>

      <ProjectHistory />

      {!selectedCategory ? (
        <div className="category-cards-container">
          <div className="category-card" onClick={() => setSelectedCategory('Software')}>

            <h2 className="category-title">Software Projects</h2>
            <p className="category-description">
              Firmware, applications, and software solutions for battery management systems.
            </p>
            <div className="category-count">{softwareCount} Projects</div>
          </div>

          <div className="category-card" onClick={() => setSelectedCategory('Hardware')}>

            <h2 className="category-title">Hardware Projects</h2>
            <p className="category-description">
              Physical BMS units, circuit design, and hardware development projects.
            </p>
            <div className="category-count">{hardwareCount} Projects</div>
          </div>
        </div>
      ) : (
        <>
          <div className="category-header">
            <button className="back-button" onClick={() => setSelectedCategory(null)}>
              ← Back to Categories
            </button>
            <h2 className="category-selected-title">
              {selectedCategory} Projects ({filteredProjects.length})
            </h2>
            <button className="add-project-button" onClick={handleAddProject}>
              + Add New Project
            </button>
          </div>

          {getProjectsWithDeadlineWarnings().length > 0 && (
            <div className="deadline-warnings-container">
              {getProjectsWithDeadlineWarnings().map((project) => (
                <div key={project.id} className="deadline-warning-banner">
                  <span className="warning-icon">⚠️</span>
                  <span className="warning-text">{getDeadlineWarningMessage(project)}</span>
                  <div className="warning-actions">
                    <button 
                      className="warning-btn keep-btn" 
                      onClick={() => handleKeepWarning(project.id)}
                      title="Keep project as is"
                    >
                      ✓ Keep
                    </button>
                    <button 
                      className="warning-btn extend-btn" 
                      onClick={() => handleExtendDeadline(project.id)}
                      title="Extend deadline by 7 days"
                    >
                       Extend
                    </button>
                    <button 
                      className="warning-btn remove-btn" 
                      onClick={() => handleRemoveProject(project.id)}
                      title="Remove project"
                    >
                       Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"></div>
              <h3 className="empty-state-title">No Projects Yet</h3>
              <p className="empty-state-description">
                Click the "Add New Project" button above to create your first {selectedCategory.toLowerCase()} project.
              </p>
            </div>
          ) : (
            <div className="project-cards-container">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <button 
              className="delete-card-button" 
              onClick={(e) => handleDeleteProject(project.id, e)}
              title="Delete Project"
            >
              🗑
            </button>
            <div className="project-card-header">
              <h3 className="project-card-title">{project.name}</h3>
              <span
                className="project-status-badge"
                style={{ backgroundColor: getStatusColor(project.status) }}
              >
                {project.status}
              </span>
            </div>
            <div className="project-card-body">
              <p className="project-card-description">{project.description}</p>
              <div className="project-card-meta">
                <div className="meta-item">
                  <span className="meta-label">Project Lead:</span>
                  <span className="meta-value">{project.projectLead}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Team Size:</span>
                  <span className="meta-value">{project.teamMembers.length + 1} members</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Deadline:</span>
                  <span className={`meta-value ${isDeadlineWarning(project.deadline) ? 'deadline-warning-text' : ''}`}>
                    {formatDate(project.deadline)}
                    {isDeadlineWarning(project.deadline) && ' ⚠️'}
                  </span>
                </div>
              </div>
              {project.status === 'Active' && (
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{project.progress}% Complete</span>
                </div>
              )}
            </div>
          </div>
        ))}
          </div>
          )}
        </>
      )}

      {selectedProject && !isEditing && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              ×
            </button>
            <div className="modal-header">
              <h2>{selectedProject.name}</h2>
              <div className="modal-header-actions">
                <span
                  className="project-status-badge"
                  style={{ backgroundColor: getStatusColor(selectedProject.status) }}
                >
                  {selectedProject.status}
                </span>
                <button className="edit-button" onClick={() => handleEditClick(selectedProject)}>
                   Edit
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Project Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">{selectedProject.status}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Start Date:</span>
                    <span className="detail-value">{formatDate(selectedProject.startDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Deadline:</span>
                    <span className="detail-value">{formatDate(selectedProject.deadline)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Project Lead:</span>
                    <span className="detail-value">{selectedProject.projectLead}</span>
                  </div>
                </div>
              </div>

              {selectedProject.status === 'Active' && (
                <div className="modal-section">
                  <h3>Progress</h3>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{selectedProject.progress}% Complete</span>
                  </div>
                </div>
              )}

              <div className="modal-section">
                <h3>Description</h3>
                <p>{selectedProject.description}</p>
              </div>

              <div className="modal-section">
                <h3>Key Objectives</h3>
                <ul className="objectives-list">
                  {selectedProject.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3>Team Members</h3>
                <div className="team-members">
                  <div className="team-member lead">
                    <span className="member-icon"></span>
                    <div>
                      <div className="member-name">{selectedProject.projectLead}</div>
                      <div className="member-role">Project Lead</div>
                    </div>
                  </div>
                  {selectedProject.teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                      <span className="member-icon"></span>
                      <div>
                        <div className="member-name">{member}</div>
                        <div className="member-role">Team Member</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedProject.status === 'Aborted' && selectedProject.abortReason && (
                <div className="modal-section abort-reason">
                  <h3>Abort Reason</h3>
                  <p>{selectedProject.abortReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {(isEditing || isAdding) && editedProject && (
        <div className="modal-overlay" onClick={isAdding ? handleCancelAdd : handleCancelEdit}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={isAdding ? handleCancelAdd : handleCancelEdit}>
              ×
            </button>
            <div className="modal-header">
              <h2>{isAdding ? 'Add New Project' : 'Edit Project'}</h2>
            </div>
            <div className="modal-body">
              <div className="edit-form">
                <div className="form-group">
                  <label>Project Name <span className="required">*</span></label>
                  <input
                    type="text"
                    value={editedProject.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={editedProject.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Withheld">Withheld</option>
                      <option value="Aborted">Aborted</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={editedProject.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      disabled={isAdding}
                      className={isAdding ? 'disabled-select' : ''}
                    >
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                    </select>
                    {isAdding && (
                      <small className="field-note">Category is set based on your selection</small>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={editedProject.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Deadline <span className="required">*</span></label>
                    <input
                      type="date"
                      value={editedProject.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Lead <span className="required">*</span></label>
                  <input
                    type="text"
                    value={editedProject.projectLead}
                    onChange={(e) => handleInputChange('projectLead', e.target.value)}
                    placeholder="Enter project lead name"
                  />
                </div>

                {editedProject.status === 'Active' && (
                  <div className="form-group">
                    <label>Progress (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editedProject.progress}
                      onChange={(e) => handleInputChange('progress', parseInt(e.target.value))}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows="4"
                    value={editedProject.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter project description"
                  />
                </div>

                <div className="form-group">
                  <label>Key Objectives</label>
                  {editedProject.objectives.map((objective, index) => (
                    <div key={index} className="array-input">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                      />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeObjective(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={addObjective}>
                    + Add Objective
                  </button>
                </div>

                <div className="form-group">
                  <label>Team Members</label>
                  {editedProject.teamMembers.map((member, index) => (
                    <div key={index} className="array-input">
                      <input
                        type="text"
                        value={member}
                        onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                      />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeTeamMember(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={addTeamMember}>
                    + Add Team Member
                  </button>
                </div>

                {editedProject.status === 'Aborted' && (
                  <div className="form-group">
                    <label>Abort Reason</label>
                    <textarea
                      rows="3"
                      value={editedProject.abortReason || ''}
                      onChange={(e) => handleInputChange('abortReason', e.target.value)}
                    />
                  </div>
                )}

                <div className="form-actions">
                  {isAdding ? (
                    <>
                      <button className="save-btn" onClick={handleSaveNewProject}>
                         Create Project
                      </button>
                      <button className="cancel-btn" onClick={handleCancelAdd}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="save-btn" onClick={handleSaveEdit}>
                         Save Changes
                      </button>
                      <button className="cancel-btn" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveProjects;

