import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectContext';
import ProjectHistory from './ProjectHistory';
import '../../App.css';
import './ProjectCard.css';

const CompletedProjects = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const completedProjects = projects.filter(p => p.status === 'Completed');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredProjects = selectedCategory
    ? completedProjects.filter(p => p.category === selectedCategory)
    : completedProjects;

  const softwareCount = completedProjects.filter(p => p.category === 'Software').length;
  const hardwareCount = completedProjects.filter(p => p.category === 'Hardware').length;

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/project-documentation">Project Documentation</Link>
        <span>/</span>
        <span>Completed Projects</span>
      </div>

      <div className="page-header">
        <h1 className="page-title">Completed Projects</h1>
        <p className="page-description">
          Successfully delivered projects and their achievements at RC Labs.
        </p>
      </div>

      <ProjectHistory />

      {!selectedCategory ? (
        <div className="category-cards-container completed-category">
          <div className="category-card" onClick={() => setSelectedCategory('Software')}>

            <h2 className="category-title">Software Projects</h2>
            <p className="category-description">
              Completed firmware, applications, and software solutions.
            </p>
            <div className="category-count">{softwareCount} Completed</div>
          </div>

          <div className="category-card" onClick={() => setSelectedCategory('Hardware')}>

            <h2 className="category-title">Hardware Projects</h2>
            <p className="category-description">
              Completed physical BMS units and hardware development.
            </p>
            <div className="category-count">{hardwareCount} Completed</div>
          </div>
        </div>
      ) : (
        <>
          <div className="category-header">
            <button className="back-button" onClick={() => setSelectedCategory(null)}>
              ← Back to Categories
            </button>
            <h2 className="category-selected-title">
              Completed {selectedCategory} Projects ({filteredProjects.length})
            </h2>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"></div>
              <h3 className="empty-state-title">No Completed Projects Yet</h3>
              <p className="empty-state-description">
                Completed {selectedCategory.toLowerCase()} projects will appear here.
              </p>
            </div>
          ) : (
            <div className="project-cards-container">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="project-card completed-card"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-card-header">
                    <h3 className="project-card-title">{project.name}</h3>
                    <span className="project-status-badge" style={{ backgroundColor: '#28a745' }}>
                      ✓ Completed
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
                        <span className="meta-value">{(project.teamMembers || []).length + 1} members</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Completed:</span>
                        <span className="meta-value">
                          {project.completedDate ? formatDate(project.completedDate) : formatDate(project.deadline)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            <div className="modal-header">
              <h2>{selectedProject.name}</h2>
              <span className="project-status-badge" style={{ backgroundColor: '#28a745' }}>
                Completed
              </span>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Project Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">Completed</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Start Date:</span>
                    <span className="detail-value">{formatDate(selectedProject.startDate)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Completed Date:</span>
                    <span className="detail-value">
                      {selectedProject.completedDate
                        ? formatDate(selectedProject.completedDate)
                        : formatDate(selectedProject.deadline)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Project Lead:</span>
                    <span className="detail-value">{selectedProject.projectLead}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Description</h3>
                <p>{selectedProject.description}</p>
              </div>

              {selectedProject.objectives && selectedProject.objectives.length > 0 && (
                <div className="modal-section">
                  <h3>Key Objectives</h3>
                  <ul className="objectives-list">
                    {selectedProject.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                <div className="modal-section achievements-section">
                  <h3>Achievements & Impact</h3>
                  <ul className="objectives-list achievements-list">
                    {selectedProject.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

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
                  {(selectedProject.teamMembers || []).map((member, i) => (
                    <div key={i} className="team-member">
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
    </div>
  );
};

export default CompletedProjects;
