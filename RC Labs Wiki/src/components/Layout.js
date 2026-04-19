import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const NAV_SECTIONS = [
  {
    title: 'HR Policies',
    color: '#0066cc',
    links: [
      { to: '/hr-policies/work-hours',      label: 'Work Hours',        },
      { to: '/hr-policies/leave-policy',    label: 'Leave Policy',       },
      { to: '/hr-policies/salary-benefits', label: 'Salary & Benefits',  },
      { to: '/hr-policies/code-of-conduct', label: 'Code of Conduct',    },
      { to: '/hr-policies/exit-process',    label: 'Exit Process',       },
      { to: '/attendance',                  label: 'Attendance System'   },
      { to: '/admin-attendance',            label: 'Admin: Attendance'   },
    ],
  },
  {
    title: 'Employee Onboarding',
    color: '#28a745',
    links: [
      { to: '/employee-onboarding/pre-joining',    label: 'Pre-Joining',      },
      { to: '/employee-onboarding/day-1-steps',    label: 'Day 1 Steps',    },
      { to: '/employee-onboarding/tools-access',   label: 'Tools & Access',   },
      { to: '/employee-onboarding/first-week-plan',label: 'First Week Plan', },
      { to: '/employee-onboarding/team-contacts',  label: 'Team Contacts',    },
    ],
  },
  {
    title: 'Team Directory',
    color: '#6f42c1',
    links: [
      { to: '/team-directory/engineering', label: 'Engineering Team',  },
      { to: '/team-directory/management',  label: 'Management',       },
      { to: '/team-directory/contacts',    label: 'Contacts',         },
    ],
  },
  {
    title: 'Battery Knowledge Base',
    color: '#fd7e14',
    links: [
      { to: '/battery-knowledge/overview', label: 'Battery Fundamentals',   },
      { to: '/battery-knowledge/types',    label: 'Battery Types',         },
      { to: '/battery-knowledge/charging', label: 'Charging & Discharging', },
      { to: '/battery-knowledge/safety',   label: 'Safety Considerations', },
      { to: '/battery-knowledge/thermal',  label: 'Thermal Management',  },
    ],
  },
  {
    title: 'Product & Technology',
    color: '#17a2b8',
    links: [
      { to: '/product-technology/bms-overview',  label: 'BMS Overview',       },
      { to: '/product-technology/architecture',  label: 'System Architecture' },
      { to: '/product-technology/key-features',  label: 'Key Features',        },
      { to: '/product-technology/use-cases',     label: 'Use Cases',          },
    ],
  },
  {
    title: 'Project Documentation',
    color: '#e83e8c',
    links: [
      { to: '/project-documentation/active-projects',    label: 'Active Projects',   },
      { to: '/project-documentation/withheld-projects',  label: 'Withheld Projects',  },
      { to: '/project-documentation/completed-projects', label: 'Completed Projects', },
    ],
  },
];

const TOP_NAV = [
  { to: '/',                      label: 'Home' },
  { to: '/hr-policies',           label: 'HR' },
  { to: '/employee-onboarding',   label: 'Onboarding' },
  { to: '/project-documentation', label: 'Projects' },
  { to: '/team-directory',        label: 'Team' },
  { to: '/battery-knowledge',     label: 'Battery KB' },
  { to: '/product-technology',    label: 'Product' },
  { to: '/attendance',            label: 'Attendance' },
];

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [mobileOpen,  setMobileOpen]    = useState(false);
  const [collapsed, setCollapsed]       = useState({});
  const location = useLocation();

  const { user, logout } = useAuth();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
  const isExact  = (path) => location.pathname === path;
  const closeMobile = () => setMobileOpen(false);

  const toggleSection = (title) => {
    setCollapsed(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="layout">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMobile}>
              <img src="/RCLabs_Logo.png" alt="RC Labs" className="header-logo-img" />
            </Link>
            <span className="logo-subtitle">Internal Wiki</span>
          </div>

          {/* Desktop nav */}
          <nav className="header-nav">
            {TOP_NAV.map(({ to, label, href, isExternal }) => (
              isExternal ? (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="header-nav-link external-link">{label}</a>
              ) : (
                <Link key={to} to={to} className={isExact(to) ? 'active' : ''}>{label}</Link>
              )
            ))}
          </nav>

          {/* User info + logout */}
          <div className="header-user">
            <div className="header-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="header-username">{user?.name?.split(' ')[0]}</span>
            <button className="header-logout" onClick={logout} title="Sign out">
              ⏻
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Mobile Nav Drawer ── */}
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav-section">
          <div className="mobile-nav-title">Main</div>
          {TOP_NAV.map(({ to, label, href, isExternal }) => (
            isExternal ? (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" onClick={closeMobile}>{label}</a>
            ) : (
              <Link key={to} to={to} className={isExact(to) ? 'active' : ''} onClick={closeMobile}>{label}</Link>
            )
          ))}
        </div>
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mobile-nav-section">
            <div className="mobile-nav-title">{section.title}</div>
            {section.links.map(({ to, label, href, isExternal }) => (
              isExternal ? (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" onClick={closeMobile}>{label}</a>
              ) : (
                <Link key={to} to={to} className={isActive(to) ? 'active' : ''} onClick={closeMobile}>{label}</Link>
              )
            ))}
          </div>
        ))}
      </nav>

      <div className="layout-body">
        {/* ── Desktop Sidebar ── */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(o => !o)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>

          {sidebarOpen && (
            <nav className="sidebar-nav">
              {NAV_SECTIONS.map((section) => (
                <div key={section.title} className="nav-section">
                  <button
                    className="nav-section-header"
                    onClick={() => toggleSection(section.title)}
                    style={{ borderLeftColor: section.color }}
                  >
                    <span className="nav-section-icon">{section.icon}</span>
                    <h3 className="nav-title">{section.title}</h3>
                    <span className={`nav-chevron ${collapsed[section.title] ? 'collapsed' : ''}`}>▼</span>
                  </button>
                  <div className={`nav-links ${collapsed[section.title] ? 'collapsed' : ''}`}>
                    {section.links.map(({ to, label, icon, href, isExternal }) => (
                      isExternal ? (
                        <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="nav-link-external">
                          <span className="nav-link-icon">{icon}</span>
                          <span className="nav-link-label">{label}</span>
                          <span className="external-icon" style={{ marginLeft: 'auto', fontSize: '0.8em' }}>↗</span>
                        </a>
                      ) : (
                        <Link key={to} to={to} className={isActive(to) ? 'active' : ''}>
                          <span className="nav-link-icon">{icon}</span>
                          <span className="nav-link-label">{label}</span>
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          )}
        </aside>

        <main className="main-content">
          {children}
        </main>
      </div>

      <footer className="footer">
        <p>&copy; 2026 RC Labs — Intelligent Battery Management Systems</p>
      </footer>
    </div>
  );
};

export default Layout;
