import React from 'react';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { ShieldCheck, AlertTriangle, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComplianceWidget: React.FC = () => {
  const { complianceProfiles, documents } = useParikalpData();

  const totalDocs = documents.length;
  const validDocs = documents.filter(d => d.validityStatus === 'VALID').length;
  const expiringSoonDocs = documents.filter(d => d.validityStatus === 'EXPIRING_SOON').length;
  const expiredDocs = documents.filter(d => d.validityStatus === 'EXPIRED').length;

  const overdueObligations = complianceProfiles.reduce((acc, p) => acc + p.overdueCount, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Continuous Compliance Health
              </h3>
              <p className="text-xs text-slate-500">Post-approval statutory monitoring</p>
            </div>
          </div>
          <Link
            to="/compliance"
            className="text-xs text-parikalp-primary font-semibold hover:underline flex items-center gap-1"
          >
            Full Matrix <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Numbers Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-emerald-50/70 border border-emerald-200/80 p-3 rounded-lg text-center">
            <span className="text-[10px] font-semibold text-emerald-800 uppercase block">Valid Docs</span>
            <span className="text-xl font-bold text-emerald-700">{validDocs}</span>
            <span className="text-[10px] text-emerald-600 block">Verified Active</span>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-lg text-center">
            <span className="text-[10px] font-semibold text-amber-800 uppercase block">Expiring Soon</span>
            <span className="text-xl font-bold text-amber-700">{expiringSoonDocs}</span>
            <span className="text-[10px] text-amber-600 block">&lt; 90 Days SLA</span>
          </div>

          <div className="bg-rose-50/70 border border-rose-200/80 p-3 rounded-lg text-center">
            <span className="text-[10px] font-semibold text-rose-800 uppercase block">Overdue Action</span>
            <span className="text-xl font-bold text-rose-700">{expiredDocs + overdueObligations}</span>
            <span className="text-[10px] text-rose-600 block">Notice Issued</span>
          </div>
        </div>

        {/* Critical Attention List */}
        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-100 flex items-start gap-2 text-rose-900">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="font-semibold block truncate">Fire Safety NOC Expired</span>
              <span className="text-[11px] text-rose-700">Delhi Institute of Advanced Tech • Discrepancy Active</span>
            </div>
          </div>

          <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-100 flex items-start gap-2 text-amber-900">
            <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="font-semibold block truncate">FDR Joint Deposit Maturity</span>
              <span className="text-[11px] text-amber-700">Maturity within 9 months • Lien renewal notice dispatched</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Continuous Compliance: <strong>Automated Cron Active</strong></span>
        <span className="text-emerald-600 font-semibold">Zero Fraud Tolerance</span>
      </div>
    </div>
  );
};

