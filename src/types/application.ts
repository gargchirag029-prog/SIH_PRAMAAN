export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_SCRUTINY'
  | 'DISCREPANCY_RAISED'
  | 'RE_SCRUTINY_PENDING'
  | 'SCRUTINY_PASSED'
  | 'EVC_SCHEDULED'
  | 'EVC_COMPLETED'
  | 'COMMITTEE_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'RETURNED_FOR_CLARIFICATION';

export type WorkflowStage =
  | 'SUBMISSION'
  | 'SCRUTINY'
  | 'RE_SCRUTINY'
  | 'EVC'
  | 'COMMITTEE'
  | 'DECISION'
  | 'COMPLIANCE';

export type ApplicationCategory =
  | 'Extension of Approval (EOA)'
  | 'New Technical Institution (NTI)'
  | 'Increase in Intake (III)'
  | 'Introduction of New Course/Program'
  | 'Closure of Course/Institution'
  | 'Change of Site/Location'
  | 'Conversion to Co-ed';

export type Region = 'North-Western' | 'Northern' | 'Western' | 'Southern' | 'Eastern' | 'South-Western' | 'Central';

export interface CourseDetail {
  id: string;
  name: string;
  program: 'Engineering & Technology' | 'Management' | 'MCA' | 'Pharmacy' | 'Architecture' | 'Applied Arts';
  level: 'UG' | 'PG' | 'Diploma';
  currentIntake: number;
  proposedIntake: number;
  nbaAccredited: boolean;
}

export interface Application {
  id: string;
  referenceNumber: string; // e.g. AICTE/NWRO/2026/APP-8492
  institutionId: string;
  institutionName: string;
  institutionType: 'Government' | 'Govt-Aided' | 'Private-Unaided' | 'Deemed-to-be-University' | 'Central University';
  aictePermanentId: string;
  region: Region;
  state: string;
  category: ApplicationCategory;
  academicYear: string; // e.g. 2026-2027
  submissionDate: string;
  lastUpdated: string;
  status: ApplicationStatus;
  currentStage: WorkflowStage;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  documentCompletenessScore: number; // percentage, e.g. 85
  pendingDurationDays: number;
  
  // Specific Details
  contactPerson: {
    name: string;
    designation: string;
    phone: string;
    email: string;
  };
  landAreaAcres: number;
  builtUpAreaSqMeters: number;
  totalFacultyCount: number;
  studentFacultyRatio: string; // e.g. "1:15"
  courses: CourseDetail[];
  
  // Scrutiny Details
  scrutinyRemarks?: string;
  discrepancyCount: number;
  discrepancies?: string[];
  discrepancyResponse?: string;
  
  // EVC Details
  evcRequired: boolean;
  evcId?: string;
  
  // Committee & Decision Details
  committeeRemarks?: string;
  approvalLetterNumber?: string;
  approvalDate?: string;
  rejectionReason?: string;
  digitalSignatureHash?: string;
}

