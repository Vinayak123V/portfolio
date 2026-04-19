import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './BMSOverview.css';

const cases = [
  { title: 'Electric Two & Three Wheelers', tag: 'E-Mobility',      gradient: 'linear-gradient(135deg,#0066cc,#004999)', color: '#0066cc',
    overview: 'Compact, cost-optimised BMS for e-bikes, e-scooters, and e-rickshaws. Focus on low cost, IP67 protection, and IoT connectivity for fleet operators.',
    specs: [['Voltage Range','48V – 72V'],['Chemistry','LFP, NMC'],['Customers','EV OEMs, fleet operators, last-mile delivery']] },
  { title: 'Passenger Electric Vehicles',   tag: 'Automotive',      gradient: 'linear-gradient(135deg,#28a745,#1a7a32)', color: '#28a745',
    overview: 'High-voltage BMS with automotive-grade safety (ISO 26262), fast-charging support, and advanced SOC/SOH estimation for maximum range and battery life.',
    specs: [['Voltage Range','300V – 800V'],['Chemistry','NMC, NCA'],['Customers','EV manufacturers, Tier 1 automotive suppliers']] },
  { title: 'Electric Buses & Commercial Vehicles', tag: 'Heavy Transport', gradient: 'linear-gradient(135deg,#6f42c1,#4a2a8a)', color: '#6f42c1',
    overview: 'Scalable modular BMS for large battery packs. Emphasis on reliability, thermal management, and fleet telematics for high-utilisation commercial fleets.',
    specs: [['Voltage Range','400V – 700V'],['Chemistry','LFP, NMC'],['Customers','Bus OEMs, public transport operators']] },
  { title: 'Stationary Energy Storage',     tag: 'Grid & Solar',    gradient: 'linear-gradient(135deg,#fd7e14,#c85a00)', color: '#fd7e14',
    overview: 'BMS for solar + storage systems, grid stabilisation, and backup power. Long cycle life, deep DoD support, and grid integration features.',
    specs: [['Voltage Range','48V – 1000V+'],['Chemistry','LFP, LTO'],['Customers','Solar developers, utilities, commercial buildings']] },
  { title: 'Robotics & Industrial',         tag: 'Automation',      gradient: 'linear-gradient(135deg,#dc3545,#a71d2a)', color: '#dc3545',
    overview: 'Compact, high-power BMS for industrial robots, AGVs, and warehouse automation. Fast charge/discharge, wide temperature range, and high reliability.',
    specs: [['Voltage Range','24V – 96V'],['Chemistry','NMC, LTO, Supercapacitors'],['Customers','Robotics companies, warehouse automation, AGV manufacturers']] },
  { title: 'Drones & UAVs',                 tag: 'Aerial',          gradient: 'linear-gradient(135deg,#17a2b8,#0d7a8a)', color: '#17a2b8',
    overview: 'Lightweight, high-power-density BMS for commercial drones. Optimised for high C-rate discharge, weight minimisation, and flight time maximisation.',
    specs: [['Voltage Range','22V – 50V'],['Chemistry','NMC, LiPo'],['Customers','Drone manufacturers, delivery companies, survey firms']] },
];

const UseCases = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/product-technology">Product & Technology</Link><span>/</span>
      <span>Use Cases</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Use Cases</h1>
      <p className="page-description">Applications where RC Labs' BMS technology is deployed.</p>
    </div>
    <div className="bms-static-grid">
      {cases.map((c, idx) => (
        <div key={idx} className="bms-static-card" style={{ borderTopColor: c.color }}>
          <div className="bms-static-header" style={{ background: c.gradient }}>
            <span className="bms-static-tag">{c.tag}</span>
            <h3>{c.title}</h3>
          </div>
          <div className="bms-static-body">
            <p className="bms-content-text" style={{ marginBottom: 14 }}>{c.overview}</p>
            <div className="bms-specs-table">
              {c.specs.map(([l,v],i)=>(
                <div key={i} className="bms-spec-row">
                  <span className="bms-spec-label">{l}</span>
                  <span className="bms-spec-value" style={{ color: c.color }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UseCases;
