import React, { useState } from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { DecisionModal } from '../components/committee/DecisionModal';
import { ApprovalOrderModal } from '../components/shared/ApprovalOrderModal';
import { CommitteeReviewItem } from '../types/committee';
import { Application } from '../types/application';
import {
  Gavel,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  Users2,
  FileCheck,
} from 'lucide-react';

export const CommitteeReview: React.FC = () => {
  const { committeeReviews, applications } = useParikalpData();

  const [selectedReview, setSelectedReview] = useState<CommitteeReviewItem | null>(null);
  const [selectedAppForOrder, setSelectedAppForOrder] = useState<Application | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Standing Appellate Committee (SAC) & Standing Hearing Committee (SHC)
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Statutory Endorsement Authority</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Gavel className="w-6 h-6 text-purple-700" />
            SAC Committee Review & Final Approval Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Synthesize officer scrutiny findings, EVC inspection observations, and continuous institutional compliance records to record final regulatory decisions.
          </p>
        </div>
      </div>

      {/* Review Dossiers */}
      <div className="space-y-6">
        {committeeReviews.map(review => {
          const app = applications.find(
            a => a.id === review.applicationId || a.referenceNumber === review.applicationRef
          );

          return (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4"
            >
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-parikalp-primary">
                      {review.applicationRef}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-500 font-mono">
                      Meeting Ref: {review.meetingReference}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {review.institutionName}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Category: {review.category} • Committee: <strong>{review.committeeType}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={review.status} size="lg" />
                  {review.status === 'PENDING_DECISION' ? (
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <Gavel className="w-4 h-4" />
                      Record Decision
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedAppForOrder(app || null)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      View Official Order
                    </button>
                  )}
                </div>
              </div>

              {/* Multi-Dimensional Verification Assessment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase text-blue-800 block">
                    1. Scrutiny Clearance
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Completeness Score:</span>
                    <span className="font-bold text-blue-900 text-sm">{review.scrutinyScore}%</span>
                  </div>
                  <p className="text-[11px] text-blue-800 pt-1 border-t border-blue-100">
                    Title deeds and faculty roster authenticated.
                  </p>
                </div>

                <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase text-indigo-800 block">
                    2. EVC Inspection Score
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Physical Audit Score:</span>
                    <span className="font-bold text-indigo-900 text-sm">
                      {review.evcScore || 94}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-800 pt-1 border-t border-indigo-100 font-medium">
                    Rec: {review.evcRecommendation?.replace(/_/g, ' ') || 'Recommended'}
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 block">
                    3. Continuous Compliance
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Health Index:</span>
                    <span className="font-bold text-emerald-900 text-sm">
                      {review.complianceHealthScore}%
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800 pt-1 border-t border-emerald-100">
                    Anti-ragging squad & NBA norms certified.
                  </p>
                </div>
              </div>

              {/* Remarks & Committee Members */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div>
                  <span className="font-semibold text-slate-700 block">
                    Committee Synthesis & Recommendations:
                  </span>
                  <p className="text-slate-800 mt-0.5 leading-relaxed">
                    "{review.meetingRemarks || 'Pending final synthesis in scheduled meeting.'}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Meeting Date: <strong>{review.assignedMeetingDate}</strong></span>
                  <span className="truncate max-w-[400px]">
                    Members: {review.committeeMembers.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decision Modal */}
      <DecisionModal
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        reviewItem={selectedReview}
        onDecisionSuccess={() => {}}
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

