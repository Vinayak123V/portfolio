import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const cards = [
  { to: '/project-documentation/active-projects',    title: 'Active Projects',    desc: 'Currently ongoing BMS development projects and initiatives.',                    color: '#0066cc' },
  { to: '/project-documentation/withheld-projects',  title: 'Withheld Projects',  desc: 'Projects temporarily on hold pending approvals or requirements.',               color: '#ffc107' },
  { to: '/project-documentation/completed-projects', title: 'Completed Projects', desc: 'Archive of successfully delivered projects and achievements.',                   color: '#28a745' },
];

const ProjectDocumentation = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span><span>Project Documentation</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Project Documentation</h1>
      <p className="page-description">Central repository for all RC Labs project information.</p>
    </div>
    <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%),1fr))' }}>
      {cards.map(({ to, title, desc, color }) => (
        <Link key={to} to={to} style={{ textDecoration: 'none' }}>
          <div className="info-card rich-card">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{desc}</p>
            <span className="card-arrow" style={{ color }}>Explore →</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default ProjectDocumentation;
