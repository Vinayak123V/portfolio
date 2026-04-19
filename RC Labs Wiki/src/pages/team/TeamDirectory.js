import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const cards = [
  { to: '/team-directory/engineering', title: 'Engineering Team', desc: 'Hardware, firmware, software and data science engineers driving BMS innovation.', color: '#0066cc' },
  { to: '/team-directory/management',  title: 'Management',        desc: 'Leadership and management team steering RC Labs\' vision and strategy.',         color: '#6f42c1' },
  { to: '/team-directory/contacts',    title: 'Contacts',          desc: 'Key contact details for all departments and emergency escalations.',              color: '#28a745' },
];

const TeamDirectory = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span><span>Team Directory</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Team Directory</h1>
      <p className="page-description">Meet the people behind RC Labs' intelligent battery management systems.</p>
    </div>
    <div className="card-grid">
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

export default TeamDirectory;
