import React from 'react';
import { useAuth } from '../context/AuthContext';
import { authService, ROLE_PERMISSIONS } from '../services/authService';
import { UserRole } from '../types/user';
import {
  Users2,
  ShieldCheck,
  Check,
  X,
  UserPlus,
  Key,
  Building,
  FileCheck2,
  Gavel,
} from 'lucide-react';

export const UserManagement: React.FC = () => {
  const { user, switchRole } = useAuth();
  const availableUsers = authService.getAvailableUsers();

  const permissionKeys: { key: keyof typeof ROLE_PERMISSIONS.admin; label: string }[] = [
    { key: 'canSubmitApplication', label: 'Submit AICTE Approval Application' },
    { key: 'canScrutinize', label: 'Perform Regional Officer Scrutiny' },
    { key: 'canVerifyAI', label: 'AI Document Intelligence & Forensic Review' },
    { key: 'canScheduleEVC', label: 'Constitute & Schedule EVC Inspections' },
    { key: 'canSubmitEVCReport', label: 'Submit Physical Audit EVC Reports' },
    { key: 'canReviewCommittee', label: 'SAC / SHC Committee Review Workspace' },
    { key: 'canMakeFinalDecision', label: 'Endorse Final Approval Orders (LOA/EOA)' },
    { key: 'canConfigureEscalations', label: 'Configure SLA Thresholds & Escalations' },
    { key: 'canViewAuditLogs', label: 'Access Immutable Cryptographic Audit Ledger' },
    { key: 'canManageUsers', label: 'RBAC User & Role Administration' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Identity & Access Management (IAM)
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Government Enterprise RBAC</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users2 className="w-6 h-6 text-parikalp-primary" />
            Role-Based Access Control (RBAC) & User Management
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Strict role segregation enforced at API and service layers across Institution applicants, Regional Scrutiny Officers, and Executive Committee / AICTE Administrators.
          </p>
        </div>
      </div>

      {/* User Accounts Roster */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Configured Regulatory Accounts (Demo Quick Login)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableUsers.map(u => {
            const isCurrent = user.id === u.id;
            const Icon = u.role === 'institution' ? Building : u.role === 'officer' ? FileCheck2 : Gavel;
            return (
              <div
                key={u.id}
                className={`p-5 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-parikalp-lightblue/60 border-parikalp-primary ring-2 ring-blue-300/40 shadow-sm'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 bg-white rounded-lg border border-slate-200 text-parikalp-primary shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : u.role === 'officer'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{u.name}</h4>
                  <p className="text-slate-600 font-medium mt-0.5">{u.designation}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {u.institutionName || `${u.department} • ${u.region}`}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">{u.email}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Last active: Today
                  </span>
                  {!isCurrent ? (
                    <button
                      onClick={() => switchRole(u.role)}
                      className="px-3 py-1 bg-parikalp-primary hover:bg-blue-800 text-white font-bold rounded-lg transition-colors text-[11px]"
                    >
                      Login As
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Active Session
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role Permission Matrix Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Regulatory Permissions Matrix by Role Category
        </h3>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Statutory Privilege / Capability</th>
                <th className="py-3 px-4 text-center">Institution Portal</th>
                <th className="py-3 px-4 text-center">Regional Officer</th>
                <th className="py-3 px-4 text-center">AICTE Admin / Committee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissionKeys.map(perm => (
                <tr key={perm.key} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-semibold text-slate-800">{perm.label}</td>
                  <td className="py-2.5 px-4 text-center">
                    {ROLE_PERMISSIONS.institution[perm.key] ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400">
                        ✕
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {ROLE_PERMISSIONS.officer[perm.key] ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400">
                        ✕
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    {ROLE_PERMISSIONS.admin[perm.key] ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-400">
                        ✕
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

