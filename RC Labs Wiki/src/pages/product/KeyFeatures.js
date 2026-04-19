import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './BMSOverview.css';

const features = [
  { title: 'Modular Design',       tag: 'Scalability',    gradient: 'linear-gradient(135deg,#0066cc,#004999)', color: '#0066cc',
    points: ['Stack individual BMS modules for any voltage requirement','Plug-and-play communication and functional modules','Single platform scales from e-bike to e-bus','Reduces development time for new vehicle segments'] },
  { title: 'Multi-Layer Safety',   tag: 'Protection',     gradient: 'linear-gradient(135deg,#dc3545,#a71d2a)', color: '#dc3545',
    points: ['Hardware-level protection (MOSFETs, fuses)','Firmware-level fault detection and response','Software-level predictive safety monitoring','Compliant with ISO 26262 automotive safety standards'] },
  { title: 'IoT & Connectivity',   tag: 'Remote Access',  gradient: 'linear-gradient(135deg,#28a745,#1a7a32)', color: '#28a745',
    points: ['Add-on telematics unit for cloud connectivity','Real-time data transmission via 4G/WiFi','Remote monitoring and diagnostics','Over-the-air (OTA) firmware updates'] },
  { title: 'AI / ML Intelligence', tag: 'Smart Algorithms',gradient: 'linear-gradient(135deg,#6f42c1,#4a2a8a)', color: '#6f42c1',
    points: ['Adaptive SOC/SOH estimation algorithms','Learns battery behaviour across different conditions','Predictive maintenance — 30-day failure prediction','Continuously improves with more data'] },
  { title: 'Chemistry Agnostic',   tag: 'Flexibility',    gradient: 'linear-gradient(135deg,#fd7e14,#c85a00)', color: '#fd7e14',
    points: ['Supports NMC, LFP, LTO, Supercapacitors, Ultracapacitors','Configurable parameters per chemistry','No hardware redesign needed to switch chemistry','Ideal for multi-product manufacturers'] },
  { title: 'Data Monitoring',      tag: 'Visibility',     gradient: 'linear-gradient(135deg,#17a2b8,#0d7a8a)', color: '#17a2b8',
    specs: [['Cell Voltage','Per-cell monitoring (±1mV accuracy)'],['Pack Current','Continuous measurement'],['Temperature','Multi-point sensing'],['SOC','State of Charge estimation'],['SOH','State of Health tracking'],['Range','Remaining range estimation']] },
];

const KeyFeatures = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/product-technology">Product & Technology</Link><span>/</span>
      <span>Key Features</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Key Features</h1>
      <p className="page-description">What makes RC Labs' BMS stand out from the competition.</p>
    </div>
    <div className="bms-static-grid">
      {features.map((f, idx) => (
        <div key={idx} className="bms-static-card" style={{ borderTopColor: f.color }}>
          <div className="bms-static-header" style={{ background: f.gradient }}>
            <span className="bms-static-tag">{f.tag}</span>
            <h3>{f.title}</h3>
          </div>
          <div className="bms-static-body">
            {f.points && <ul className="bms-extras-list">{f.points.map((p,i)=><li key={i} style={{'--dot-color':f.color}}>{p}</li>)}</ul>}
            {f.specs  && <div className="bms-specs-table">{f.specs.map(([l,v],i)=><div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:f.color}}>{v}</span></div>)}</div>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default KeyFeatures;
