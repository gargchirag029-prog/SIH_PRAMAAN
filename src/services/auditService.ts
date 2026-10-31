import { AuditLogEntry, AuditActionType } from '../types/audit';
import { getAuditLogs, recordAuditLog } from './api';

export const auditService = {
  getAll(): AuditLogEntry[] {
    return getAuditLogs();
  },

  getByApplication(appRef: string): AuditLogEntry[] {
    const logs = getAuditLogs();
    return logs.filter(l => l.applicationRef === appRef);
  },

  log(
    action: AuditActionType,
    remarks: string,
    applicationRef?: string,
    institutionName?: string,
    previousStatus?: string,
    newStatus?: string
  ): void {
    recordAuditLog(action, remarks, applicationRef, institutionName, previousStatus, newStatus);
  },
};

