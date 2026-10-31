import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ParikalpDataProvider } from './context/ParikalpDataContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { InstitutionPortal } from './pages/InstitutionPortal';
import { OfficerPortal } from './pages/OfficerPortal';
import { AdminPortal } from './pages/AdminPortal';
import { ApplicationManagement } from './pages/ApplicationManagement';
import { ApplicationSubmission } from './pages/ApplicationSubmission';
import { ScrutinyWorkspace } from './pages/ScrutinyWorkspace';
import { DocumentVerification } from './pages/DocumentVerification';
import { EVCManagement } from './pages/EVCManagement';
import { CommitteeReview } from './pages/CommitteeReview';
import { ComplianceMonitoring } from './pages/ComplianceMonitoring';
import { DocumentValidity } from './pages/DocumentValidity';
import { AlertManagement } from './pages/AlertManagement';
import { Reports } from './pages/Reports';
import { AuditLogs } from './pages/AuditLogs';
import { UserManagement } from './pages/UserManagement';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <NotificationProvider>
          <AuthProvider>
            <ParikalpDataProvider>
              <Routes>
              {/* Standalone Login Screen */}
              <Route path="/login" element={<Login />} />

              {/* Main Application with Layout */}
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="institution-portal" element={<InstitutionPortal />} />
                <Route path="officer-portal" element={<OfficerPortal />} />
                <Route path="admin-portal" element={<AdminPortal />} />
                <Route path="applications" element={<ApplicationManagement />} />
                <Route path="submit-application" element={<ApplicationSubmission />} />
                <Route path="scrutiny" element={<ScrutinyWorkspace />} />
                <Route path="verification" element={<DocumentVerification />} />
                <Route path="evc" element={<EVCManagement />} />
                <Route path="committee" element={<CommitteeReview />} />
                <Route path="compliance" element={<ComplianceMonitoring />} />
                <Route path="documents" element={<DocumentValidity />} />
                <Route path="alerts" element={<AlertManagement />} />
                <Route path="reports" element={<Reports />} />
                <Route path="audit" element={<AuditLogs />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ParikalpDataProvider>
        </AuthProvider>
      </NotificationProvider>
    </AccessibilityProvider>
  </BrowserRouter>
  );
};

export default App;
