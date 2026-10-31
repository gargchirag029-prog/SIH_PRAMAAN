import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParikalpData } from '../context/ParikalpDataContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { DecisionModal } from '../components/committee/DecisionModal';
import { ApprovalOrderModal } from '../components/shared/ApprovalOrderModal';
import { CommitteeReviewItem } from '../types/committee';
import { Application } from '../types/application';
import { Link } from 'react-router-dom';
import {
  Gavel,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  FileCheck2,
  Users2,
  ArrowRight,
  TrendingUp,
  Download,
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { user } = useAuth();
  const { committeeReviews, applications, evcVisits, metrics } = useParikalpData();

  const [selectedReview, setSelectedReview] = useState<CommitteeReviewItem | null>(null);
  const [selectedAppForOrder, setSelectedAppForOrder] = useState<Application | null>(null);

  const pendingDecisions = committeeReviews.filter(r => r.status === 'PENDING_DECISION');
  const decidedItems = committeeReviews.filter(r => r.status === 'APPROVED' || r.status === 'REJECTED');

  return (
    <div className="space-y-6">
      {/* Admin Executive Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center flex-shrink-0">
            <Gavel className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                AICTE Executive Committee & SAC / SHC Panel
              </h2>
              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Headquarters New Delhi
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Presiding Officer: <strong className="text-slate-800">{user.name}</strong> ({user.designation}) • Regulatory Mandate: Standing Appellate Committee (SAC), final Letter of Approval (LOA) sanctions, and escalation policy governance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/committee"
            className="px-4 py-2 rounded-xl bg-parikalp-primary hover:bg-blue-800 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Gavel className="w-4 h-4" />
            Full Committee Workspace
          </Link>
        </div>
      </div>

      {/* KPI Grid for Executive Review */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            SAC Agenda Items Pending
          </span>
          <span className="text-2xl font-bold text-purple-700 mt-1 block">
            {pendingDecisions.length} Applications
          </span>
          <span className="text-xs text-slate-500 mt-2 block">
            Awaiting final statutory order
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            EVC Inspections Active
          </span>
          <span className="text-2xl font-bold text-indigo-700 mt-1 block">
            {evcVisits.length} Visits
          </span>
          <span className="text-xs text-slate-500 mt-2 block">
            Across 5 regional zones
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Total Granted (AY 2026-27)
          </span>
          <span className="text-2xl font-bold text-emerald-700 mt-1 block">
            {metrics.approvedCount} Approved
          </span>
          <span className="text-xs text-slate-500 mt-2 block">
            100% digital signature verified
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Compliance Escalations
          </span>
          <span className="text-2xl font-bold text-rose-700 mt-1 block">
            {metrics.pendingComplianceActions} Actions
          </span>
          <span className="text-xs text-slate-500 mt-2 block">
            SLA reminders automated
          </span>
        </div>
      </div>

      {/* SAC Committee Agenda & Decisions Queue */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Standing Appellate Committee (SAC) Pending Agenda
            </h3>
            <p className="text-xs text-slate-500">
              Applications having cleared Regional Scrutiny and EVC Inspection ready for final endorsement
            </p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            {pendingDecisions.length} Pending Decision
          </span>
        </div>

        <div className="space-y-4">
          {pendingDecisions.map(item => (
            <div
              key={item.id}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-parikalp-primary">
                    {item.applicationRef}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {item.institutionName}
                  </span>
                </div>
                <p className="text-slate-600 font-medium">Category: {item.category}</p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500">
                  <span>Scrutiny Score: <strong className="text-emerald-700">{item.scrutinyScore}%</strong></span>
                  <span>EVC Inspection Score: <strong className="text-indigo-700">{item.evcScore || 94}%</strong></span>
                  <span>EVC Recommendation: <strong className="text-slate-800">{item.evcRecommendation?.replace(/_/g, ' ')}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
                <button
                  onClick={() => setSelectedReview(item)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors text-xs"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  Record SAC Decision
                </button>
              </div>
            </div>
          ))}

          {pendingDecisions.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-xs">
              All SAC agenda items for the current session have been decided.
            </div>
          )}
        </div>
      </div>

      {/* Approved Decisions & Dispatched Orders Registry */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Approved Regulatory Orders Conveyed (AY 2026-27)
            </h3>
            <p className="text-xs text-slate-500">
              Officially issued AICTE Approval Orders with digital signatures and QR seals
            </p>
          </div>
          <Link
            to="/compliance"
            className="text-xs text-parikalp-primary font-semibold hover:underline flex items-center gap-1"
          >
            Monitor Compliance Continuous <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Order Number</th>
                <th className="py-2.5 px-3">Institution</th>
                <th className="py-2.5 px-3">Decision Date</th>
                <th className="py-2.5 px-3">Endorsed By</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-right">Official Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {decidedItems.map(item => {
                const app = applications.find(a => a.id === item.applicationId || a.referenceNumber === item.applicationRef);
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-emerald-800">
                      {item.finalApprovalOrderNumber || 'Order Dispatched'}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {item.institutionName}
                    </td>
                    <td className="py-3 px-3 text-slate-600">{item.decidedAt || '2026-10-27'}</td>
                    <td className="py-3 px-3 text-slate-700">{item.decidedBy || 'Prof. Anil Sahasrabudhe'}</td>
                    <td className="py-3 px-3 text-center">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedAppForOrder(app || null)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold inline-flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        View Order
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision Modal */}
      <DecisionModal
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        reviewItem={selectedReview}
      />

      {/* Approval Order Modal */}
      <ApprovalOrderModal
        isOpen={!!selectedAppForOrder}
        onClose={() => setSelectedAppForOrder(null)}
        application={selectedAppForOrder}
      />
    </div>
  );
};

