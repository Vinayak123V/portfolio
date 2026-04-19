import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import '../product/BMSOverview.css';

const PreJoining = () => (
  <div>
    <div className="breadcrumb">
      <Link to="/">Home</Link><span>/</span>
      <Link to="/employee-onboarding">Employee Onboarding</Link><span>/</span>
      <span>Pre-Joining</span>
    </div>
    <div className="page-header" style={{ position: 'relative', paddingRight: 200 }}>
      <h1 className="page-title">Pre-Joining Requirements</h1>
      <p className="page-description">Documents and preparations needed before your first day at RC Labs.</p>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 220 180"
        aria-label="Two people shaking hands"
        style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', width: 170, height: 140, pointerEvents: 'none' }}
      >
        {/* ── Left person ── */}
        {/* Head */}
        <circle cx="52" cy="42" r="18" fill="#FBBF9A" />
        {/* Hair */}
        <path d="M34 38 Q34 20 52 20 Q70 20 70 38 Q65 28 52 29 Q39 28 34 38Z" fill="#3B2314" />
        {/* Eyes */}
        <circle cx="46" cy="41" r="2.2" fill="#1a1a1a" />
        <circle cx="58" cy="41" r="2.2" fill="#1a1a1a" />
        <circle cx="47" cy="40" r="0.8" fill="white" />
        <circle cx="59" cy="40" r="0.8" fill="white" />
        {/* Smile */}
        <path d="M46 50 Q52 56 58 50" fill="none" stroke="#c07050" strokeWidth="1.6" strokeLinecap="round" />
        {/* Neck */}
        <rect x="47" y="58" width="10" height="10" rx="3" fill="#FBBF9A" />
        {/* Shirt */}
        <path d="M28 130 L28 78 Q28 68 52 68 Q76 68 76 78 L76 130 Z" fill="#0066cc" />
        {/* Collar */}
        <path d="M47 68 L52 80 L57 68" fill="white" />
        {/* Left arm down */}
        <path d="M28 85 Q16 105 18 122" stroke="#0066cc" strokeWidth="13" strokeLinecap="round" fill="none" />
        <circle cx="18" cy="126" r="7" fill="#FBBF9A" />
        {/* Right arm — extended */}
        <path d="M76 85 Q96 95 106 106" stroke="#0066cc" strokeWidth="13" strokeLinecap="round" fill="none" />
        {/* Trousers */}
        <rect x="32" y="128" width="16" height="38" rx="8" fill="#1e293b" />
        <rect x="54" y="128" width="16" height="38" rx="8" fill="#1e293b" />
        {/* Shoes */}
        <ellipse cx="40" cy="167" rx="12" ry="5" fill="#0f172a" />
        <ellipse cx="62" cy="167" rx="12" ry="5" fill="#0f172a" />

        {/* ── Handshake ── */}
        <ellipse cx="110" cy="109" rx="14" ry="9" fill="#FBBF9A" />
        <path d="M96 106 Q110 102 124 106" fill="none" stroke="#d4956a" strokeWidth="1.5" />
        <line x1="104" y1="104" x2="104" y2="114" stroke="#d4956a" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="110" y1="102" x2="110" y2="116" stroke="#d4956a" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="116" y1="104" x2="116" y2="114" stroke="#d4956a" strokeWidth="1.2" strokeLinecap="round" />

        {/* ── Right person ── */}
        {/* Head */}
        <circle cx="168" cy="42" r="18" fill="#FBBF9A" />
        {/* Hair — bun */}
        <path d="M150 38 Q150 20 168 20 Q186 20 186 38 Q181 28 168 29 Q155 28 150 38Z" fill="#1a1a1a" />
        <circle cx="168" cy="22" r="9" fill="#1a1a1a" />
        {/* Eyes */}
        <circle cx="162" cy="41" r="2.2" fill="#1a1a1a" />
        <circle cx="174" cy="41" r="2.2" fill="#1a1a1a" />
        <circle cx="163" cy="40" r="0.8" fill="white" />
        <circle cx="175" cy="40" r="0.8" fill="white" />
        {/* Smile */}
        <path d="M162 50 Q168 56 174 50" fill="none" stroke="#c07050" strokeWidth="1.6" strokeLinecap="round" />
        {/* Neck */}
        <rect x="163" y="58" width="10" height="10" rx="3" fill="#FBBF9A" />
        {/* Shirt */}
        <path d="M144 130 L144 78 Q144 68 168 68 Q192 68 192 78 L192 130 Z" fill="#28a745" />
        {/* Collar */}
        <path d="M163 68 L168 80 L173 68" fill="white" />
        {/* Left arm — extended */}
        <path d="M144 85 Q124 95 114 106" stroke="#28a745" strokeWidth="13" strokeLinecap="round" fill="none" />
        {/* Right arm down */}
        <path d="M192 85 Q204 105 202 122" stroke="#28a745" strokeWidth="13" strokeLinecap="round" fill="none" />
        <circle cx="202" cy="126" r="7" fill="#FBBF9A" />
        {/* Trousers */}
        <rect x="148" y="128" width="16" height="38" rx="8" fill="#1e293b" />
        <rect x="170" y="128" width="16" height="38" rx="8" fill="#1e293b" />
        {/* Shoes */}
        <ellipse cx="156" cy="167" rx="12" ry="5" fill="#0f172a" />
        <ellipse cx="178" cy="167" rx="12" ry="5" fill="#0f172a" />

        {/* Ground */}
        <ellipse cx="110" cy="173" rx="80" ry="5" fill="rgba(0,0,0,0.06)" />
      </svg>
    </div>
    <div className="bms-static-grid">

      <div className="bms-static-card" style={{ borderTopColor: '#0066cc' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#0066cc,#004999)' }}>
          <span className="bms-static-tag">Documents</span>
          <h3>Required Documents</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Signed offer letter and employment contract','Educational certificates (originals for verification)','Previous employment experience letters','Relieving letter from previous employer','Passport size photographs (4 copies)','Government-issued ID proof','Address proof (Utility bill / Bank statement)','PAN card and Aadhaar card copies','Bank account details for salary transfer','Medical fitness certificate'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#0066cc'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#6f42c1' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#6f42c1,#4a2a8a)' }}>
          <span className="bms-static-tag">Verification</span>
          <h3>Background Verification</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table">
            {[['Employment History','Verification of past roles and tenure'],['Education','Qualification certificate verification'],['Identity & Address','Government ID and address proof check'],['Criminal Record','Background check'],['References','Reference checks from previous employers'],['Timeline','2–3 weeks — joining may be subject to completion']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#6f42c1'}}>{v}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#28a745' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#28a745,#1a7a32)' }}>
          <span className="bms-static-tag">Formalities</span>
          <h3>Pre-Joining Checklist</h3>
        </div>
        <div className="bms-static-body">
          <ul className="bms-extras-list">
            {['Complete online pre-joining form sent by HR','Submit all required documents','Provide emergency contact information','Complete health insurance nomination form','Set up bank account for salary credit','Confirm your joining date with HR'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#28a745'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bms-static-card" style={{ borderTopColor: '#fd7e14' }}>
        <div className="bms-static-header" style={{ background: 'linear-gradient(135deg,#fd7e14,#c85a00)' }}>
          <span className="bms-static-tag">Preparation</span>
          <h3>What to Expect & Tips</h3>
        </div>
        <div className="bms-static-body">
          <div className="bms-specs-table" style={{ marginBottom: 14 }}>
            {[['Welcome Email','Joining details, office location, reporting time'],['Dress Code','Professional attire guidelines'],['Parking','Parking information if applicable'],['Day 1 Schedule','Orientation agenda and buddy assignment']].map(([l,v],i)=>(
              <div key={i} className="bms-spec-row"><span className="bms-spec-label">{l}</span><span className="bms-spec-value" style={{color:'#fd7e14'}}>{v}</span></div>
            ))}
          </div>
          <ul className="bms-extras-list">
            {['Review RC Labs website and understand our products','Research battery management systems and EV industry','Plan your commute and arrive 15 minutes early','Bring a notepad and pen for orientation'].map((e,i)=>(
              <li key={i} style={{'--dot-color':'#fd7e14'}}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  </div>
);

export default PreJoining;
