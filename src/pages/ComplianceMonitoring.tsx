import React, { useState } from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { complianceService } from '../services/complianceService';
import { useNotification } from '../context/NotificationContext';
import { InstitutionalComplianceProfile } from '../types/compliance';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Building,
  CheckCircle2,
  FileText,
  RotateCcw,
  Search,
} from 'lucide-react';

export const ComplianceMonitoring: React.FC = () => {
  const { complianceProfiles, refreshData } = useParikalpData();
  const { showToast } = useNotification();

  const [selectedInstId, setSelectedInstId] = useState<string>(
    complianceProfiles[0]?.institutionId || ''
  );
  const activeProfile =
    complianceProfiles.find(p => p.institutionId === selectedInstId) || complianceProfiles[0];

  const [searchQuery, setSearchQuery] = useState('');

  // Total summary metrics
  const totalProfiles = complianceProfiles.length;
  const compliantCount = complianceProfiles.filter(p => p.overallHealth === 'COMPLIANT').length;
  const dueSoonCount = complianceProfiles.filter(p => p.overallHealth === 'DUE_SOON').length;
  const overdueCount = complianceProfiles.filter(p => p.overallHealth === 'CRITICAL_OVERDUE').length;

  const handleToggleObligation = (obId: string, currentStatus: string) => {
    if (!activeProfile) return;
    const nextStatus = currentStatus === 'OVERDUE' ? 'COMPLIANT' : 'OVERDUE';
    complianceService.updateObligationStatus(
      activeProfile.institutionId,
      obId,
      nextStatus,
      nextStatus === 'COMPLIANT'
        ? 'Verified renewed compliance document by Regional Compliance Desk.'
        : 'Statutory deadline elapsed without verified submission.'
    );
    refreshData();
    showToast(
      nextStatus === 'COMPLIANT' ? 'success' : 'warning',
      'Compliance Obligation Updated',
      `Obligation status updated to ${nextStatus} for ${activeProfile.institutionName}.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Continuous Regulatory Surveillance
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Post-Approval Institutional Monitoring</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-emerald-600" />
            Centralized Compliance Monitoring Centre
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Continuous surveillance of institutional obligations post-approval: lease deeds, fire NOC validity, FDR renewals, faculty cadre ratio maintenance, anti-ragging squad reporting, and statutory filings.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Monitored Institutions
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">
            {totalProfiles} Technical Institutes
          </span>
          <span className="text-xs text-slate-500 mt-1 block">Active under AICTE surveillance</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Fully Compliant
          </span>
          <span className="text-2xl font-bold text-emerald-700 mt-1 block">
            {compliantCount} Institutions
          </span>
          <span className="text-xs text-emerald-700 mt-1 block">Zero overdue obligations</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Renewals Due Soon (&lt; 90 Days)
          </span>
          <span className="text-2xl font-bold text-amber-700 mt-1 block">
            {dueSoonCount} Institutions
          </span>
          <span className="text-xs text-amber-700 mt-1 block">Automated reminders sent</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Critical Overdue Items
          </span>
          <span className="text-2xl font-bold text-rose-700 mt-1 block">
            {overdueCount} Critical Cases
          </span>
          <span className="text-xs text-rose-700 mt-1 block">Show-cause notices queued</span>
        </div>
      </div>

      {/* Main Split Console: Institution List & Detailed Compliance Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Institution Compliance Roster (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Institutional Compliance Roster
            </h3>

            <div className="space-y-2.5">
              {complianceProfiles.map(p => (
                <button
                  key={p.institutionId}
                  onClick={() => setSelectedInstId(p.institutionId)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                    activeProfile?.institutionId === p.institutionId
                      ? 'bg-parikalp-lightblue/70 border-parikalp-primary ring-2 ring-blue-300/40 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 truncate max-w-[170px]">
                      {p.institutionName}
                    </span>
                    <StatusBadge status={p.overallHealth} size="sm" />
                  </div>
                  <p className="text-[11px] font-mono text-slate-500">PID: {p.aictePermanentId} • {p.region}</p>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/60 text-[10px] text-slate-500">
                    <span>Compliant: {p.compliantCount}/{p.totalObligations}</span>
                    <span className="font-bold text-slate-800">Score: {p.complianceScore}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Obligations Matrix (8 Cols) */}
        {activeProfile ? (
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {activeProfile.institutionName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    AICTE PID: <strong className="font-mono text-slate-700">{activeProfile.aictePermanentId}</strong> • Assigned Officer: {activeProfile.assignedOfficer}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Health Score</span>
                    <span className="text-xl font-black text-parikalp-primary">{activeProfile.complianceScore}%</span>
                  </div>
                  <StatusBadge status={activeProfile.overallHealth} size="lg" />
                </div>
              </div>

              {/* Obligations Table */}
              <div className="mt-4 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Mandatory Statutory Obligations:
                </span>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {activeProfile.obligations.map(ob => (
                    <div
                      key={ob.id}
                      className="p-3.5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{ob.title}</span>
                          <span className="text-[10px] text-slate-400">({ob.category})</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{ob.remarks}</p>
                        <div className="flex items-center gap-4 text-[10px] text-slate-400">
                          <span>Due Date: <strong className="text-slate-600">{ob.dueDate}</strong></span>
                          <span>Last Verified: {ob.lastVerifiedDate}</span>
                          {ob.fineApplicable && (
                            <span className="text-rose-600 font-bold">
                              Statutory Penalty Applicable
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                        <StatusBadge status={ob.status} size="sm" />
                        <button
                          onClick={() => handleToggleObligation(ob.id, ob.status)}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors"
                          title="Toggle compliance state"
                        >
                          {ob.status === 'OVERDUE' ? 'Mark Compliant' : 'Mark Deficient'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
            Select an institution from the roster.
          </div>
        )}
      </div>
    </div>
  );
};

