import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './BMSOverview.css';

const BMSOverview = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/product-technology">Product & Technology</Link><span>/</span>
      <span>BMS Overview</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">BMS Overview</h1>
      <p className="page-description">Understanding RC Labs' Battery Management System — what it is, what it does, and what makes it different.</p>
    </div>

    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Core Concept</span>
          <h3>What is a BMS?</h3>
        </div>
        <div className="bms-static-body">
          <p>A Battery Management System (BMS) is an electronic system that manages a rechargeable battery pack — monitoring, protecting, and optimising every cell in real time.</p>
          <p style={{ marginTop: 10 }}>Think of the BMS as the <strong>"brain"</strong> of the battery pack. It continuously watches over every cell and makes real-time decisions to protect the battery and maximise performance.</p>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">What It Does</span>
          <h3>Core Functions</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-items-grid">
            {[
              ['Protection',       'Prevents overcharge, over-discharge, overcurrent, short circuit, and temperature extremes'],
              ['Monitoring',       'Measures cell voltages, pack current, and temperatures in real time'],
              ['State Estimation', 'Calculates State of Charge (SOC) and State of Health (SOH)'],
              ['Cell Balancing',   'Equalises charge across all cells to maximise pack capacity'],
              ['Communication',   'Reports data via CAN, UART, LIN, SPI to ECU, charger, or cloud'],
              ['Thermal Control',  'Controls cooling/heating systems to maintain optimal temperature'],
            ].map(([label, desc], i) => (
              <div key={i} className="bms-item" style={{ borderLeftColor: '#6f42c1' }}>
                <span className="bms-item-label" style={{ color: '#6f42c1' }}>{label}</span>
                <p className="bms-item-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Our Edge</span>
          <h3>RC Labs Differentiation</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table" style={{ marginBottom: 16 }}>
            <div className="bms-spec-row"><span className="bms-spec-label">Standard BMS</span><span className="bms-spec-value" style={{ color: '#888' }}>Hardware + basic firmware monitoring</span></div>
            <div className="bms-spec-row" style={{ background: '#f0fff4', border: '1.5px solid #28a745', borderRadius: 6 }}><span className="bms-spec-label">RC Labs BMS</span><span className="bms-spec-value" style={{ color: '#28a745' }}>Hardware + Firmware + AI/ML Intelligence</span></div>
          </div>
          <ul className="bms-extras-list">
            {['Adaptive algorithms that learn battery behaviour over time','Predictive maintenance — detecting degradation before failure','Chemistry-agnostic: NMC, LFP, LTO, Supercapacitors','Over-the-air (OTA) updates post-deployment'].map((e, i) => (
              <li key={i} style={{ '--dot-color': '#28a745' }}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Key Numbers</span>
          <h3>Technical Specifications</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Cell Support','100+ cells in series'],['Chemistries','NMC, LFP, LTO, Supercapacitors, Ultracapacitors'],['Communication','CAN, UART, LIN, SPI'],['Connectivity','Add-on telematics unit (IoT/Cloud)'],['Architecture','Modular — stack for higher voltage'],['Scalability','E-bike to E-bus, single platform']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{ color: '#fd7e14' }}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default BMSOverview;
