import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import AuthPage from './pages/auth/AuthPage';
import Home from './pages/Home';
import HRPolicies from './pages/HRPolicies';
import WorkHours from './pages/hr/WorkHours';
import LeavePolicy from './pages/hr/LeavePolicy';
import SalaryBenefits from './pages/hr/SalaryBenefits';
import CodeOfConduct from './pages/hr/CodeOfConduct';
import ExitProcess from './pages/hr/ExitProcess';
import EmployeeOnboarding from './pages/EmployeeOnboarding';
import PreJoining from './pages/onboarding/PreJoining';
import Day1Steps from './pages/onboarding/Day1Steps';
import ToolsAccess from './pages/onboarding/ToolsAccess';
import FirstWeekPlan from './pages/onboarding/FirstWeekPlan';
import TeamContacts from './pages/onboarding/TeamContacts';
import ProjectDocumentation from './pages/ProjectDocumentation';
import ActiveProjects from './pages/projects/ActiveProjects';
import CompletedProjects from './pages/projects/CompletedProjects';
import WithheldProjects from './pages/projects/WithheldProjects';
import TeamDirectory from './pages/team/TeamDirectory';
import EngineeringTeam from './pages/team/EngineeringTeam';
import Management from './pages/team/Management';
import Contacts from './pages/team/Contacts';
import BatteryKnowledgeBase from './pages/battery/BatteryKnowledgeBase';
import BatteryOverview from './pages/battery/BatteryOverview';
import BatteryTypes from './pages/battery/BatteryTypes';
import ChargingBasics from './pages/battery/ChargingBasics';
import SafetyConsiderations from './pages/battery/SafetyConsiderations';
import ThermalManagement from './pages/battery/ThermalManagement';
import ProductTechnology from './pages/product/ProductTechnology';
import BMSOverview from './pages/product/BMSOverview';
import Architecture from './pages/product/Architecture';
import KeyFeatures from './pages/product/KeyFeatures';
import UseCases from './pages/product/UseCases';
import Attendance from './pages/Attendance';
import AdminAttendance from './pages/AdminAttendance';
import './App.css';

function ProtectedApp() {
  const { user, loading } = useAuth();

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'right', justifyContent: 'center', background: '#0a1a4a' }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div style={{ width: 48, height: 48, border: '4px solid rgba(255,255,255,0.2)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ opacity: 0.7 }}>Loading RC Labs Wiki...</p>
      </div>
    </div>
  );

  if (!user) return <AuthPage />;

  return (
    <Layout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hr-policies" element={<HRPolicies />} />
          <Route path="/hr-policies/work-hours" element={<WorkHours />} />
          <Route path="/hr-policies/leave-policy" element={<LeavePolicy />} />
          <Route path="/hr-policies/salary-benefits" element={<SalaryBenefits />} />
          <Route path="/hr-policies/code-of-conduct" element={<CodeOfConduct />} />
          <Route path="/hr-policies/exit-process" element={<ExitProcess />} />
          <Route path="/employee-onboarding" element={<EmployeeOnboarding />} />
          <Route path="/employee-onboarding/pre-joining" element={<PreJoining />} />
          <Route path="/employee-onboarding/day-1-steps" element={<Day1Steps />} />
          <Route path="/employee-onboarding/tools-access" element={<ToolsAccess />} />
          <Route path="/employee-onboarding/first-week-plan" element={<FirstWeekPlan />} />
          <Route path="/employee-onboarding/team-contacts" element={<TeamContacts />} />
          <Route path="/project-documentation" element={<ProjectDocumentation />} />
          <Route path="/project-documentation/active-projects" element={<ActiveProjects />} />
          <Route path="/project-documentation/completed-projects" element={<CompletedProjects />} />
          <Route path="/project-documentation/withheld-projects" element={<WithheldProjects />} />
          <Route path="/team-directory" element={<TeamDirectory />} />
          <Route path="/team-directory/engineering" element={<EngineeringTeam />} />
          <Route path="/team-directory/management" element={<Management />} />
          <Route path="/team-directory/contacts" element={<Contacts />} />
          <Route path="/battery-knowledge" element={<BatteryKnowledgeBase />} />
          <Route path="/battery-knowledge/overview" element={<BatteryOverview />} />
          <Route path="/battery-knowledge/types" element={<BatteryTypes />} />
          <Route path="/battery-knowledge/charging" element={<ChargingBasics />} />
          <Route path="/battery-knowledge/safety" element={<SafetyConsiderations />} />
          <Route path="/battery-knowledge/thermal" element={<ThermalManagement />} />
          <Route path="/product-technology" element={<ProductTechnology />} />
          <Route path="/product-technology/bms-overview" element={<BMSOverview />} />
          <Route path="/product-technology/architecture" element={<Architecture />} />
          <Route path="/product-technology/key-features" element={<KeyFeatures />} />
          <Route path="/product-technology/use-cases" element={<UseCases />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/admin-attendance" element={<AdminAttendance />} />
        </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <ProtectedApp />
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
