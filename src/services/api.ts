import {
  INITIAL_USERS,
  INITIAL_APPLICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_VERIFICATION_REPORTS,
  INITIAL_EVC_VISITS,
  INITIAL_COMMITTEE_REVIEWS,
  INITIAL_COMPLIANCE_PROFILES,
  INITIAL_ALERTS,
  INITIAL_ESCALATION_RULES,
  INITIAL_AUDIT_LOGS,
} from './mockData';

import { Application, ApplicationStatus, WorkflowStage } from '../types/application';
import { DocumentRecord, DocVerificationStatus } from '../types/document';
import { DocumentVerificationReport } from '../types/verification';
import { EVCVisit, EVCReport } from '../types/evc';
import { CommitteeReviewItem, CommitteeDecision } from '../types/committee';
import { InstitutionalComplianceProfile } from '../types/compliance';
import { AlertItem, EscalationLevel, EscalationRule } from '../types/alerts';
import { AuditLogEntry, AuditActionType } from '../types/audit';
import { User, UserRole } from '../types/user';

const STORAGE_KEYS = {
  CURRENT_USER: 'parikalp_current_user',
  APPLICATIONS: 'parikalp_applications',
  DOCUMENTS: 'parikalp_documents',
  VERIFICATIONS: 'parikalp_verifications',
  EVC_VISITS: 'parikalp_evc_visits',
  COMMITTEE_REVIEWS: 'parikalp_committee_reviews',
  COMPLIANCE: 'parikalp_compliance',
  ALERTS: 'parikalp_alerts',
  ESCALATION_RULES: 'parikalp_escalation_rules',
  AUDIT_LOGS: 'parikalp_audit_logs',
};

// Generic storage helpers
function getItem<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultVal;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

