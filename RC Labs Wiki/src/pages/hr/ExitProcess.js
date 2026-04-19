import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const ExitProcess = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/hr-policies">HR Policies</Link><span>/</span>
      <span>Exit Process</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Exit Process</h1>
      <p className="page-description">Guidelines for resignation, notice period, and exit formalities.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Notice</span>
          <h3>Notice Period</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Standard Notice','30 days for most positions'],['Senior Roles','60 days for manager level and above'],['Probation Period','15 days notice during probation'],['Notice Buyout','Available subject to management approval']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#0066cc'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Steps</span>
          <h3>Resignation Process</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Step 1','Submit formal resignation letter to immediate manager'],['Step 2','Copy HR department on resignation email'],['Step 3','Schedule exit interview with HR'],['Step 4','Complete knowledge transfer to designated colleague'],['Step 5','Return all company property and assets']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#6f42c1'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Checklist</span>
          <h3>Exit Checklist</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Handover all ongoing projects and documentation','Return laptop, access cards, and company equipment','Clear all pending expenses and reimbursements','Revoke access to company systems and accounts','Return company ID card and parking pass','Complete exit interview questionnaire'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#fd7e14'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Settlement</span>
          <h3>Final Settlement</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Salary','Days worked in final month'],['Leave Encashment','Unused leave (if applicable)'],['Pending Bonuses','Any outstanding incentives'],['Gratuity','If eligible'],['Provident Fund','PF settlement'],['Timeline','Processed within 45 days of last working day']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#28a745'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#17a2b8' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#17a2b8,#0d7a8a)' }}>
          <span className="bms-static-tag">Post-Employment</span>
          <h3>After You Leave</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Experience Letter','Provided on last working day'],['Relieving Letter','Issued after clearance completion'],['References','Available upon request'],['Alumni Network','Stay connected with RC Labs community'],['Confidentiality','Non-disclosure obligations continue post-employment']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#17a2b8'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default ExitProcess;
