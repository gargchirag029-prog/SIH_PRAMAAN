export type ComplianceHealth = 'COMPLIANT' | 'DUE_SOON' | 'CRITICAL_OVERDUE';

export interface ComplianceObligation {
  id: string;
  category:
    | 'Land Lease Validity'
    | 'Fire Safety Clearance'
    | 'Structural Stability'
    | 'Endowment / FDR Fund'
    | 'Student Faculty Ratio'
    | 'Anti-Ragging Committee'
    | 'Internal Complaints Committee (ICC)'
    | 'National Board of Accreditation (NBA)'
    | 'Grievance Redressal Portal';
  title: string;
  dueDate: string;
  lastVerifiedDate: string;
  status: 'COMPLIANT' | 'DUE_SOON' | 'OVERDUE';
  evidenceDocId?: string;
  evidenceDocName?: string;
  complianceOfficer: string;
  remarks: string;
  fineApplicable?: boolean;
}

export interface InstitutionalComplianceProfile {
  institutionId: string;
  institutionName: string;
  aictePermanentId: string;
  region: string;
  overallHealth: ComplianceHealth;
  complianceScore: number; // 0-100%
  totalObligations: number;
  compliantCount: number;
  dueSoonCount: number;
  overdueCount: number;
  obligations: ComplianceObligation[];
  lastAuditDate: string;
  assignedOfficer: string;
}

