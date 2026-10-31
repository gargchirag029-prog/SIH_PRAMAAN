import { EVCVisit, EVCReport, EVCCommitteeMember } from '../types/evc';
import {
  getEVCVisits,
  saveEVCVisit,
  getApplicationById,
  saveApplication,
  recordAuditLog,
} from './api';

export const evcService = {
  getAll(): EVCVisit[] {
    return getEVCVisits();
  },

  getById(id: string): EVCVisit | undefined {
    const list = getEVCVisits();
    return list.find(v => v.id === id || v.applicationId === id);
  },

  scheduleVisit(
    applicationId: string,
    visitDate: string,
    visitTime: string,
    locationAddress: string,
    committeeMembers: EVCCommitteeMember[],
    schedulingRemarks?: string
  ): EVCVisit | null {
    const app = getApplicationById(applicationId);
    if (!app) return null;

    const reportDueDate = new Date(new Date(visitDate).getTime() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const newVisit: EVCVisit = {
      id: `evc-${Date.now()}`,
      applicationId: app.id,
      applicationRef: app.referenceNumber,
      institutionId: app.institutionId,
      institutionName: app.institutionName,
      region: app.region,
      locationAddress,
      visitDate,
      visitTime,
      status: 'SCHEDULED',
      committeeMembers,
      schedulingRemarks,
      reportDueDate,
      createdDate: new Date().toISOString().split('T')[0],
      conflictCheckPassed: true,
    };

    saveEVCVisit(newVisit);

    // Update application state
    const updatedApp = {
      ...app,
      status: 'EVC_SCHEDULED' as const,
      currentStage: 'EVC' as const,
      evcId: newVisit.id,
    };
    saveApplication(updatedApp);

    recordAuditLog(
      'EVC_SCHEDULED',
      `Expert Visit Committee scheduled for ${app.institutionName} on ${visitDate}. Committee members: ${committeeMembers.map(m => m.name).join(', ')}`,
      app.referenceNumber,
      app.institutionName,
      'SCRUTINY_PASSED',
      'EVC_SCHEDULED'
    );

    return newVisit;
  },

  submitReport(visitId: string, reportData: Omit<EVCReport, 'id' | 'submittedAt'>): EVCVisit | null {
    const visits = getEVCVisits();
    const visit = visits.find(v => v.id === visitId);
    if (!visit) return null;

    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

    const report: EVCReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      submittedAt: dateStr,
    };

    const updatedVisit: EVCVisit = {
      ...visit,
      status: 'REPORT_SUBMITTED',
      report,
    };

    saveEVCVisit(updatedVisit);

    // Update application state to committee review
    const app = getApplicationById(visit.applicationId);
    if (app) {
      const updatedApp = {
        ...app,
        status: 'COMMITTEE_REVIEW' as const,
        currentStage: 'COMMITTEE' as const,
        lastUpdated: dateStr,
      };
      saveApplication(updatedApp);

      recordAuditLog(
        'EVC_REPORT_SUBMITTED',
        `EVC Report submitted by ${report.submittedBy} with composite score ${report.overallScore}/100. Recommendation: ${report.recommendation}`,
        app.referenceNumber,
        app.institutionName,
        'EVC_SCHEDULED',
        'COMMITTEE_REVIEW'
      );
    }

    return updatedVisit;
  },
};