// Initialize storage with demonstration records if uninitialized
export function initializeParikalpStore(): void {
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    setItem(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
    setItem(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.VERIFICATIONS)) {
    setItem(STORAGE_KEYS.VERIFICATIONS, INITIAL_VERIFICATION_REPORTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVC_VISITS)) {
    setItem(STORAGE_KEYS.EVC_VISITS, INITIAL_EVC_VISITS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMITTEE_REVIEWS)) {
    setItem(STORAGE_KEYS.COMMITTEE_REVIEWS, INITIAL_COMMITTEE_REVIEWS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMPLIANCE)) {
    setItem(STORAGE_KEYS.COMPLIANCE, INITIAL_COMPLIANCE_PROFILES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ALERTS)) {
    setItem(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ESCALATION_RULES)) {
    setItem(STORAGE_KEYS.ESCALATION_RULES, INITIAL_ESCALATION_RULES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
    setItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    // Default to Officer for comprehensive scrutiny demo, or user can toggle
    setItem(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[1]);
  }
}

export function resetParikalpStoreToDefault(): void {
  setItem(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  setItem(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
  setItem(STORAGE_KEYS.VERIFICATIONS, INITIAL_VERIFICATION_REPORTS);
  setItem(STORAGE_KEYS.EVC_VISITS, INITIAL_EVC_VISITS);
  setItem(STORAGE_KEYS.COMMITTEE_REVIEWS, INITIAL_COMMITTEE_REVIEWS);
  setItem(STORAGE_KEYS.COMPLIANCE, INITIAL_COMPLIANCE_PROFILES);
  setItem(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
  setItem(STORAGE_KEYS.ESCALATION_RULES, INITIAL_ESCALATION_RULES);
  setItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  window.location.reload();
}

// ----------------- AUDIT LOG HELPER -----------------
export function recordAuditLog(
  action: AuditActionType,
  remarks: string,
  applicationRef?: string,
  institutionName?: string,
  previousStatus?: string,
  newStatus?: string
): void {
  const user = getCurrentUser();
  const logs = getItem<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  const now = new Date();
  const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

  const newEntry: AuditLogEntry = {
    id: `aud-${Date.now()}`,
    timestamp,
    userId: user.id,
    userName: user.name,
    userRole: user.role,
    action,
    applicationRef,
    institutionName,
    previousStatus,
    newStatus,
    remarks,
    ipAddress: '164.100.158.42 (NIC-AICTE Gateway)',
    integrityHash: hash,
  };

  const updated = [newEntry, ...logs];
  setItem(STORAGE_KEYS.AUDIT_LOGS, updated);
}

// ----------------- USER & AUTH -----------------
export function getCurrentUser(): User {
  return getItem<User>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[1]);
}

export function setCurrentUser(user: User): void {
  setItem(STORAGE_KEYS.CURRENT_USER, user);
}

export function switchUserRole(role: UserRole): User {
  const target = INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
  setCurrentUser(target);
  return target;
}

// ----------------- APPLICATIONS -----------------
export function getApplications(): Application[] {
  return getItem<Application[]>(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
}

export function getApplicationById(id: string): Application | undefined {
  const apps = getApplications();
  return apps.find(a => a.id === id || a.referenceNumber === id);
}

export function saveApplication(app: Application): Application {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === app.id);
  let updated: Application[];
  if (idx >= 0) {
    updated = [...apps];
    updated[idx] = app;
  } else {
    updated = [app, ...apps];
  }
  setItem(STORAGE_KEYS.APPLICATIONS, updated);
  return app;
}

export function updateApplicationWorkflow(
  appId: string,
  newStatus: ApplicationStatus,
  newStage: WorkflowStage,
  remarks: string,
  extraUpdates: Partial<Application> = {}
): Application | null {
  const app = getApplicationById(appId);
  if (!app) return null;

  const previousStatus = app.status;
  const now = new Date();
  const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

  const updatedApp: Application = {
    ...app,
    ...extraUpdates,
    status: newStatus,
    currentStage: newStage,
    lastUpdated: dateStr,
  };

  saveApplication(updatedApp);
  recordAuditLog(
    'SCRUTINY_STARTED',
    remarks,
    app.referenceNumber,
    app.institutionName,
    previousStatus,
    newStatus
  );

  return updatedApp;
}

// ----------------- DOCUMENTS -----------------
export function getDocuments(): DocumentRecord[] {
  return getItem<DocumentRecord[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
}

export function getDocumentsByAppId(appId: string): DocumentRecord[] {
  const docs = getDocuments();
  return docs.filter(d => d.applicationId === appId || d.applicationRef === appId);
}

export function saveDocument(doc: DocumentRecord): DocumentRecord {
  const docs = getDocuments();
  const idx = docs.findIndex(d => d.id === doc.id);
  let updated: DocumentRecord[];
  if (idx >= 0) {
    updated = [...docs];
    updated[idx] = doc;
  } else {
    updated = [doc, ...docs];
  }
  setItem(STORAGE_KEYS.DOCUMENTS, updated);
  return doc;
}

// ----------------- VERIFICATION -----------------
export function getVerificationReports(): DocumentVerificationReport[] {
  return getItem<DocumentVerificationReport[]>(STORAGE_KEYS.VERIFICATIONS, INITIAL_VERIFICATION_REPORTS);
}

export function getVerificationReportByDocId(docId: string): DocumentVerificationReport | undefined {
  const reports = getVerificationReports();
  return reports.find(r => r.documentId === docId);
}

export function saveVerificationReport(report: DocumentVerificationReport): DocumentVerificationReport {
  const reports = getVerificationReports();
  const idx = reports.findIndex(r => r.id === report.id);
  let updated: DocumentVerificationReport[];
  if (idx >= 0) {
    updated = [...reports];
    updated[idx] = report;
  } else {
    updated = [report, ...reports];
  }
  setItem(STORAGE_KEYS.VERIFICATIONS, updated);
  return report;
}

// ----------------- EVC VISITS -----------------
export function getEVCVisits(): EVCVisit[] {
  return getItem<EVCVisit[]>(STORAGE_KEYS.EVC_VISITS, INITIAL_EVC_VISITS);
}

export function saveEVCVisit(visit: EVCVisit): EVCVisit {
  const visits = getEVCVisits();
  const idx = visits.findIndex(v => v.id === visit.id);
  let updated: EVCVisit[];
  if (idx >= 0) {
    updated = [...visits];
    updated[idx] = visit;
  } else {
    updated = [visit, ...visits];
  }
  setItem(STORAGE_KEYS.EVC_VISITS, updated);
  return visit;
}

// ----------------- COMMITTEE REVIEWS -----------------
export function getCommitteeReviews(): CommitteeReviewItem[] {
  return getItem<CommitteeReviewItem[]>(STORAGE_KEYS.COMMITTEE_REVIEWS, INITIAL_COMMITTEE_REVIEWS);
}

export function saveCommitteeReview(item: CommitteeReviewItem): CommitteeReviewItem {
  const list = getCommitteeReviews();
  const idx = list.findIndex(r => r.id === item.id);
  let updated: CommitteeReviewItem[];
  if (idx >= 0) {
    updated = [...list];
    updated[idx] = item;
  } else {
    updated = [item, ...list];
  }
  setItem(STORAGE_KEYS.COMMITTEE_REVIEWS, updated);
  return item;
}

// ----------------- COMPLIANCE -----------------
export function getComplianceProfiles(): InstitutionalComplianceProfile[] {
  return getItem<InstitutionalComplianceProfile[]>(STORAGE_KEYS.COMPLIANCE, INITIAL_COMPLIANCE_PROFILES);
}

export function saveComplianceProfile(profile: InstitutionalComplianceProfile): InstitutionalComplianceProfile {
  const list = getComplianceProfiles();
  const idx = list.findIndex(p => p.institutionId === profile.institutionId);
  let updated: InstitutionalComplianceProfile[];
  if (idx >= 0) {
    updated = [...list];
    updated[idx] = profile;
  } else {
    updated = [profile, ...list];
  }
  setItem(STORAGE_KEYS.COMPLIANCE, updated);
  return profile;
}

// ----------------- ALERTS & ESCALATION -----------------
export function getAlerts(): AlertItem[] {
  return getItem<AlertItem[]>(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
}

export function saveAlert(alert: AlertItem): AlertItem {
  const list = getAlerts();
  const idx = list.findIndex(a => a.id === alert.id);
  let updated: AlertItem[];
  if (idx >= 0) {
    updated = [...list];
    updated[idx] = alert;
  } else {
    updated = [alert, ...list];
  }
  setItem(STORAGE_KEYS.ALERTS, updated);
  return alert;
}

export function escalateAlertLevel(alertId: string): AlertItem | null {
  const alerts = getAlerts();
  const alert = alerts.find(a => a.id === alertId);
  if (!alert) return null;

  let nextLevel: EscalationLevel = 'LEVEL_2_REGIONAL_DIRECTOR';
  if (alert.escalationLevel === 'LEVEL_1_OFFICER') {
    nextLevel = 'LEVEL_2_REGIONAL_DIRECTOR';
  } else if (alert.escalationLevel === 'LEVEL_2_REGIONAL_DIRECTOR') {
    nextLevel = 'LEVEL_3_AICTE_HQ';
  }

  const now = new Date();
  const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

  const updated: AlertItem = {
    ...alert,
    escalationLevel: nextLevel,
    status: 'ESCALATED',
    priority: nextLevel === 'LEVEL_3_AICTE_HQ' ? 'CRITICAL' : 'HIGH',
    escalationHistory: [
      ...alert.escalationHistory,
      {
        level: nextLevel,
        timestamp,
        notifiedTo: nextLevel === 'LEVEL_3_AICTE_HQ' ? 'AICTE Member Secretary' : 'Regional Director NWRO',
        channel: 'SMS',
      },
    ],
  };

  saveAlert(updated);
  recordAuditLog(
    'ESCALATION_TRIGGERED',
    `Alert "${alert.title}" escalated to ${nextLevel}. Automated SMS and Priority Dispatch sent.`,
    alert.applicationRef,
    alert.institutionName
  );
  return updated;
}

export function resolveAlert(alertId: string): AlertItem | null {
  const alerts = getAlerts();
  const alert = alerts.find(a => a.id === alertId);
  if (!alert) return null;

  const updated: AlertItem = {
    ...alert,
    status: 'RESOLVED',
  };
  saveAlert(updated);
  return updated;
}

export function getEscalationRules(): EscalationRule[] {
  return getItem<EscalationRule[]>(STORAGE_KEYS.ESCALATION_RULES, INITIAL_ESCALATION_RULES);
}

export function saveEscalationRules(rules: EscalationRule[]): void {
  setItem(STORAGE_KEYS.ESCALATION_RULES, rules);
}

// ----------------- AUDIT LOGS -----------------
export function getAuditLogs(): AuditLogEntry[] {
  return getItem<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
}

