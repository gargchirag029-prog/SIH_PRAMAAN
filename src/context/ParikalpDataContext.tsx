import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Application } from '../types/application';
import { DocumentRecord } from '../types/document';
import { DocumentVerificationReport } from '../types/verification';
import { EVCVisit } from '../types/evc';
import { CommitteeReviewItem } from '../types/committee';
import { InstitutionalComplianceProfile } from '../types/compliance';
import { AlertItem } from '../types/alerts';
import { AuditLogEntry } from '../types/audit';

import {
  getApplications,
  getDocuments,
  getVerificationReports,
  getEVCVisits,
  getCommitteeReviews,
  getComplianceProfiles,
  getAlerts,
  getAuditLogs,
  initializeParikalpStore,
  resetParikalpStoreToDefault,
} from '../services/api';

interface ParikalpDataContextType {
  applications: Application[];
  documents: DocumentRecord[];
  verifications: DocumentVerificationReport[];
  evcVisits: EVCVisit[];
  committeeReviews: CommitteeReviewItem[];
  complianceProfiles: InstitutionalComplianceProfile[];
  alerts: AlertItem[];
  auditLogs: AuditLogEntry[];
  refreshData: () => void;
  resetDemoData: () => void;
  metrics: {
    totalApplications: number;
    underScrutiny: number;
    rescrutinyPending: number;
    evcScheduled: number;
    evcReportsPending: number;
    awaitingCommittee: number;
    approvedCount: number;
    pendingComplianceActions: number;
  };
}

const ParikalpDataContext = createContext<ParikalpDataContextType | undefined>(undefined);

export const ParikalpDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [verifications, setVerifications] = useState<DocumentVerificationReport[]>([]);
  const [evcVisits, setEvcVisits] = useState<EVCVisit[]>([]);
  const [committeeReviews, setCommitteeReviews] = useState<CommitteeReviewItem[]>([]);
  const [complianceProfiles, setComplianceProfiles] = useState<InstitutionalComplianceProfile[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  const refreshData = useCallback(() => {
    initializeParikalpStore();
    setApplications(getApplications());
    setDocuments(getDocuments());
    setVerifications(getVerificationReports());
    setEvcVisits(getEVCVisits());
    setCommitteeReviews(getCommitteeReviews());
    setComplianceProfiles(getComplianceProfiles());
    setAlerts(getAlerts());
    setAuditLogs(getAuditLogs());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const resetDemoData = useCallback(() => {
    resetParikalpStoreToDefault();
  }, []);

  // Calculate live KPI metrics
  const totalApplications = applications.length;
  const underScrutiny = applications.filter(a => a.status === 'UNDER_SCRUTINY' || a.status === 'SUBMITTED').length;
  const rescrutinyPending = applications.filter(a => a.status === 'RE_SCRUTINY_PENDING' || a.status === 'DISCREPANCY_RAISED').length;
  const evcScheduled = evcVisits.filter(v => v.status === 'SCHEDULED' || v.status === 'IN_PROGRESS').length;
  const evcReportsPending = evcVisits.filter(v => v.status === 'COMPLETED_AWAITING_REPORT' || v.status === 'REPORT_OVERDUE').length;
  const awaitingCommittee = applications.filter(a => a.status === 'COMMITTEE_REVIEW').length;
  const approvedCount = applications.filter(a => a.status === 'APPROVED').length;
  const pendingComplianceActions = complianceProfiles.reduce((acc, p) => acc + p.overdueCount + p.dueSoonCount, 0);

  const metrics = {
    totalApplications,
    underScrutiny,
    rescrutinyPending,
    evcScheduled,
    evcReportsPending,
    awaitingCommittee,
    approvedCount,
    pendingComplianceActions,
  };

  return (
    <ParikalpDataContext.Provider
      value={{
        applications,
        documents,
        verifications,
        evcVisits,
        committeeReviews,
        complianceProfiles,
        alerts,
        auditLogs,
        refreshData,
        resetDemoData,
        metrics,
      }}
    >
      {children}
    </ParikalpDataContext.Provider>
  );
};

export const useParikalpData = (): ParikalpDataContextType => {
  const context = useContext(ParikalpDataContext);
  if (!context) {
    throw new Error('useParikalpData must be used within a ParikalpDataProvider');
  }
  return context;
};

