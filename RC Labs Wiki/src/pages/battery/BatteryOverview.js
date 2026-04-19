import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const BatteryOverview = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/battery-knowledge">Battery Knowledge Base</Link><span>/</span>
      <span>Battery Fundamentals</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Battery Fundamentals</h1>
      <p className="page-description">Core concepts every RC Labs engineer should know.</p>
    </div>

    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Basics</span>
          <h3>What is a Battery?</h3>
        </div>
        <div className="bms-static-body">
          <p>A battery stores and releases electrical energy through chemical reactions. Each cell contains:</p>
          <div className="bms-specs-table" style={{ marginTop: 12 }}>
            {[['Anode (−)','Releases electrons during discharge'],['Cathode (+)','Accepts electrons during discharge'],['Electrolyte','Allows ion flow between electrodes'],['Separator','Prevents short circuit while allowing ion transport']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#0066cc'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Key Parameters</span>
          <h3>Important Metrics</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Voltage (V)','Electrical potential — LFP ≈3.2V, NMC ≈3.6V per cell'],['Capacity (Ah)','Total charge stored — 100Ah delivers 10A for 10 hours'],['Energy (Wh)','Voltage × Capacity'],['SOC','State of Charge — current level as %'],['SOH','State of Health — current vs original capacity'],['Cycle Life','Charge/discharge cycles before capacity drops to 80%'],['Internal Resistance','Increases with age and temperature']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#6f42c1'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Configuration</span>
          <h3>Series vs Parallel</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Series (S)','Voltage adds up — 10S × 3.6V = 36V'],['Parallel (P)','Capacity adds up — 2P × 100Ah = 200Ah'],['Series-Parallel','Combination for higher voltage and capacity'],['RC Labs Support','100+ cells in series for high-voltage EV applications']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#28a745'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#dc3545' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#dc3545,#a71d2a)' }}>
          <span className="bms-static-tag">Aging</span>
          <h3>Degradation Mechanisms</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-items-grid">
            {[['Calendar Aging','Capacity loss over time even without use'],['Cycle Aging','Capacity loss due to repeated charge/discharge'],['Lithium Plating','Metallic lithium deposits on anode — safety risk'],['SEI Growth','Solid Electrolyte Interphase thickens, increasing resistance'],['Temperature Extremes','Both high and low temperatures accelerate degradation']].map(([l,d],i)=>(
              <div key={i} className="bms-item" style={{borderLeftColor:'#dc3545'}}><span className="bms-item-label" style={{color:'#dc3545'}}>{l}</span><p className="bms-item-desc">{d}</p></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default BatteryOverview;
