import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const LeavePolicy = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/hr-policies">HR Policies</Link><span>/</span>
      <span>Leave Policy</span>
    </div>
    <div className="page-header">
      <h1 className="page-title">Leave Policy</h1>
      <p className="page-description">Comprehensive leave entitlements and application procedures.</p>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Annual</span>
          <h3>Annual Leave</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Entitlement','20 working days per year'],['Accrual','Prorated based on joining date'],['Carryover','Up to 5 days to next year'],['Application','Submit at least 2 weeks in advance'],['Approval','Subject to manager and team workload']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#0066cc'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#dc3545' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#dc3545,#a71d2a)' }}>
          <span className="bms-static-tag">Sick</span>
          <h3>Sick Leave</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Entitlement','12 days per year'],['Medical Certificate','Required for absences exceeding 2 consecutive days'],['Notification','Inform manager before 10:00 AM on the day'],['Unused Days','Do not carry forward']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#dc3545'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Special</span>
          <h3>Special Leave</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Maternity Leave','16 weeks paid leave'],['Paternity Leave','2 weeks paid leave'],['Bereavement','5 days for immediate family'],['Marriage Leave','5 days paid leave'],['Study Leave','Available for approved professional development'],['Public Holidays','All national public holidays observed']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#28a745'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Process</span>
          <h3>Leave Application Process</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Step 1','Submit leave request through HR portal'],['Step 2','Await manager approval'],['Step 3','Receive confirmation email'],['Step 4','Update team calendar'],['Step 5','Arrange handover if necessary']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#6f42c1'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default LeavePolicy;
