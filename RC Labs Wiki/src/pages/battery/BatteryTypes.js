import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const chemistries = [
  { name: 'LFP', full: 'Lithium Iron Phosphate', gradient: 'linear-gradient(135deg,#28a745,#1a7a32)', color: '#28a745',
    specs: [['Nominal Voltage','3.2V'],['Energy Density','90–160 Wh/kg'],['Cycle Life','2000–6000'],['Best For','E-buses, stationary storage, e-rickshaws']],
    pros: ['Excellent safety','Long cycle life','Thermally stable','Low cost'],
    cons: ['Lower energy density','Flat discharge curve'] },
  { name: 'NMC', full: 'Lithium Nickel Manganese Cobalt', gradient: 'linear-gradient(135deg,#0066cc,#004999)', color: '#0066cc',
    specs: [['Nominal Voltage','3.6V'],['Energy Density','150–220 Wh/kg'],['Cycle Life','500–2000'],['Best For','Passenger EVs, power tools, drones']],
    pros: ['High energy density','Good power output','Widely used in EVs'],
    cons: ['Less thermally stable than LFP','Higher cost due to cobalt'] },
  { name: 'LTO', full: 'Lithium Titanate Oxide', gradient: 'linear-gradient(135deg,#6f42c1,#4a2a8a)', color: '#6f42c1',
    specs: [['Nominal Voltage','2.4V'],['Energy Density','50–80 Wh/kg'],['Cycle Life','10,000–20,000'],['Best For','Grid storage, buses, industrial']],
    pros: ['Extremely long cycle life','Fast charging','Excellent low-temp performance'],
    cons: ['Very low energy density','High cost'] },
  { name: 'NCA', full: 'Lithium Nickel Cobalt Aluminium', gradient: 'linear-gradient(135deg,#fd7e14,#c85a00)', color: '#fd7e14',
    specs: [['Nominal Voltage','3.6V'],['Energy Density','200–260 Wh/kg'],['Cycle Life','500–1500'],['Best For','High-performance EVs, aerospace']],
    pros: ['Highest energy density','Good power'],
    cons: ['Thermal stability concerns','Expensive'] },
  { name: 'Supercapacitor', full: 'Electric Double Layer Capacitor', gradient: 'linear-gradient(135deg,#17a2b8,#0d7a8a)', color: '#17a2b8',
    specs: [['Nominal Voltage','2.7V'],['Energy Density','5–10 Wh/kg'],['Cycle Life','500,000+'],['Best For','Regenerative braking, peak power buffering']],
    pros: ['Extremely fast charge/discharge','Millions of cycles','Wide temperature range'],
    cons: ['Very low energy density','High self-discharge'] },
];

const BatteryTypes = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/battery-knowledge">Battery Knowledge Base</Link><span>/</span>
      <span>Battery Types</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Battery Types</h1>
      <p className="page-description">Chemistry comparison guide for RC Labs engineers and new hires.</p>
    </div>
    <div className="bms-static-grid">
      {chemistries.map((c, idx) => (
        <div key={idx} className="bms-static-card" style={{ borderTopColor: c.color }}>
          <div className="bms-static-header" style={{ background: c.gradient }}>
            <span className="bms-static-tag">{c.name}</span>
            <h3>{c.full}</h3>
          </div>
          <div className="bms-static-body">
            <div className="bms-specs-table" style={{ marginBottom: 14 }}>
              {c.specs.map(([l,v],i)=>(
                <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:c.color}}>{v}</span></div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#28a745', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Advantages</p>
                <ul className="bms-extras-list">{c.pros.map((p,i)=><li key={i} style={{'--dot-color':c.color}}>{p}</li>)}</ul>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc3545', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Limitations</p>
                <ul className="bms-extras-list">{c.cons.map((p,i)=><li key={i} style={{'--dot-color':'#dc3545'}}>{p}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BatteryTypes;
