export type EVCStatus =
  | 'PENDING_SCHEDULING'
  | 'SCHEDULED'
  | 'IN_PROGRESS'
  | 'COMPLETED_AWAITING_REPORT'
  | 'REPORT_SUBMITTED'
  | 'REPORT_OVERDUE';

export interface EVCCommitteeMember {
  id: string;
  name: string;
  role: 'Chairman' | 'Member Secretary' | 'Subject Expert' | 'Architect / Civil Representative';
  institution: string;
  phone: string;
  email: string;
  confirmed: boolean;
}

export interface EVCReportObservation {
  parameter: string;
  requirement: string;
  observed: string;
  status: 'COMPLIANT' | 'DEFICIENT' | 'NON_COMPLIANT';
  scoreOutOf10: number;
  remarks: string;
}

export interface EVCReport {
  id: string;
  submittedAt: string;
  submittedBy: string;
  overallScore: number; // e.g. 88 / 100
  recommendation: 'RECOMMENDED_FOR_APPROVAL' | 'RECOMMENDED_WITH_CONDITIONS' | 'NOT_RECOMMENDED';
  observations: EVCReportObservation[];
  infrastructureDeficiencies: string[];
  facultyDeficiencies: string[];
  geotaggedPhotosCount: number;
  videoRecordingVerified: boolean;
  finalSummary: string;
  signedReportUrl?: string;
}

export interface EVCVisit {
  id: string;
  applicationId: string;
  applicationRef: string;
  institutionId: string;
  institutionName: string;
  region: string;
  locationAddress: string;
  visitDate: string;
  visitTime: string;
  status: EVCStatus;
  committeeMembers: EVCCommitteeMember[];
  schedulingRemarks?: string;
  reportDueDate: string;
  report?: EVCReport;
  createdDate: string;
  conflictCheckPassed: boolean;
}

