import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParikalpData } from '../context/ParikalpDataContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { DocumentViewerModal } from '../components/shared/DocumentViewerModal';
import { ApprovalOrderModal } from '../components/shared/ApprovalOrderModal';
import { DocumentRecord } from '../types/document';
import { Application } from '../types/application';
import { applicationService } from '../services/applicationService';
import { documentService } from '../services/documentService';
import { useNotification } from '../context/NotificationContext';
import { Link } from 'react-router-dom';
import {
  Building2,
  FilePlus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Download,
  Eye,
  FileText,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';

export const InstitutionPortal: React.FC = () => {
  const { user } = useAuth();
  const { applications, documents, complianceProfiles, refreshData } = useParikalpData();
  const { showToast } = useNotification();

  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const [selectedAppForOrder, setSelectedAppForOrder] = useState<Application | null>(null);
  const [isUploadingCorrection, setIsUploadingCorrection] = useState(false);
  const [correctionNote, setCorrectionNote] = useState('');

  // Find institution's active application (e.g. app-001)
  const myApplications = applications.filter(
    a => a.institutionName === user.institutionName || a.institutionId === user.institutionId
  );
  const activeApp = myApplications[0] || applications[0];

  const myDocs = documents.filter(
    d => d.institutionName === (user.institutionName || activeApp.institutionName)
  );

  const myCompliance = complianceProfiles.find(
    p => p.institutionName === (user.institutionName || activeApp.institutionName)
  );

  // Workflow stages tracking
  const stages = [
    { id: 'SUBMISSION', label: '1. Submitted', done: true },
    {
      id: 'SCRUTINY',
      label: '2. Scrutiny',
      done: activeApp.status !== 'SUBMITTED',
      current: activeApp.currentStage === 'SCRUTINY' || activeApp.currentStage === 'RE_SCRUTINY',
      alert: activeApp.status === 'DISCREPANCY_RAISED',
    },
    {
      id: 'EVC',
      label: '3. EVC Inspection',
      done: ['EVC_COMPLETED', 'COMMITTEE_REVIEW', 'APPROVED'].includes(activeApp.status),
      current: activeApp.currentStage === 'EVC',
    },
    {
      id: 'COMMITTEE',
      label: '4. Committee (SAC)',
      done: activeApp.status === 'APPROVED',
      current: activeApp.currentStage === 'COMMITTEE',
    },
    {
      id: 'DECISION',
      label: '5. Regulatory Order',
      done: activeApp.status === 'APPROVED',
      current: activeApp.status === 'APPROVED',
    },
  ];

  // Handler for uploading corrected document in response to discrepancy (Step 8 of workflow)
  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Replace the expired fire safety certificate with renewed certificate
    const expiredDoc = myDocs.find(d => d.category === 'Fire & Life Safety Certificate');
    if (expiredDoc) {
      documentService.replaceDocument(
        expiredDoc.id,
        'Delhi_Fire_Service_NOC_Renewed_2026_2027.pdf',
        '2026-10-31',
        '2027-10-30'
      );
    }

    // 2. Respond to discrepancy in application service (moves to RE_SCRUTINY_PENDING)
    applicationService.respondToDiscrepancy(
      activeApp.id,
      correctionNote || 'Renewed Delhi Fire Service NOC valid through October 2027 uploaded with test compliance certificate.'
    );

    refreshData();
    showToast(
      'success',
      'Corrected Document Submitted',
      'Renewed Fire NOC uploaded. Application queued for Officer Re-Scrutiny.'
    );
    setIsUploadingCorrection(false);
    setCorrectionNote('');
  };

  return (
    <div className="space-y-6">
      {/* 1. Institution Identity Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-parikalp-lightblue text-parikalp-primary border border-blue-200 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {activeApp.institutionName}
              </h2>
              <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                {activeApp.institutionType}
              </span>
              <span className="bg-slate-100 text-slate-700 font-mono text-xs px-2.5 py-0.5 rounded-full">
                PID: {activeApp.aictePermanentId}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Affiliated Region: <strong className="text-slate-700">{activeApp.region}</strong> • State: <strong className="text-slate-700">{activeApp.state}</strong> • Contact: {activeApp.contactPerson.name} ({activeApp.contactPerson.designation})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <Link
            to="/submit-application"
            className="px-4 py-2 rounded-xl bg-parikalp-primary hover:bg-blue-800 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <FilePlus className="w-4 h-4" />
            New Application
          </Link>
        </div>
      </div>

      {/* 2. Active Application Lifecycle Stepper */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Application Tracker • Academic Year 2026-27
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {activeApp.category} (Ref: {activeApp.referenceNumber})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Current Status:</span>
            <StatusBadge status={activeApp.status} size="lg" />
          </div>
        </div>

        {/* 5-Stage Visual Workflow Stepper */}
        <div className="relative mb-6">
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
            {stages.map((stage, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                  stage.alert
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30'
                    : stage.done
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : stage.current
                    ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-400/30'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 ${
                    stage.alert
                      ? 'bg-amber-500 text-white'
                      : stage.done
                      ? 'bg-emerald-600 text-white'
                      : stage.current
                      ? 'bg-parikalp-primary text-white animate-pulse'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {stage.alert ? '!' : stage.done ? '✓' : idx + 1}
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {stage.label}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  {stage.alert
                    ? 'Discrepancy'
                    : stage.done
                    ? 'Completed'
                    : stage.current
                    ? 'In Progress'
                    : 'Upcoming'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Discrepancy Action Box (STEP 8 of WORKFLOW) */}
        {activeApp.status === 'DISCREPANCY_RAISED' && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 mb-6 text-amber-950">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-amber-900">
                    Action Required: Rectify Document Discrepancy Raised by Scrutiny Committee
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    Remarks from Dr. R. K. Soni (Regional Officer):{' '}
                    <strong className="text-amber-950 underline">
                      "{activeApp.scrutinyRemarks}"
                    </strong>
                  </p>
                  <p className="text-[11px] text-amber-700 mt-1">
                    Please upload the renewed Fire Safety Certificate for 2026-27 to advance to
                    Re-Scrutiny & EVC scheduling.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsUploadingCorrection(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm flex-shrink-0 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Rectified Document
              </button>
            </div>

            {/* In-line Rectification Upload Form */}
            {isUploadingCorrection && (
              <form
                onSubmit={handleCorrectionSubmit}
                className="mt-4 pt-4 border-t border-amber-200/80 bg-white/70 p-4 rounded-lg space-y-3"
              >
                <h5 className="font-bold text-xs text-slate-900">
                  Submit Discrepancy Response & Replacement Document:
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Target File:
                    </label>
                    <div className="border border-slate-300 bg-white rounded p-2 text-slate-800 font-mono text-[11px]">
                      Delhi_Fire_Service_NOC_Renewed_2026_2027.pdf (Ready)
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Certificate Renewal Period:
                    </label>
                    <div className="border border-slate-300 bg-white rounded p-2 text-slate-800 text-[11px]">
                      Valid Through: 30-Oct-2027 (Active)
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Institutional Response / Rectification Note:
                  </label>
                  <textarea
                    rows={2}
                    value={correctionNote}
                    onChange={e => setCorrectionNote(e.target.value)}
                    required
                    placeholder="Provide details regarding the renewed certificate and regulatory submission..."
                    className="w-full border border-slate-300 rounded p-2 text-xs bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsUploadingCorrection(false)}
                    className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit to Regional Office
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* If Application is Approved - Show Download Official LOA Banner */}
        {activeApp.status === 'APPROVED' && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5 mb-6 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-emerald-900">
                  Congratulations! Approval Order Conveyed for Academic Year 2026-27
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Order Number: <strong className="font-mono">{activeApp.approvalLetterNumber || 'F.No. AICTE/AB/2026/LOA-849201'}</strong> • Digital signature verified.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAppForOrder(activeApp)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              View & Print Approval Order
            </button>
          </div>
        )}

        {/* Application Details Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 block">Demarcated Land:</span>
            <span className="font-bold text-slate-800">{activeApp.landAreaAcres} Acres</span>
          </div>
          <div>
            <span className="text-slate-500 block">Built-up Area:</span>
            <span className="font-bold text-slate-800">{activeApp.builtUpAreaSqMeters.toLocaleString()} Sq.M.</span>
          </div>
          <div>
            <span className="text-slate-500 block">Faculty Roster:</span>
            <span className="font-bold text-slate-800">{activeApp.totalFacultyCount} Members ({activeApp.studentFacultyRatio})</span>
          </div>
          <div>
            <span className="text-slate-500 block">Assigned Scrutiny Officer:</span>
            <span className="font-bold text-slate-800">{activeApp.assignedOfficerName || 'Regional Officer'}</span>
          </div>
        </div>
      </div>

      {/* 3. Supporting Documents Repository */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Institutional Document Dossier & Vault
            </h3>
            <p className="text-xs text-slate-500">
              Encrypted statutory documents submitted for approval verification
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            {myDocs.length} Documents Uploaded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Document Category</th>
                <th className="py-2.5 px-3">File Name</th>
                <th className="py-2.5 px-3">Issue Date</th>
                <th className="py-2.5 px-3">Expiry Horizon</th>
                <th className="py-2.5 px-3 text-center">Validity</th>
                <th className="py-2.5 px-3 text-center">Verification</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900">{doc.category}</td>
                  <td className="py-3 px-3 font-mono text-slate-600 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="truncate max-w-[200px]">{doc.fileName}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{doc.issueDate}</td>
                  <td className="py-3 px-3 text-slate-600">{doc.expiryDate || 'Perpetual'}</td>
                  <td className="py-3 px-3 text-center">
                    <StatusBadge status={doc.validityStatus} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <StatusBadge status={doc.verificationStatus} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="px-2.5 py-1 text-[11px] font-medium text-parikalp-primary bg-parikalp-lightblue hover:bg-blue-100 rounded-md transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Inspect Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        document={selectedDoc}
      />

      {/* Official Approval Order Modal */}
      <ApprovalOrderModal
        isOpen={!!selectedAppForOrder}
        onClose={() => setSelectedAppForOrder(null)}
        application={selectedAppForOrder}
      />
    </div>
  );
};

