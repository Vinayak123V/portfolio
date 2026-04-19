import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const ToolsAccess = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/employee-onboarding">Employee Onboarding</Link><span>/</span>
      <span>Tools & Access</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Tools & Access</h1>
      <p className="page-description">Essential software, systems, and tools for your work at RC Labs.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Communication</span>
          <h3>Communication Tools</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Email','Microsoft Outlook — [yourname]@rclabs.co'],['Team Chat','Microsoft Teams for instant messaging'],['Video Calls','Zoom and Microsoft Teams'],['Calendar','Outlook Calendar for meetings and schedules']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#0066cc'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Engineering</span>
          <h3>Development Tools</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Version Control','GitHub Enterprise'],['IDE','VS Code, MATLAB, Altium Designer'],['Documentation','Confluence'],['Code Review','GitHub Pull Requests'],['Simulation','MATLAB/Simulink licenses']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#6f42c1'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Project</span>
          <h3>Project Management</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Task Management','Jira for sprint planning and tracking'],['Project Planning','Microsoft Project'],['Time Tracking','Toggl for project hours'],['Agile Boards','Jira Kanban and Scrum boards']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#28a745'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">HR & Admin</span>
          <h3>HR & Admin Tools</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['HR Portal','Workday — leave, attendance, payslips'],['Expenses','Zoho Expense for reimbursements'],['Learning','LinkedIn Learning and Coursera'],['Performance','Workday Performance module']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#fd7e14'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#17a2b8' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#17a2b8,#0d7a8a)' }}>
          <span className="bms-static-tag">Security</span>
          <h3>Security & VPN</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['VPN','Cisco AnyConnect for remote work'],['Password Manager','LastPass Enterprise'],['2FA','Microsoft Authenticator'],['Antivirus','Windows Defender pre-configured'],['IT Support','itsupport@rclabs.co | Ext: 1234']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#17a2b8'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#dc3545' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#dc3545,#a71d2a)' }}>
          <span className="bms-static-tag">Access Request</span>
          <h3>How to Request Access</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Step 1','Submit request through IT Service Portal'],['Step 2','Get manager approval'],['Step 3','IT provisions access within 24–48 hours'],['Step 4','Receive credentials and setup instructions via email']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#dc3545'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default ToolsAccess;
