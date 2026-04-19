import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const Day1Steps = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/employee-onboarding">Employee Onboarding</Link><span>/</span>
      <span>Day 1 Steps</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Day 1 Steps</h1>
      <p className="page-description">Your first day checklist and orientation schedule at RC Labs.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Morning</span>
          <h3>9:00 AM – 12:00 PM</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['9:00 AM','Report to reception and meet HR representative'],['9:15 AM','Complete joining formalities and documentation'],['9:45 AM','Receive employee ID card and access credentials'],['10:00 AM','Office tour and facilities introduction'],['10:30 AM','IT setup — laptop, email, and system access'],['11:30 AM','Meet your manager and team members']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#0066cc'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Afternoon</span>
          <h3>1:00 PM – 5:00 PM</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['1:00 PM','Lunch with your buddy/mentor'],['2:00 PM','Company overview and culture presentation'],['3:00 PM','HR policies and benefits briefing'],['4:00 PM','Safety and security orientation'],['4:30 PM','Workspace setup and initial assignments'],['5:00 PM','Q&A session and day wrap-up']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#28a745'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Checklist</span>
          <h3>Day 1 Must-Dos</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Sign employment contract and policies acknowledgment','Receive and activate employee ID card','Set up company email and change temporary password','Configure laptop and install required software','Complete IT security training module','Join team communication channels (Slack/Teams)','Take ID photo for internal directory','Get office keys or access cards'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#6f42c1'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">People</span>
          <h3>Key People to Meet</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['HR Manager','Administrative questions and formalities'],['Direct Manager','Role expectations and goals'],['IT Support','Technical setup and access'],['Your Buddy','Day-to-day guidance and questions'],['Team Members','Introduction to your immediate team'],['Department Head','Welcome and department overview']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#fd7e14'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default Day1Steps;
