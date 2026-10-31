import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { CommitteeReviewItem, CommitteeDecision } from '../../types/committee';
import { committeeService } from '../../services/committeeService';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useNotification } from '../../context/NotificationContext';
import { Gavel, CheckCircle2, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewItem: CommitteeReviewItem | null;
  onDecisionSuccess?: (orderNum?: string) => void;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({
  isOpen,
  onClose,
  reviewItem,
  onDecisionSuccess,
}) => {
  const { refreshData } = useParikalpData();
  const { showToast } = useNotification();

  const [decision, setDecision] = useState<CommitteeDecision>('APPROVED');
  const [remarks, setRemarks] = useState(
    'Based on satisfactory scrutiny clearance, verified land/building title deeds, and outstanding EVC inspection score (94/100), the Standing Appellate Committee hereby recommends grant of approval for AY 2026-27.'
  );
  const [condition1, setCondition1] = useState('Maintain student-faculty cadre ratio of 1:15 without default.');
  const [condition2, setCondition2] = useState('Submit annual compliance return before 31st March 2027.');

  if (!reviewItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const conditions = decision === 'APPROVED' ? [condition1, condition2].filter(Boolean) : [remarks];

    const updated = committeeService.recordDecision(
      reviewItem.id,
      decision,
      remarks,
      conditions
    );

    refreshData();

    if (decision === 'APPROVED') {
      // Trigger festive confetti celebration for regulatory grant!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1456A0', '#16A36A', '#FF9933'],
        });
      } catch (err) {
        // silent fallback
      }

      showToast(
        'success',
        'Official Approval Order Issued!',
        `Approval granted to ${reviewItem.institutionName}. Official Order No: ${updated?.finalApprovalOrderNumber}. Continuous compliance monitoring active.`
      );
      if (onDecisionSuccess) onDecisionSuccess(updated?.finalApprovalOrderNumber);
    } else if (decision === 'REJECTED') {
      showToast(
        'error',
        'Application Rejected',
        `Rejection order recorded for ${reviewItem.institutionName}. Reasons logged in immutable audit trail.`
      );
    } else {
      showToast(
        'warning',
        'Returned for Clarification',
        `Application returned to Scrutiny Committee for further inquiry.`
      );
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Final SAC / SHC Committee Regulatory Decision"
      subtitle={`Application: ${reviewItem.applicationRef} • ${reviewItem.institutionName}`}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Verification Summary Snapshot */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200 p-3 rounded-lg text-center">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Scrutiny Score</span>
            <span className="text-base font-bold text-emerald-700">{reviewItem.scrutinyScore}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">EVC Score</span>
            <span className="text-base font-bold text-indigo-700">{reviewItem.evcScore || 94}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Compliance Health</span>
            <span className="text-base font-bold text-blue-700">{reviewItem.complianceHealthScore}%</span>
          </div>
        </div>

        {/* Decision Selection Cards */}
        <div>
          <label className="block font-semibold text-slate-800 mb-2">
            Select Regulatory Disposition:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <label
              className={`p-3 rounded-lg border cursor-pointer flex flex-col justify-between transition-all ${
                decision === 'APPROVED'
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/40 text-emerald-950 font-semibold'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs">Grant Approval</span>
                <CheckCircle2 className={`w-4 h-4 ${decision === 'APPROVED' ? 'text-emerald-600' : 'text-slate-400'}`} />
              </div>
              <p className="text-[10px] text-slate-500 font-normal leading-tight">
                Issues official LOA / EOA with digital security seal.
              </p>
              <input
                type="radio"
                name="decision"
                value="APPROVED"
                checked={decision === 'APPROVED'}
                onChange={() => setDecision('APPROVED')}
                className="sr-only"
              />
            </label>

            <label
              className={`p-3 rounded-lg border cursor-pointer flex flex-col justify-between transition-all ${
                decision === 'RETURNED_FOR_CLARIFICATION'
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/40 text-amber-950 font-semibold'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs">Return for Clarification</span>
                <RotateCcw className={`w-4 h-4 ${decision === 'RETURNED_FOR_CLARIFICATION' ? 'text-amber-600' : 'text-slate-400'}`} />
              </div>
              <p className="text-[10px] text-slate-500 font-normal leading-tight">
                Send back to Regional Officer for re-scrutiny.
              </p>
              <input
                type="radio"
                name="decision"
                value="RETURNED_FOR_CLARIFICATION"
                checked={decision === 'RETURNED_FOR_CLARIFICATION'}
                onChange={() => setDecision('RETURNED_FOR_CLARIFICATION')}
                className="sr-only"
              />
            </label>

            <label
              className={`p-3 rounded-lg border cursor-pointer flex flex-col justify-between transition-all ${
                decision === 'REJECTED'
                  ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-400/40 text-rose-950 font-semibold'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs">Reject Application</span>
                <XCircle className={`w-4 h-4 ${decision === 'REJECTED' ? 'text-rose-600' : 'text-slate-400'}`} />
              </div>
              <p className="text-[10px] text-slate-500 font-normal leading-tight">
                Formal rejection with appealable legal grounds.
              </p>
              <input
                type="radio"
                name="decision"
                value="REJECTED"
                checked={decision === 'REJECTED'}
                onChange={() => setDecision('REJECTED')}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {/* Official Remarks */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Committee Resolution & Statutory Remarks:
          </label>
          <textarea
            rows={3}
            value={remarks}
            onChange={e => setRemarks(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
          />
        </div>

        {/* Conditions Imposed for Approval */}
        {decision === 'APPROVED' && (
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="block font-semibold text-slate-700">
              Conditions Imposed in Official Approval Order:
            </label>
            <input
              type="text"
              value={condition1}
              onChange={e => setCondition1(e.target.value)}
              placeholder="Condition 1"
              className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs"
            />
            <input
              type="text"
              value={condition2}
              onChange={e => setCondition2(e.target.value)}
              placeholder="Condition 2"
              className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs"
            />
          </div>
        )}

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Authorized by: <strong>Prof. Anil Sahasrabudhe (Chairman SAC)</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-1.5 rounded-lg text-white font-semibold flex items-center gap-1.5 shadow-sm ${
                decision === 'APPROVED'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : decision === 'REJECTED'
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              <Gavel className="w-3.5 h-3.5" />
              Endorse Formal Regulatory Order
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

