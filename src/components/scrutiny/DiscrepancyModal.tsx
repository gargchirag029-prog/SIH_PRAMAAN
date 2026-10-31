import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Application } from '../../types/application';
import { AlertTriangle, Send, Bell } from 'lucide-react';
import { applicationService } from '../../services/applicationService';
import { alertService } from '../../services/alertService';
import { useNotification } from '../../context/NotificationContext';
import { useParikalpData } from '../../context/ParikalpDataContext';

interface DiscrepancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

export const DiscrepancyModal: React.FC<DiscrepancyModalProps> = ({
  isOpen,
  onClose,
  application,
}) => {
  const { showToast } = useNotification();
  const { refreshData } = useParikalpData();

  const [discrepancyText, setDiscrepancyText] = useState('');
  const [targetCategory, setTargetCategory] = useState('Fire & Life Safety Certificate');
  const [responseDeadlineDays, setResponseDeadlineDays] = useState(7);
  const [sendSms, setSendSms] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);

  if (!application) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discrepancyText.trim()) return;

    // 1. Raise discrepancy in application
    applicationService.raiseDiscrepancy(application.id, discrepancyText);

    // 2. Generate Real-time Alert for Institution and Scrutiny Officer
    const dueDate = new Date(Date.now() + responseDeadlineDays * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    alertService.create(
      `Discrepancy Raised: ${targetCategory}`,
      discrepancyText,
      'RE_SCRUTINY_PENDING',
      'HIGH',
      application.institutionName,
      application.assignedOfficerName || 'Regional Officer',
      dueDate,
      application.referenceNumber
    );

    refreshData();
    showToast(
      'warning',
      'Discrepancy Notice Issued',
      `Official discrepancy notice recorded for ${application.institutionName}. Alert and notifications triggered.`
    );
    setDiscrepancyText('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Issue Official Regulatory Discrepancy Notice"
      subtitle={`Application: ${application.referenceNumber} • ${application.institutionName}`}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-xs">Statutory Rectification Notice</p>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Issuing a discrepancy temporarily halts approval progression and moves the application
              to <strong className="text-amber-950">Discrepancy Raised</strong> status. The institution
              will be notified immediately with an enforceable rectification deadline.
            </p>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Deficient Document / Parameter Category:
          </label>
          <select
            value={targetCategory}
            onChange={e => setTargetCategory(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary focus:border-parikalp-primary"
          >
            <option value="Fire & Life Safety Certificate">Fire & Life Safety Certificate (Renewal Required)</option>
            <option value="Land Document & Lease Deed">Land Document & Lease Deed (Encumbrance / Demarcation)</option>
            <option value="Building Approval & Structural Stability">Building Approval & Structural Stability</option>
            <option value="Occupancy / Completion Certificate">Occupancy / Completion Certificate</option>
            <option value="Faculty Cadre Ratio & Form 16">Faculty Cadre Ratio & Biometric Attendance</option>
            <option value="Endowment Fund / FDR Certificate">Endowment Fund / Joint FDR Certificate</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Official Discrepancy Remarks & Rectification Directive:
          </label>
          <textarea
            rows={4}
            value={discrepancyText}
            onChange={e => setDiscrepancyText(e.target.value)}
            required
            placeholder="Specify precise regulatory defect, citation under AICTE Approval Process Handbook (APH 2026-27), and required corrective action..."
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary focus:border-parikalp-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Rectification Window:
            </label>
            <select
              value={responseDeadlineDays}
              onChange={e => setResponseDeadlineDays(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
            >
              <option value={3}>3 Calendar Days (Urgent)</option>
              <option value={7}>7 Calendar Days (Standard)</option>
              <option value={14}>14 Calendar Days (Extended)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Escalation SLA Trigger:
            </label>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600">
              Auto-escalates to Regional Director upon deadline lapse.
            </div>
          </div>
        </div>

        {/* Multi-channel alert dispatch options */}
        <div className="pt-2 border-t border-slate-200">
          <p className="font-semibold text-slate-700 mb-2">Automated Dispatch Channels:</p>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={e => setSendEmail(e.target.checked)}
                className="rounded border-slate-300 text-parikalp-primary focus:ring-parikalp-primary"
              />
              <span className="text-slate-700">Official Registrar Email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sendSms}
                onChange={e => setSendSms(e.target.checked)}
                className="rounded border-slate-300 text-parikalp-primary focus:ring-parikalp-primary"
              />
              <span className="text-slate-700">SMS Gateway Dispatch</span>
            </label>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            Dispatch Discrepancy Notice
          </button>
        </div>
      </form>
    </Modal>
  );
};

