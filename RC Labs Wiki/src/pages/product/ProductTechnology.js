import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const cards = [
  { to: '/product-technology/bms-overview',  title: 'BMS Overview',        desc: 'What is a BMS, why it matters, and how RC Labs\' approach is different.',          color: '#0066cc' },
  { to: '/product-technology/architecture',  title: 'System Architecture', desc: 'Hardware, firmware, and software layers of the RC Labs BMS platform.',             color: '#6f42c1' },
  { to: '/product-technology/key-features',  title: 'Key Features',         desc: 'Modular design, safety systems, IoT connectivity, and data intelligence.',         color: '#fd7e14' },
  { to: '/product-technology/use-cases',     title: 'Use Cases',            desc: 'EVs, stationary energy storage, robotics, and industrial applications.',           color: '#28a745' },
];

const ProductTechnology = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span><span>Product & Technology</span>
    </div>
    <div className="page-header">
      <h1 className="page-title"> Product & Technology</h1>
      <p className="page-description">RC Labs' Battery Management System — architecture, features, and use cases.</p>
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

export default ProductTechnology;
