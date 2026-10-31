import { User, UserRole, RolePermission } from '../types/user';
import { getCurrentUser, setCurrentUser, switchUserRole } from './api';
import { INITIAL_USERS } from './mockData';

export const ROLE_PERMISSIONS: Record<UserRole, RolePermission> = {
  institution: {
    role: 'institution',
    canSubmitApplication: true,
    canScrutinize: false,
    canVerifyAI: false,
    canScheduleEVC: false,
    canSubmitEVCReport: false,
    canReviewCommittee: false,
    canMakeFinalDecision: false,
    canManageUsers: false,
    canConfigureEscalations: false,
    canViewAuditLogs: false,
  },
  officer: {
    role: 'officer',
    canSubmitApplication: false,
    canScrutinize: true,
    canVerifyAI: true,
    canScheduleEVC: true,
    canSubmitEVCReport: true,
    canReviewCommittee: false,
    canMakeFinalDecision: false,
    canManageUsers: false,
    canConfigureEscalations: false,
    canViewAuditLogs: true,
  },
  admin: {
    role: 'admin',
    canSubmitApplication: false,
    canScrutinize: true,
    canVerifyAI: true,
    canScheduleEVC: true,
    canSubmitEVCReport: true,
    canReviewCommittee: true,
    canMakeFinalDecision: true,
    canManageUsers: true,
    canConfigureEscalations: true,
    canViewAuditLogs: true,
  },
};

export const authService = {
  getCurrentUser(): User {
    return getCurrentUser();
  },

  getAvailableUsers(): User[] {
    return INITIAL_USERS;
  },

  switchRole(role: UserRole): User {
    return switchUserRole(role);
  },

  setUser(user: User): void {
    setCurrentUser(user);
  },

  getPermissions(role: UserRole): RolePermission {
    return ROLE_PERMISSIONS[role];
  },

  isAuthorized(role: UserRole, requiredRoles: UserRole[]): boolean {
    return requiredRoles.includes(role);
  },
};

