import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const TeamContacts = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/employee-onboarding">Employee Onboarding</Link><span>/</span>
      <span>Team Contacts</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Team Contacts</h1>
      <p className="page-description">Key contacts and team members at RC Labs.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Leadership</span>
          <h3>Leadership Team</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['CEO','ceo@rclabs.co'],['CTO','cto@rclabs.co'],['VP Engineering','vpeng@rclabs.co'],['VP Operations','vpops@rclabs.co'],['CFO','cfo@rclabs.co']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#0066cc'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">People</span>
          <h3>Human Resources</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['HR Manager','hr@rclabs.co | Ext: 1100'],['HR Coordinator','hrcoord@rclabs.co | Ext: 1101'],['Talent Acquisition','careers@rclabs.co | Ext: 1102'],['General HR Queries','hr@rclabs.co']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#28a745'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Technical</span>
          <h3>Engineering Team</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Hardware Lead','hardware@rclabs.co'],['Firmware Lead','firmware@rclabs.co'],['Software Lead','software@rclabs.co'],['Battery Engineering Lead','battery@rclabs.co'],['Data Science Lead','datascience@rclabs.co']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#6f42c1'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Support</span>
          <h3>IT & Operations</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['IT Support Desk','itsupport@rclabs.co | Ext: 1234'],['Operations Manager','operations@rclabs.co'],['Finance','finance@rclabs.co'],['Admin Support','admin@rclabs.co | Ext: 1000'],['General Inquiries','info@rclabs.co']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#fd7e14'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#dc3545' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#dc3545,#a71d2a)' }}>
          <span className="bms-static-tag">Emergency</span>
          <h3>Emergency Contacts</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Security','Ext: 9999'],['First Aid','Ext: 8888'],['Fire Emergency','Ext: 7777'],['IT Emergency','Ext: 1234'],['Building Management','Ext: 6666']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#dc3545'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default TeamContacts;
