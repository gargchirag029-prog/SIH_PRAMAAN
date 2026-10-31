export type AuditActionType =
  | 'APPLICATION_SUBMISSION'
  | 'DOCUMENT_UPLOAD'
  | 'DOCUMENT_REPLACEMENT'
  | 'SCRUTINY_STARTED'
  | 'DISCREPANCY_RAISED'
  | 'DISCREPANCY_RESOLVED'
  | 'OFFICER_REMARKS_ADDED'
  | 'AI_VERIFICATION_EXECUTED'
  | 'EVC_SCHEDULED'
  | 'EVC_REPORT_SUBMITTED'
  | 'COMMITTEE_REVIEW_COMPLETED'
  | 'FINAL_DECISION_RECORDED'
  | 'COMPLIANCE_STATUS_CHANGED'
  | 'ALERT_GENERATED'
  | 'ESCALATION_TRIGGERED'
  | 'USER_ROLE_UPDATED';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: 'institution' | 'officer' | 'admin' | 'SYSTEM_CRON';
  action: AuditActionType;
  applicationRef?: string;
  institutionName?: string;
  previousStatus?: string;
  newStatus?: string;
  remarks: string;
  ipAddress: string;
  integrityHash: string; // SHA-256 simulation for immutable chain
}

