import React, { useState } from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import { useNotification } from '../context/NotificationContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { DocumentViewerModal } from '../components/shared/DocumentViewerModal';
import { BeforeAfterInspectionSlider } from '../components/shared/BeforeAfterInspectionSlider';
import { DocumentRecord } from '../types/document';
import { DocumentVerificationReport, AIVerificationStatus } from '../types/verification';
import { verificationService } from '../services/verificationService';
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Sparkles,
  Lock,
  Cpu,
  Layers,
  Search,
  Scan,
} from 'lucide-react';

export const DocumentVerification: React.FC = () => {
  const { documents, verifications, refreshData } = useParikalpData();
  const { showToast } = useNotification();

  const [selectedReportId, setSelectedReportId] = useState<string>(
    verifications[0]?.id || ''
  );
  const activeReport = verifications.find(r => r.id === selectedReportId) || verifications[0];
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<DocumentRecord | null>(null);

  const [officerRemarks, setOfficerRemarks] = useState(activeReport?.officerRemarks || '');

  const associatedDoc = documents.find(d => d.id === activeReport?.documentId);

  const handleOfficerDecision = (decision: 'VERIFIED_OK' | 'DISCREPANCY_RAISED' | 'REJECTED') => {
    if (!activeReport) return;
    verificationService.submitOfficerReview(
      activeReport.id,
      decision,
      officerRemarks || `Officer reviewed AI extraction and recorded decision: ${decision}`
    );
    refreshData();
    showToast(
      decision === 'VERIFIED_OK' ? 'success' : 'warning',
      'Officer Review Recorded',
      `Document verification decision "${decision}" recorded in statutory audit log.`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Core Technical Innovation • AICTE PARIKALP
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Document Intelligence & Forensic Screening</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-parikalp-primary" />
            AI-Assisted Document Verification Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Automated text extraction, metadata cross-checking, layout anomaly inspection, and tampering detection. AI provides intelligent screening assistance; officers retain final regulatory decision authority.
          </p>
        </div>

        {/* Regulatory Governance Rule Box */}
        <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl text-[11px] text-amber-900 max-w-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>AICTE Governance Rule:</strong> Tampering indicators are screening signals to guide officer scrutiny, not legal proof of fraud. Final decision remains with authorized officers.
          </span>
        </div>
      </div>

      {/* Verification Pipeline Visualizer */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 border border-slate-800 shadow-card">
        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-3">
          Automated Processing Pipeline:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-xs">
          {[
            { step: '1. Ingestion', desc: 'Secure S3 Vault', done: true },
            { step: '2. Classification', desc: 'Category Match', done: true },
            { step: '3. Layout Check', desc: 'Header & Margins', done: true },
            { step: '4. Information Extr.', desc: 'OCR & Regex', done: true },
            { step: '5. Completeness', desc: 'Mandatory Norms', done: true },
            { step: '6. Tampering Check', desc: 'Raster Analysis', done: true },
            { step: '7. Officer Scrutiny', desc: 'Regulatory Review', done: false, active: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-between ${
                item.active
                  ? 'bg-parikalp-primary/40 border-sky-400 text-white ring-2 ring-sky-400/40'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
            >
              <span className="text-[11px] font-bold">{item.step}</span>
              <span className="text-[9px] text-slate-400 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Verification Inspection Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Document Selection Queue (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Analyzed Dossiers Queue ({verifications.length})
            </h3>

            <div className="space-y-2">
              {verifications.map(rep => (
                <button
                  key={rep.id}
                  onClick={() => {
                    setSelectedReportId(rep.id);
                    setOfficerRemarks(rep.officerRemarks || '');
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                    activeReport?.id === rep.id
                      ? 'bg-parikalp-lightblue/70 border-parikalp-primary ring-2 ring-blue-300/40 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900 truncate max-w-[170px]">
                      {rep.category}
                    </span>
                    <StatusBadge status={rep.overallStatus} size="sm" />
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 truncate">
                    {rep.documentName}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200/60 text-[10px] text-slate-500">
                    <span>{rep.institutionName.slice(0, 20)}...</span>
                    <span className="font-semibold text-blue-700">
                      AI: {rep.aiConfidenceScore}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Forensic Report & Inspection (8 Cols) */}
        {activeReport ? (
          <div className="lg:col-span-8 space-y-6">
            {/* Report Header Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-parikalp-primary">
                      {activeReport.applicationRef}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-700">
                      {activeReport.institutionName}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {activeReport.category}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">
                    File: {activeReport.documentName} • Processed: {activeReport.analysisTimestamp}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={activeReport.overallStatus} size="lg" />
                  {associatedDoc && (
                    <button
                      onClick={() => setSelectedDocForPreview(associatedDoc)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Original
                    </button>
                  )}
                </div>
              </div>

              {/* Confidence & Tampering Indicator Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl">
                  <span className="text-[10px] font-bold uppercase text-blue-800 block">
                    AI OCR Match Confidence
                  </span>
                  <span className="text-2xl font-black text-blue-900 mt-1 block">
                    {activeReport.aiConfidenceScore}%
                  </span>
                  <span className="text-[10px] text-blue-700 mt-0.5 block">
                    Word Count: {activeReport.ocrWordCount} words parsed
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border ${
                    activeReport.tamperingDetected
                      ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                      : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase block">
                    Tampering Screening
                  </span>
                  <span className="text-xl font-black mt-1 block">
                    {activeReport.tamperingDetected ? 'Flagged Anomalies' : 'Authentic Layout'}
                  </span>
                  <span className="text-[10px] block mt-0.5">
                    Confidence: {activeReport.tamperingConfidence}%
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-bold uppercase text-slate-600 block">
                    Officer Decision
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {activeReport.officerDecision.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Reviewer: {activeReport.reviewedByOfficer || 'Pending Review'}
                  </span>
                </div>
              </div>

              {/* Tampering Indicators if Detected */}
              {activeReport.tamperingDetected && activeReport.tamperingIndicators.length > 0 && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2 mb-4">
                  <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Potential Digital Tampering Screening Signals:
                  </span>
                  {activeReport.tamperingIndicators.map((ind, i) => (
                    <div key={i} className="text-xs text-rose-800 space-y-0.5 pl-5">
                      <p className="font-semibold">• {ind.indicator} (Severity: {ind.severity})</p>
                      <p className="text-[11px] text-rose-700">{ind.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Extracted Fields Comparison Table */}
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-2">
                  Extracted Metadata vs Statutory Norms:
                </span>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[10px] uppercase">
                      <tr>
                        <th className="py-2.5 px-3">Field Name</th>
                        <th className="py-2.5 px-3">Regulatory Expectation</th>
                        <th className="py-2.5 px-3">Extracted Value</th>
                        <th className="py-2.5 px-3 text-center">Confidence</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeReport.extractedFields.map((field, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-2.5 px-3 font-semibold text-slate-800">
                            {field.fieldName}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                            {field.expectedValue || 'APH Benchmarks'}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-900">
                            {field.extractedValue}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono text-[11px] text-slate-600">
                            {field.confidence}%
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                field.matchStatus === 'MATCH'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : field.matchStatus === 'PARTIAL'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {field.matchStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Officer Verification Action Block */}
              <div className="mt-6 pt-4 border-t border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Officer Final Determination:
                </span>
                <textarea
                  rows={2}
                  value={officerRemarks}
                  onChange={e => setOfficerRemarks(e.target.value)}
                  placeholder="Enter officer validation notes or justification for discrepancy..."
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs bg-white focus:ring-2 focus:ring-parikalp-primary"
                />

                <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
                  <button
                    onClick={() => handleOfficerDecision('REJECTED')}
                    className="px-4 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
                  >
                    Reject Document
                  </button>
                  <button
                    onClick={() => handleOfficerDecision('DISCREPANCY_RAISED')}
                    className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                  >
                    Raise Discrepancy
                  </button>
                  <button
                    onClick={() => handleOfficerDecision('VERIFIED_OK')}
                    className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                  >
                    Endorse Verification OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500">
            Select a document report from the left queue to view forensic analysis.
          </div>
        )}
      </div>

      {/* Forensic Visual Inspection Slider */}
      <BeforeAfterInspectionSlider />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={!!selectedDocForPreview}
        onClose={() => setSelectedDocForPreview(null)}
        document={selectedDocForPreview}
        verificationReport={activeReport}
      />
    </div>
  );
};

