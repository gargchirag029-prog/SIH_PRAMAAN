import { Application, ApplicationStatus, WorkflowStage } from '../types/application';
import {
  getApplications,
  getApplicationById,
  saveApplication,
  updateApplicationWorkflow,
  recordAuditLog,
} from './api';

export const applicationService = {
  getAll(): Application[] {
    return getApplications();
  },

  getById(id: string): Application | undefined {
    return getApplicationById(id);
  },

  create(appData: Omit<Application, 'id' | 'referenceNumber' | 'submissionDate' | 'lastUpdated' | 'status' | 'currentStage' | 'pendingDurationDays'>): Application {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regionCode = appData.region === 'North-Western' ? 'NWRO' : appData.region === 'Southern' ? 'SRO' : 'HQ';
    const ref = `AICTE/${regionCode}/2026/APP-${randomNum}`;
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

    const newApp: Application = {
      ...appData,
      id: `app-${Date.now()}`,
      referenceNumber: ref,
      submissionDate: dateStr,
      lastUpdated: dateStr,
      status: 'SUBMITTED',
      currentStage: 'SCRUTINY',
      pendingDurationDays: 0,
      assignedOfficerId: 'user-off-01',
      assignedOfficerName: 'Dr. R. K. Soni',
      documentCompletenessScore: 100,
      discrepancyCount: 0,
    };

    saveApplication(newApp);
    recordAuditLog(
      'APPLICATION_SUBMISSION',
      `New application submitted for ${newApp.category} by ${newApp.institutionName}`,
      newApp.referenceNumber,
      newApp.institutionName,
      'DRAFT',
      'SUBMITTED'
    );

    return newApp;
  },

  startScrutiny(appId: string): Application | null {
    return updateApplicationWorkflow(
      appId,
      'UNDER_SCRUTINY',
      'SCRUTINY',
      'Officer initiated formal scrutiny of application documents and institutional infrastructure data.'
    );
  },

  raiseDiscrepancy(appId: string, discrepancyReason: string): Application | null {
    const app = getApplicationById(appId);
    if (!app) return null;

    const discrepancies = app.discrepancies ? [...app.discrepancies, discrepancyReason] : [discrepancyReason];

    return updateApplicationWorkflow(
      appId,
      'DISCREPANCY_RAISED',
      'SCRUTINY',
      `Discrepancy raised: ${discrepancyReason}`,
      {
        discrepancyCount: discrepancies.length,
        discrepancies,
        scrutinyRemarks: `Discrepancy flagged: ${discrepancyReason}`,
      }
    );
  },

  respondToDiscrepancy(appId: string, responseNote: string): Application | null {
    const app = getApplicationById(appId);
    if (!app) return null;

    return updateApplicationWorkflow(
      appId,
      'RE_SCRUTINY_PENDING',
      'RE_SCRUTINY',
      `Institution submitted discrepancy response: ${responseNote}`,
      {
        discrepancyResponse: responseNote,
        documentCompletenessScore: 98,
      }
    );
  },

  passScrutiny(appId: string, forwardTo: 'EVC' | 'COMMITTEE', remarks: string): Application | null {
    const app = getApplicationById(appId);
    if (!app) return null;

    const newStatus: ApplicationStatus = forwardTo === 'EVC' ? 'SCRUTINY_PASSED' : 'COMMITTEE_REVIEW';
    const newStage: WorkflowStage = forwardTo === 'EVC' ? 'EVC' : 'COMMITTEE';

    return updateApplicationWorkflow(
      appId,
      newStatus,
      newStage,
      `Scrutiny approved. Forwarded to ${forwardTo} with remarks: ${remarks}`,
      {
        scrutinyRemarks: remarks,
        discrepancyCount: 0,
      }
    );
  },
};

