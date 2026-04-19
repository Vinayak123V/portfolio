import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const FirstWeekPlan = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/employee-onboarding">Employee Onboarding</Link><span>/</span>
      <span>First Week Plan</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">First Week Plan</h1>
      <p className="page-description">Your structured plan for the first week at RC Labs.</p>
    </div>
    <div className="bms-static-grid">

      {[
        { day: 'Day 1', tag: 'Monday', gradient: 'linear-gradient(135deg,#0066cc,#004999)', color: '#0066cc',
          items: [['Joining Formalities','Complete documentation and receive ID card'],['IT Setup','Laptop, email, and system access configuration'],['Office Tour','Facilities introduction and safety briefing'],['Team Introduction','Meet your manager and immediate team'],['Company Overview','Culture and values presentation']] },
        { day: 'Day 2', tag: 'Tuesday', gradient: 'linear-gradient(135deg,#28a745,#1a7a32)', color: '#28a745',
          items: [['BMS Technology Overview','Product portfolio and technology deep-dive'],['R&D Lab Visit','Tour of testing and development facilities'],['Product Team Meeting','Technical briefing and roadmap review'],['Documentation Access','Access to technical docs and resources']] },
        { day: 'Day 3', tag: 'Wednesday', gradient: 'linear-gradient(135deg,#6f42c1,#4a2a8a)', color: '#6f42c1',
          items: [['Engineering Team','Meet hardware, firmware, and software teams'],['QA Processes','Introduction to quality assurance workflows'],['Sales & Marketing','Team overview and customer context'],['Operations Briefing','Supply chain and operations introduction']] },
        { day: 'Day 4', tag: 'Thursday', gradient: 'linear-gradient(135deg,#fd7e14,#c85a00)', color: '#fd7e14',
          items: [['Role-Specific Training','Detailed responsibilities and expectations'],['Tool Training','Hands-on training for role-specific tools'],['Shadow Sessions','Observe team members on ongoing tasks'],['First Assignment','Receive your first small task or project']] },
        { day: 'Day 5', tag: 'Friday', gradient: 'linear-gradient(135deg,#dc3545,#a71d2a)', color: '#dc3545',
          items: [['Team Standup','Participate in your first standup meeting'],['30-60-90 Day Goals','Review goals with your manager'],['Mandatory Training','Complete compliance training modules'],['Week 1 Review','Feedback session with HR and manager']] },
        { day: 'Training Modules', tag: 'Complete by End of Week', gradient: 'linear-gradient(135deg,#17a2b8,#0d7a8a)', color: '#17a2b8',
          specs: [['Information Security','2 hours'],['Workplace Safety & Lab Protocols','1.5 hours'],['Anti-Harassment & Diversity','1 hour'],['Company Policies & Code of Conduct','1 hour'],['Quality Management System Overview','1 hour']] },
      ].map((d, idx) => (
        <div key={idx} className="bms-static-card" style={{ borderTopColor: d.color }}>
          <div className="bms-static-header" style={{ background: d.gradient }}>
            <span className="bms-static-tag">{d.tag}</span>
            <h3>{d.day}</h3>
          </div>
          <div className="bms-static-body">
            {d.items && <div className="bms-specs-table">{d.items.map(([l,v],i)=><div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:d.color}}>{v}</span></div>)}</div>}
            {d.specs && <div className="bms-specs-table">{d.specs.map(([l,v],i)=><div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:d.color}}>{v}</span></div>)}</div>}
          </div>
        </div>
      ))}

    </div>
  </div>
);

export default FirstWeekPlan;
