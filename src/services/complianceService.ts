import { InstitutionalComplianceProfile, ComplianceObligation } from '../types/compliance';
import { Application } from '../types/application';
import {
  getComplianceProfiles,
  saveComplianceProfile,
  recordAuditLog,
} from './api';

export const complianceService = {
  getAll(): InstitutionalComplianceProfile[] {
    return getComplianceProfiles();
  },

  getByInstitutionId(institutionId: string): InstitutionalComplianceProfile | undefined {
    const list = getComplianceProfiles();
    return list.find(p => p.institutionId === institutionId);
  },

  updateObligationStatus(
    institutionId: string,
    obligationId: string,
    newStatus: 'COMPLIANT' | 'DUE_SOON' | 'OVERDUE',
    remarks: string
  ): InstitutionalComplianceProfile | null {
    const profiles = getComplianceProfiles();
    const profile = profiles.find(p => p.institutionId === institutionId);
    if (!profile) return null;

    const obligations = profile.obligations.map(ob => {
      if (ob.id === obligationId) {
        return {
          ...ob,
          status: newStatus,
          remarks,
          lastVerifiedDate: new Date().toISOString().split('T')[0],
        };
      }
      return ob;
    });

    const compliantCount = obligations.filter(o => o.status === 'COMPLIANT').length;
    const dueSoonCount = obligations.filter(o => o.status === 'DUE_SOON').length;
    const overdueCount = obligations.filter(o => o.status === 'OVERDUE').length;

    const score = Math.round((compliantCount / obligations.length) * 100);
    const health = overdueCount > 0 ? 'CRITICAL_OVERDUE' : dueSoonCount > 0 ? 'DUE_SOON' : 'COMPLIANT';

    const updatedProfile: InstitutionalComplianceProfile = {
      ...profile,
      overallHealth: health,
      complianceScore: score,
      compliantCount,
      dueSoonCount,
      overdueCount,
      obligations,
      lastAuditDate: new Date().toISOString().split('T')[0],
    };

    saveComplianceProfile(updatedProfile);
    recordAuditLog(
      'COMPLIANCE_STATUS_CHANGED',
      `Obligation status updated to ${newStatus} for ${profile.institutionName}. Note: ${remarks}`,
      undefined,
      profile.institutionName
    );

    return updatedProfile;
  },

  ensureComplianceProfileForApp(app: Application): InstitutionalComplianceProfile {
    const existing = this.getByInstitutionId(app.institutionId);
    if (existing) return existing;

    const defaultObligations: ComplianceObligation[] = [
      {
        id: `ob-new-1`,
        category: 'Fire Safety Clearance',
        title: 'Annual Fire & Life Safety Certificate Renewal',
        dueDate: '2027-04-30',
        lastVerifiedDate: new Date().toISOString().split('T')[0],
        status: 'COMPLIANT',
        complianceOfficer: 'Dr. R. K. Soni',
        remarks: 'Cleared as part of 2026 approval scrutiny.',
      },
      {
        id: `ob-new-2`,
        category: 'Endowment / FDR Fund',
        title: 'AICTE Joint Security Deposit FDR Maintenance',
        dueDate: '2028-06-30',
        lastVerifiedDate: new Date().toISOString().split('T')[0],
        status: 'COMPLIANT',
        complianceOfficer: 'Dr. R. K. Soni',
        remarks: 'Joint lien verified with Nationalized Bank.',
      },
      {
        id: `ob-new-3`,
        category: 'Student Faculty Ratio',
        title: 'Maintenance of 1:15 Faculty Cadre Ratio',
        dueDate: '2026-12-31',
        lastVerifiedDate: new Date().toISOString().split('T')[0],
        status: 'COMPLIANT',
        complianceOfficer: 'Dr. R. K. Soni',
        remarks: 'Roster verified with biometric registration.',
      },
      {
        id: `ob-new-4`,
        category: 'Anti-Ragging Committee',
        title: 'Statutory Anti-Ragging Committee & Affidavit Submissions',
        dueDate: '2027-03-31',
        lastVerifiedDate: new Date().toISOString().split('T')[0],
        status: 'COMPLIANT',
        complianceOfficer: 'Dr. R. K. Soni',
        remarks: 'Notified on website with 24x7 helpline.',
      },
    ];

    const newProfile: InstitutionalComplianceProfile = {
      institutionId: app.institutionId,
      institutionName: app.institutionName,
      aictePermanentId: app.aictePermanentId,
      region: app.region,
      overallHealth: 'COMPLIANT',
      complianceScore: 100,
      totalObligations: defaultObligations.length,
      compliantCount: defaultObligations.length,
      dueSoonCount: 0,
      overdueCount: 0,
      obligations: defaultObligations,
      lastAuditDate: new Date().toISOString().split('T')[0],
      assignedOfficer: 'Dr. R. K. Soni',
    };

    saveComplianceProfile(newProfile);
    return newProfile;
  },
};

