import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { EVCVisit } from '../../types/evc';
import { evcService } from '../../services/evcService';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useNotification } from '../../context/NotificationContext';
import { FileCheck, Camera, CheckSquare, Award, Send } from 'lucide-react';

interface EVCReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: EVCVisit | null;
}

export const EVCReportModal: React.FC<EVCReportModalProps> = ({
  isOpen,
  onClose,
  visit,
}) => {
  const { refreshData } = useParikalpData();
  const { showToast } = useNotification();

  const [overallScore, setOverallScore] = useState(91);
  const [recommendation, setRecommendation] = useState<
    'RECOMMENDED_FOR_APPROVAL' | 'RECOMMENDED_WITH_CONDITIONS' | 'NOT_RECOMMENDED'
  >('RECOMMENDED_FOR_APPROVAL');
  const [geotaggedCount, setGeotaggedCount] = useState(18);
  const [videoVerified, setVideoVerified] = useState(true);
  const [summary, setSummary] = useState(
    'The committee physically inspected the classrooms, dedicated research laboratories, computing clusters, and verified Form-16 bio-records of all faculty members. Infrastructure meets AICTE Approval Process Handbook (APH) 2026-27 benchmarks.'
  );

  if (!visit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    evcService.submitReport(visit.id, {
      submittedBy: visit.committeeMembers[0]?.name || 'EVC Chairman',
      overallScore,
      recommendation,
      observations: [
        {
          parameter: 'Laboratory Facilities & Instructional Equipment',
          requirement: 'Adequate computing terminals & specialized labs',
          observed: 'State of the art lab setup verified with calibrated instruments',
          status: 'COMPLIANT',
          scoreOutOf10: 9.5,
          remarks: 'Satisfies intake expansion norms.',
        },
        {
          parameter: 'Faculty Cadre Ratio & Physical Verification',
          requirement: 'Form 16 match & Biometric logs present',
          observed: 'All faculty members personally interviewed and authenticated',
          status: 'COMPLIANT',
          scoreOutOf10: 9.0,
          remarks: 'Cadre ratio compliant.',
        },
        {
          parameter: 'Built-up Area & Safety Compliance',
          requirement: 'Unobstructed fire stairwells & barrier free access',
          observed: 'Ramps, lifts and wet risers functional and documented',
          status: 'COMPLIANT',
          scoreOutOf10: 9.0,
          remarks: 'Good maintenance.',
        },
      ],
      infrastructureDeficiencies: [],
      facultyDeficiencies: [],
      geotaggedPhotosCount: geotaggedCount,
      videoRecordingVerified: videoVerified,
      finalSummary: summary,
    });

    refreshData();
    showToast(
      'success',
      'EVC Inspection Report Submitted',
      `Inspection report submitted with score ${overallScore}/100. Forwarded to SAC / SHC Committee Review.`
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Expert Visit Committee (EVC) Inspection Dossier"
      subtitle={`Application: ${visit.applicationRef} • ${visit.institutionName}`}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Verification Evidence Checklist */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-2">
          <span className="font-bold text-slate-800 text-xs block">
            Digital Inspection Evidence Check:
          </span>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <div>
                <span className="font-medium text-slate-700 block">Geotagged Photographs:</span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {geotaggedCount} Latitude/Longitude Tagged Images Uploaded
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div>
                <span className="font-medium text-slate-700 block">360° Video Recording:</span>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  Continuous uncut footage archived in private S3 bucket
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Score & Recommendation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Overall Infrastructure & Faculty Composite Score (Out of 100):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={100}
                value={overallScore}
                onChange={e => setOverallScore(Number(e.target.value))}
                required
                className="w-24 border border-slate-300 rounded-lg p-2 bg-white text-base font-bold text-slate-900 focus:ring-2 focus:ring-parikalp-primary"
              />
              <span className="text-xs text-slate-500">
                (Min 75 required for expansion/approval)
              </span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Committee Regulatory Recommendation:
            </label>
            <select
              value={recommendation}
              onChange={e => setRecommendation(e.target.value as any)}
              className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-semibold focus:ring-2 focus:ring-parikalp-primary"
            >
              <option value="RECOMMENDED_FOR_APPROVAL">
                RECOMMENDED FOR APPROVAL (Clear Title & Adequate Infrastructure)
              </option>
              <option value="RECOMMENDED_WITH_CONDITIONS">
                RECOMMENDED WITH CONDITIONS (Minor Rectifications in 30 Days)
              </option>
              <option value="NOT_RECOMMENDED">
                NOT RECOMMENDED (Substantial Deficiencies Found)
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Committee Observations & Final Synthesis:
          </label>
          <textarea
            rows={4}
            value={summary}
            onChange={e => setSummary(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
          />
        </div>

        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-500">
          <span className="flex items-center gap-1.5 text-[11px]">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Signed by Chairman & 2 Subject Experts
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
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Endorse & Submit EVC Report
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

