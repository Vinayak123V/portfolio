import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const ThermalManagement = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/battery-knowledge">Battery Knowledge Base</Link><span>/</span>
      <span>Thermal Management</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Thermal Management Basics</h1>
      <p className="page-description">Why temperature control is critical for battery performance and safety.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#dc3545' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#dc3545,#a71d2a)' }}>
          <span className="bms-static-tag">Why It Matters</span>
          <h3>Temperature Impact</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Optimal Range','15°C to 35°C for best performance'],['High Temp (>45°C)','Accelerates degradation, increases thermal runaway risk'],['Low Temp (<0°C)','Reduces capacity, risk of lithium plating during charging'],['Cell Variation','Temperature gradients cause uneven aging across the pack']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#dc3545'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Methods</span>
          <h3>Cooling Strategies</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-items-grid">
            {[['Air Cooling (Passive)','Simple, low cost. Suitable for low-power applications.'],['Air Cooling (Active)','Forced air with fans. Better but limited for high-density packs.'],['Liquid Cooling','Coolant channels around cells. Most effective for EVs.'],['Phase Change Materials','Absorb heat during phase transition. Passive and effective.'],['Immersion Cooling','Cells submerged in dielectric fluid. Emerging ultra-high-power tech.']].map(([l,d],i)=>(
              <div key={i} className="bms-item" style={{borderLeftColor:'#0066cc'}}><span className="bms-item-label" style={{color:'#0066cc'}}>{l}</span><p className="bms-item-desc">{d}</p></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">RC Labs Approach</span>
          <h3>BMS Thermal Integration</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Multi-point temperature sensing via NTC thermistors','Adaptive charging profiles — current reduced at extreme temps','Thermal runaway detection via rate-of-rise monitoring','BMS commands external cooling fans or pumps via CAN','Pre-conditioning: heating pack before charging in cold climates'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#28a745'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Monitoring</span>
          <h3>Temperature in the BMS</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Sensors per Module','Up to 8 temperature sensors'],['Alert Thresholds','Configurable warning and fault levels'],['Data Logging','Temperature transmitted via CAN/telematics'],['ML Integration','Historical data used to predict degradation'],['Runaway Detection','Rate-of-rise algorithm triggers early warning']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#fd7e14'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default ThermalManagement;
