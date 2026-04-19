import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const cards = [
  { to: '/battery-knowledge/overview', title: 'Battery Fundamentals',   desc: 'Core concepts — cells, voltage, capacity, energy density, and how batteries work.', color: '#0066cc' },
  { to: '/battery-knowledge/types',    title: 'Battery Types',           desc: 'LFP, NMC, LTO, Supercapacitors — chemistry differences and use cases.',             color: '#6f42c1' },
  { to: '/battery-knowledge/charging', title: 'Charging & Discharging',  desc: 'CC/CV charging, C-rates, depth of discharge, and cycle life basics.',               color: '#fd7e14' },
  { to: '/battery-knowledge/safety',   title: 'Safety Considerations',  desc: 'Thermal runaway, overcharge, short circuit protection and safe handling.',           color: '#dc3545' },
  { to: '/battery-knowledge/thermal',  title: 'Thermal Management',     desc: 'Why temperature matters, cooling strategies, and thermal runaway prevention.',       color: '#28a745' },
];

const BatteryKnowledgeBase = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span><span>Battery Knowledge Base</span>
    </div>
    <div className="page-header">
      <h1 className="page-title"> Battery Knowledge Base</h1>
      <p className="page-description">Foundational battery knowledge for engineers and new hires at RC Labs.</p>
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

export default BatteryKnowledgeBase;
