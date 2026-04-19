import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const WorkHours = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/hr-policies">HR Policies</Link><span>/</span>
      <span>Work Hours</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Work Hours</h1>
      <p className="page-description">RC Labs work schedule and flexibility guidelines.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Schedule</span>
          <h3>Standard Working Hours</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Core Hours','09:00 AM – 6:00 PM (Monday to Friday)'],['Lunch Break','1 hour (flexible timing)'],['Short Breaks','Two 15-minute breaks encouraged']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#0066cc'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Flexibility</span>
          <h3>Remote Work Policy</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Remote Days','Up to 2 days per week'],['Core Hours Requirement','Must be available 10 AM – 4 PM'],['Advance Notice','Required for remote work days'],['Full-Time Remote','Considered on case-by-case basis'],['Team Requirements','Subject to team workload and manager approval']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#28a745'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Overtime</span>
          <h3>Overtime & Compensation</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Pre-Approval','Overtime must be approved by manager'],['Rate','1.5× regular hourly rate'],['Comp Time','Available as alternative to overtime pay'],['Eligibility','Non-exempt employees only']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#fd7e14'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default WorkHours;
