import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './BMSOverview.css';

const layers = [
  { title: 'Hardware Layer', tag: 'Layer 1', gradient: 'linear-gradient(135deg,#0066cc,#004999)', color: '#0066cc',
    items: [['Cell Voltage Measurement','High-precision ADCs measure each cell voltage (±1mV accuracy)'],['Current Sensing','Hall-effect or shunt-based current measurement'],['Temperature Sensing','NTC thermistors at multiple points across the pack'],['Protection Circuits','MOSFETs for charge/discharge cutoff; fuses for overcurrent'],['Communication Interfaces','CAN transceiver, UART, SPI, LIN hardware'],['Balancing Circuits','Passive or active balancing hardware per cell'],['Microcontroller','ARM Cortex-M based MCU running the firmware'],['Modular Connectors','Plug-and-play design for easy scaling']] },
  { title: 'Firmware Layer', tag: 'Layer 2', gradient: 'linear-gradient(135deg,#6f42c1,#4a2a8a)', color: '#6f42c1',
    items: [['RTOS-based','FreeRTOS for deterministic real-time task scheduling'],['Protection Algorithms','Multi-level fault detection with configurable thresholds'],['SOC Estimation','Coulomb counting + voltage-based correction algorithms'],['SOH Estimation','Capacity fade tracking and internal resistance monitoring'],['Cell Balancing Control','Balancing logic triggered during charging'],['CAN Stack','CANopen or custom protocol for vehicle integration'],['OTA Update Support','Secure bootloader for remote firmware updates'],['Diagnostics','Fault logging, DTC codes, and health reporting']] },
  { title: 'Software Intelligence Layer', tag: 'Layer 3', gradient: 'linear-gradient(135deg,#28a745,#1a7a32)', color: '#28a745',
    items: [['Telematics Unit','Collects and transmits BMS data to the cloud via 4G/WiFi'],['Data Pipeline','Real-time ingestion of voltage, current, temperature, and SOC data'],['ML Models','Adaptive SOC/SOH estimation models trained on real-world data'],['Predictive Maintenance','Anomaly detection to predict cell failures before they occur'],['Fleet Dashboard','Web-based monitoring for fleet operators'],['OTA Management','Remote firmware deployment and rollback'],['Analytics','Battery performance reports, degradation trends, and usage insights']] },
  { title: 'Modular Stacking Architecture', tag: 'Scalability', gradient: 'linear-gradient(135deg,#fd7e14,#c85a00)', color: '#fd7e14',
    specs: [['Module Capacity','Each module manages a fixed number of cells (e.g., 16S)'],['Stacking','Multiple modules stack for higher voltage applications'],['Master/Slave','Master module coordinates all slave modules via internal bus'],['Scaling Method','Add modules — no hardware redesign needed'],['Connectivity','Plug-and-play communication and functional modules']] },
];

const Architecture = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/product-technology">Product & Technology</Link><span>/</span>
      <span>System Architecture</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">System Architecture</h1>
      <p className="page-description">The three-layer architecture of RC Labs' BMS platform.</p>
    </div>
    <div className="bms-static-grid">
      {layers.map((cat, idx) => (
        <div key={idx} className="bms-static-card" style={{ borderTopColor: cat.color }}>
          <div className="bms-static-header" style={{ background: cat.gradient }}>
            <span className="bms-static-tag">{cat.tag}</span>
            <h3>{cat.title}</h3>
          </div>
          <div className="bms-static-body">
            {cat.items && <div className="bms-items-grid">{cat.items.map(([l,d],i)=><div key={i} className="bms-item" style={{borderLeftColor:cat.color}}><span className="bms-item-label" style={{color:cat.color}}>{l}</span><p className="bms-item-desc">{d}</p></div>)}</div>}
            {cat.specs && <div className="bms-specs-table">{cat.specs.map(([l,v],i)=><div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:cat.color}}>{v}</span></div>)}</div>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Architecture;
