export type UserRole = 'institution' | 'officer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  designation: string;
  department?: string;
  institutionId?: string;
  institutionName?: string;
  region?: string;
  avatar?: string;
  phone?: string;
  lastLogin?: string;
}

export interface RolePermission {
  role: UserRole;
  canSubmitApplication: boolean;
  canScrutinize: boolean;
  canVerifyAI: boolean;
  canScheduleEVC: boolean;
  canSubmitEVCReport: boolean;
  canReviewCommittee: boolean;
  canMakeFinalDecision: boolean;
  canManageUsers: boolean;
  canConfigureEscalations: boolean;
  canViewAuditLogs: boolean;
}

