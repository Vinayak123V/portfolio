import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const ChargingBasics = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/battery-knowledge">Battery Knowledge Base</Link><span>/</span>
      <span>Charging & Discharging</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Charging & Discharging Basics</h1>
      <p className="page-description">Understanding how batteries charge and discharge safely and efficiently.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Protocol</span>
          <h3>CC/CV Charging</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-items-grid">
            {[['Phase 1 — Constant Current (CC)','Fixed current until battery reaches max voltage. Charges to ~80% quickly.'],['Phase 2 — Constant Voltage (CV)','Voltage held constant while current tapers to near zero. Tops up remaining 20% safely.']].map(([l,d],i)=>(
              <div key={i} className="bms-item" style={{borderLeftColor:'#0066cc'}}><span className="bms-item-label" style={{color:'#0066cc'}}>{l}</span><p className="bms-item-desc">{d}</p></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Rate</span>
          <h3>C-Rate</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['1C','Full charge/discharge in 1 hour (100Ah = 100A)'],['0.5C','Full charge/discharge in 2 hours (100Ah = 50A)'],['2C','Full charge/discharge in 30 minutes (100Ah = 200A)'],['Fast Charging','Typically 1C–3C'],['Ultra-Fast','3C and above']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#fd7e14'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Depth</span>
          <h3>Depth of Discharge (DoD)</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['DoD 100%','Maximises energy use but reduces cycle life'],['DoD 80%','Common EV practice — good balance of range and longevity'],['DoD 20–30%','Maximises cycle life — used in stationary storage'],['RC Labs BMS','Enforces configurable DoD limits per application']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#28a745'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Balancing</span>
          <h3>Cell Balancing</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-items-grid">
            {[['Passive Balancing','Bleeds excess energy from higher-SOC cells as heat. Simple but wasteful.'],['Active Balancing','Transfers energy from high-SOC to low-SOC cells. More efficient but complex.'],['RC Labs Approach','Implements cell balancing to maximise usable pack capacity and extend pack life.']].map(([l,d],i)=>(
              <div key={i} className="bms-item" style={{borderLeftColor:'#6f42c1'}}><span className="bms-item-label" style={{color:'#6f42c1'}}>{l}</span><p className="bms-item-desc">{d}</p></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default ChargingBasics;
