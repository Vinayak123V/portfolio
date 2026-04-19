import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const SalaryBenefits = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/hr-policies">HR Policies</Link><span>/</span>
      <span>Salary & Benefits</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Salary & Benefits</h1>
      <p className="page-description">Compensation structure and employee benefits at RC Labs.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Compensation</span>
          <h3>Salary Structure</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Payment Cycle','Monthly — last working day of the month'],['Payment Method','Direct bank transfer'],['Salary Review','Annual performance-based review'],['Increments','Based on performance and market standards']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#0066cc'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Bonuses</span>
          <h3>Performance Bonuses</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Annual Bonus','Up to 2 months salary based on performance'],['Project Bonuses','Awarded for exceptional project delivery'],['Innovation Awards','Recognition for innovative contributions']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#fd7e14'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#dc3545' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#dc3545,#a71d2a)' }}>
          <span className="bms-static-tag">Insurance</span>
          <h3>Health & Insurance</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Health Insurance','Comprehensive medical coverage for employee and family'],['Life Insurance','Coverage up to 3× annual salary'],['Accident Insurance','Personal accident coverage'],['Annual Health Checkup','Complimentary full body checkup']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#dc3545'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Retirement</span>
          <h3>Retirement Benefits</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Provident Fund','Company contributes 12% of basic salary'],['Gratuity','As per statutory requirements'],['Pension Plan','Optional enrollment available']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#28a745'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Perks</span>
          <h3>Additional Benefits</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Learning & Development — annual budget for courses and certifications','Gym Membership — subsidized fitness center access','Meal Allowance — daily lunch subsidy','Transport Allowance — commute support or company transport','Mobile & Internet — reimbursement for work-related usage','Team Outings — quarterly team building activities'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#6f42c1'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#17a2b8' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#17a2b8,#0d7a8a)' }}>
          <span className="bms-static-tag">Equity</span>
          <h3>Stock Options (ESOP)</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Eligibility','Based on role, seniority, and performance'],['Vesting Period','4 years with 1-year cliff'],['Grant Basis','Tenure, contribution, and performance'],['Purpose','Long-term wealth creation and retention']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#17a2b8'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default SalaryBenefits;
