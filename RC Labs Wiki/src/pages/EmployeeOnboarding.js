import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const cards = [
  { to: '/employee-onboarding/pre-joining',    title: 'Pre-Joining',     desc: 'Documents and preparations required before your first day at RC Labs.',    color: '#0066cc' },
  { to: '/employee-onboarding/day-1-steps',    title: 'Day 1 Steps',     desc: 'Your first day checklist and orientation schedule.',                       color: '#28a745' },
  { to: '/employee-onboarding/tools-access',   title: 'Tools & Access',  desc: 'Software, systems, and tools you\'ll need access to.',                    color: '#fd7e14' },
  { to: '/employee-onboarding/first-week-plan',title: 'First Week Plan', desc: 'Activities and meetings scheduled for your first week.',                   color: '#6f42c1' },
  { to: '/employee-onboarding/team-contacts',  title: 'Team Contacts',   desc: 'Key contacts and team members you should know.',                           color: '#17a2b8' },
];

const EmployeeOnboarding = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span><span>Employee Onboarding</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Employee Onboarding</h1>
      <p className="page-description">Welcome to RC Labs! Your complete guide to getting started with our team.</p>
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

export default EmployeeOnboarding;
