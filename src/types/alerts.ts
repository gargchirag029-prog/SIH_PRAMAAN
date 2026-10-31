export type AlertCategory =
  | 'APPLICATION_PENDING'
  | 'SCRUTINY_OVERDUE'
  | 'RE_SCRUTINY_PENDING'
  | 'EVC_SCHEDULING_PENDING'
  | 'EVC_REPORT_DELAYED'
  | 'DOCUMENT_EXPIRY_APPROACHING'
  | 'COMPLIANCE_SUBMISSION_OVERDUE'
  | 'COMMITTEE_DECISION_PENDING';

export type AlertPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type EscalationLevel = 'LEVEL_1_OFFICER' | 'LEVEL_2_REGIONAL_DIRECTOR' | 'LEVEL_3_AICTE_HQ';

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  applicationRef?: string;
  institutionName: string;
  category: AlertCategory;
  priority: AlertPriority;
  escalationLevel: EscalationLevel;
  responsibleOfficer: string;
  createdAt: string;
  dueDate: string;
  status: 'ACTIVE' | 'RESOLVED' | 'ESCALATED';
  escalationHistory: {
    level: EscalationLevel;
    timestamp: string;
    notifiedTo: string;
    channel: 'IN_APP' | 'EMAIL' | 'SMS';
  }[];
  actionsAvailable: string[];
}

export interface EscalationRule {
  id: string;
  category: AlertCategory;
  thresholdDaysLevel1: number;
  recipientLevel1: string;
  thresholdDaysLevel2: number;
  recipientLevel2: string;
  thresholdDaysLevel3: number;
  recipientLevel3: string;
  autoEscalate: boolean;
  smsEnabled: boolean;
  emailEnabled: boolean;
}

