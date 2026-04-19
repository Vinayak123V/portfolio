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

const WithheldProjects = () => {
  const { projects, updateProject, deleteProject } = useProjects();
  const { confirm, config, handleConfirm, handleCancel } = useConfirm();
  const { toasts, show: showToast, dismiss: dismissToast } = useToast();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const getStatusColor = (status) => {
    return '#ffc107'; // Yellow for withheld
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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

  const filteredProjects = selectedCategory 
    ? projects.filter(p => p.category === selectedCategory && p.status === 'Withheld')
    : projects.filter(p => p.status === 'Withheld');

  const softwareCount = projects.filter(p => p.category === 'Software' && p.status === 'Withheld').length;
  const hardwareCount = projects.filter(p => p.category === 'Hardware' && p.status === 'Withheld').length;

  return (
    <div>
      <Toast toasts={toasts} onDismiss={dismissToast} />
      <ConfirmDialog config={config} onConfirm={handleConfirm} onCancel={handleCancel} />
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/project-documentation">Project Documentation</Link>
        <span>/</span>
        <span>Withheld Projects</span>
      </div>

      <div className="page-header">
        <h1 className="page-title">Withheld Projects</h1>
        <p className="page-description">
          Projects temporarily on hold pending approvals, funding, or other requirements.
        </p>
      </div>

      <ProjectHistory />

      {!selectedCategory ? (
        <div className="category-cards-container withheld-category">
          <div className="category-card" onClick={() => setSelectedCategory('Software')}>

            <h2 className="category-title">Software Projects</h2>
            <p className="category-description">
              Withheld firmware, applications, and software solutions.
            </p>
            <div className="category-count">{softwareCount} On Hold</div>
          </div>

          <div className="category-card" onClick={() => setSelectedCategory('Hardware')}>

            <h2 className="category-title">Hardware Projects</h2>
            <p className="category-description">
              Withheld physical BMS units and hardware development.
            </p>
            <div className="category-count">{hardwareCount} On Hold</div>
          </div>
        </div>
      ) : (
        <>
          <div className="category-header">
            <button className="back-button" onClick={() => setSelectedCategory(null)}>
              ← Back to Categories
            </button>
            <h2 className="category-selected-title">
              Withheld {selectedCategory} Projects ({filteredProjects.length})
            </h2>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"></div>
              <h3 className="empty-state-title">No Withheld Projects</h3>
              <p className="empty-state-description">
                Withheld {selectedCategory.toLowerCase()} projects will appear here.
              </p>
            </div>
          ) : (
            <div className="project-cards-container">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="project-card withheld-card"
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
                        <span className="meta-label">Target Deadline:</span>
                        <span className="meta-value">{formatDate(project.deadline)}</span>
                      </div>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill withheld-progress"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{project.progress}% Complete</span>
                    </div>
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
              <div className="modal-section withheld-reason-section">
                <h3>Withheld Reason</h3>
                <p>{selectedProject.withheldReason}</p>
              </div>

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
                    <span className="detail-label">Target Deadline:</span>
                    <span className="detail-value">{formatDate(selectedProject.deadline)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Project Lead:</span>
                    <span className="detail-value">{selectedProject.projectLead}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Progress</h3>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill withheld-progress"
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{selectedProject.progress}% Complete</span>
                </div>
              </div>

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
            </div>
          </div>
        </div>
      )}

      {isEditing && editedProject && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCancelEdit}>
              ×
            </button>
            <div className="modal-header">
              <h2>Edit Project</h2>
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
                    >
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                    </select>
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
                  <label>Withheld Reason</label>
                  <textarea
                    rows="3"
                    value={editedProject.withheldReason || ''}
                    onChange={(e) => handleInputChange('withheldReason', e.target.value)}
                    placeholder="Explain why this project is on hold"
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

                <div className="form-actions">
                  <button className="save-btn" onClick={handleSaveEdit}>
                     Save Changes
                  </button>
                  <button className="cancel-btn" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithheldProjects;

