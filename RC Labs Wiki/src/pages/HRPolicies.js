import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const cards = [
  { to: '/hr-policies/work-hours',      title: 'Work Hours',       desc: 'Standard working hours, flexible work arrangements, and remote work policies.', color: '#0066cc' },
  { to: '/hr-policies/leave-policy',    title: 'Leave Policy',     desc: 'Annual leave, sick leave, public holidays, and special leave entitlements.',    color: '#28a745' },
  { to: '/hr-policies/salary-benefits', title: 'Salary & Benefits', desc: 'Compensation structure, benefits package, and performance bonuses.',            color: '#fd7e14' },
  { to: '/hr-policies/code-of-conduct', title: 'Code of Conduct',   desc: 'Professional behavior standards, ethics, and workplace expectations.',          color: '#6f42c1' },
  { to: '/hr-policies/exit-process',    title: 'Exit Process',      desc: 'Resignation procedures, notice periods, and exit formalities.',                 color: '#dc3545' },
];

const HRPolicies = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span><span>HR Policies</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">HR Policies</h1>
      <p className="page-description">Comprehensive human resources policies and guidelines for all RC Labs employees.</p>
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

export default HRPolicies;
