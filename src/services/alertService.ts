import { AlertItem, EscalationRule, AlertCategory, AlertPriority } from '../types/alerts';
import {
  getAlerts,
  saveAlert,
  escalateAlertLevel,
  resolveAlert,
  getEscalationRules,
  saveEscalationRules,
  recordAuditLog,
} from './api';

export const alertService = {
  getAll(): AlertItem[] {
    return getAlerts();
  },

  getActive(): AlertItem[] {
    return getAlerts().filter(a => a.status === 'ACTIVE' || a.status === 'ESCALATED');
  },

  escalate(alertId: string): AlertItem | null {
    return escalateAlertLevel(alertId);
  },

  resolve(alertId: string): AlertItem | null {
    return resolveAlert(alertId);
  },

  create(
    title: string,
    description: string,
    category: AlertCategory,
    priority: AlertPriority,
    institutionName: string,
    responsibleOfficer: string,
    dueDate: string,
    applicationRef?: string
  ): AlertItem {
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

    const newAlert: AlertItem = {
      id: `alt-${Date.now()}`,
      title,
      description,
      applicationRef,
      institutionName,
      category,
      priority,
      escalationLevel: 'LEVEL_1_OFFICER',
      responsibleOfficer,
      createdAt: dateStr,
      dueDate,
      status: 'ACTIVE',
      escalationHistory: [
        {
          level: 'LEVEL_1_OFFICER',
          timestamp: dateStr,
          notifiedTo: responsibleOfficer,
          channel: 'IN_APP',
        },
      ],
      actionsAvailable: ['View Details', 'Acknowledge', 'Escalate Priority'],
    };

    saveAlert(newAlert);
    recordAuditLog(
      'ALERT_GENERATED',
      `Alert generated: "${title}" assigned to ${responsibleOfficer}`,
      applicationRef,
      institutionName
    );

    return newAlert;
  },

  getRules(): EscalationRule[] {
    return getEscalationRules();
  },

  updateRules(rules: EscalationRule[]): void {
    saveEscalationRules(rules);
  },
};

