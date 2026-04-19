import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const CodeOfConduct = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/hr-policies">HR Policies</Link><span>/</span>
      <span>Code of Conduct</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Code of Conduct</h1>
      <p className="page-description">Professional standards and ethical guidelines for all RC Labs employees.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Values</span>
          <h3>Core Values</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Innovation','Continuously push boundaries in battery management technology'],['Integrity','Maintain highest ethical standards in all business dealings'],['Excellence','Deliver quality products and services consistently'],['Collaboration','Work together to achieve common goals'],['Sustainability','Contribute to a greener future through our solutions']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#0066cc'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Behaviour</span>
          <h3>Professional Behaviour</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Treat all colleagues with respect and dignity','Maintain professional communication in all interactions','Respect diversity and promote inclusive workplace culture','Avoid conflicts of interest in business decisions','Dress appropriately for workplace and client meetings'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#28a745'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Data</span>
          <h3>Confidentiality & Data Security</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Protect company proprietary information and trade secrets','Do not share confidential information with unauthorized parties','Follow data security protocols for customer and company data','Use company resources and equipment responsibly','Report security breaches immediately to IT department'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#6f42c1'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Safety</span>
          <h3>Workplace Safety</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Follow all safety protocols in laboratory and manufacturing areas','Use personal protective equipment (PPE) when required','Report safety hazards or incidents immediately','Participate in safety training programs','Maintain clean and organized work environment'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#fd7e14'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#dc3545' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#dc3545,#a71d2a)' }}>
          <span className="bms-static-tag">Zero Tolerance</span>
          <h3>Anti-Harassment Policy</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Discrimination','Zero tolerance based on gender, race, religion, age, or disability'],['Sexual Harassment','No unwelcome advances or inappropriate conduct'],['Bullying','No intimidation or hostile behaviour'],['Reporting','Complaints handled confidentially and promptly'],['Protection','No retaliation for reporting violations']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#dc3545'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#17a2b8' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#17a2b8,#0d7a8a)' }}>
          <span className="bms-static-tag">Resolution</span>
          <h3>Conflict Resolution</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Step 1','Discuss the issue directly with the concerned party'],['Step 2','Involve your immediate supervisor if unresolved'],['Step 3','Escalate to HR department if necessary'],['Step 4','Formal grievance procedure for serious matters'],['Reporting','Anonymous reporting channel available']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#17a2b8'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default CodeOfConduct;
