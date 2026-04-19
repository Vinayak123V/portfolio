import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const SafetyConsiderations = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/battery-knowledge">Battery Knowledge Base</Link><span>/</span>
      <span>Safety Considerations</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Safety Considerations</h1>
      <p className="page-description">Critical safety knowledge for working with lithium-ion batteries at RC Labs.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#dc3545' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#dc3545,#a71d2a)' }}>
          <span className="bms-static-tag">Critical Risk</span>
          <h3>Thermal Runaway</h3>
        </div>
        <div className="bms-static-body">
          <p style={{ marginBottom: 12 }}>A self-sustaining exothermic reaction that can lead to fire or explosion.</p>
          <div className="bms-specs-table">
            {[['Overcharging','Exceeding maximum cell voltage'],['Short Circuit','External or internal short'],['Mechanical Damage','Puncture or crush'],['Extreme Heat','External heat exposure'],['RC Labs Protection','Continuous monitoring with multi-layer prevention algorithms']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#dc3545'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">BMS Protection</span>
          <h3>Protection Functions</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-items-grid">
            {[['OVP','Cuts off charging if any cell exceeds max voltage'],['UVP','Stops discharge if any cell drops below min voltage'],['OCP','Disconnects load if current exceeds safe limits'],['SCP','Instant disconnect on short circuit detection'],['OTP','Halts operation if temperature exceeds safe range'],['Under-Temp','Prevents charging in freezing conditions']].map(([l,d],i)=>(
              <div key={i} className="bms-item" style={{borderLeftColor:'#0066cc'}}><span className="bms-item-label" style={{color:'#0066cc'}}>{l}</span><p className="bms-item-desc">{d}</p></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Lab Rules</span>
          <h3>Workplace Safety</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Always wear PPE (gloves, safety glasses) when handling cells','Never short-circuit battery terminals','Store cells in a cool, dry place away from flammable materials','Use a fireproof LiPo bag for charging and storage of test cells','Never charge damaged, swollen, or leaking cells','Keep a Class D fire extinguisher accessible in the battery lab','Report any swelling, unusual heat, or smell immediately','Follow the lab\'s battery disposal procedure'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#28a745'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Procedure</span>
          <h3>Handling Damaged Cells</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Isolate the damaged cell immediately using insulated tools','Place in a fireproof container with sand or vermiculite','Monitor temperature for at least 24 hours','Do not attempt to charge or discharge a damaged cell','Contact the lab safety officer before disposal'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#fd7e14'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  </div>
);

export default SafetyConsiderations;
