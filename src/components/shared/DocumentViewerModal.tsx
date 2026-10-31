import React from 'react';
import { Modal } from './Modal';
import { DocumentRecord } from '../../types/document';
import { DocumentVerificationReport } from '../../types/verification';
import { StatusBadge } from './StatusBadge';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Download,
  Hash,
  Calendar,
  Building,
} from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentRecord | null;
  verificationReport?: DocumentVerificationReport | null;
  onRunAIVerification?: (doc: DocumentRecord) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  document,
  verificationReport,
  onRunAIVerification,
}) => {
  if (!document) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Official Document Dossier: ${document.fileName}`}
      subtitle={`Security Classification: AICTE Regulatory Record • Ref: ${document.applicationRef}`}
      maxWidth="5xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted in Private S3-Compatible Vault (256-bit AES)</span>
          </div>
          <div className="flex items-center gap-2">
            {onRunAIVerification && (
              <button
                type="button"
                onClick={() => onRunAIVerification(document)}
                className="px-3 py-1.5 text-xs font-medium text-parikalp-primary bg-parikalp-lightblue hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                Re-scan AI Intelligence
              </button>
            )}
            <button
              type="button"
              onClick={() => alert(`Simulated secure download for: ${document.fileName}\nSHA-256: ${document.checksum}`)}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-parikalp-primary hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Download Verified Copy
            </button>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Simulated Official PDF Render Preview */}
        <div className="lg:col-span-7 bg-slate-900 rounded-xl p-4 flex flex-col text-slate-200 shadow-inner min-h-[460px]">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2.5 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-slate-300">{document.fileName}</span>
              <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">
                {document.fileSize}
              </span>
            </div>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">
              DIGITALLY SECURED
            </span>
          </div>

          {/* Watermarked Mock Document Canvas */}
          <div className="flex-1 bg-white rounded-lg p-6 text-slate-800 relative overflow-hidden flex flex-col justify-between shadow-md">
            {/* Government Watermark Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] rotate-[-30deg]">
              <span className="text-6xl font-black uppercase text-slate-900">
                AICTE PARIKALP 2026
              </span>
            </div>

            {/* Simulated Document Letterhead */}
            <div>
              <div className="text-center border-b border-slate-200 pb-3 mb-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Government of India / Statutory Regulatory Record
                </p>
                <h4 className="text-sm font-bold text-slate-900 uppercase">
                  {document.category}
                </h4>
                <p className="text-[11px] text-slate-600">
                  Issued to: <span className="font-semibold">{document.institutionName}</span>
                </p>
              </div>

              {/* Document Extracted Key Body Text */}
              <div className="space-y-3 text-xs text-slate-700 font-sans leading-relaxed">
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <p className="text-[11px] font-medium text-slate-500 mb-1">RECORD SUMMARY:</p>
                  <p>
                    This is an officially scanned copy of the{' '}
                    <span className="font-semibold text-slate-900">{document.category}</span>{' '}
                    furnished by the authorized signatory of {document.institutionName} for
                    the academic year approval process under the AICTE Approval Process Handbook (APH) 2026-27.
                  </p>
                </div>

                {document.extractedMetadata && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {document.extractedMetadata.issuingAuthority && (
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Issuing Authority</span>
                        <span className="font-medium text-slate-800">
                          {document.extractedMetadata.issuingAuthority}
                        </span>
                      </div>
                    )}
                    {document.extractedMetadata.certificateNumber && (
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Certificate / Order No.</span>
                        <span className="font-mono font-medium text-slate-800">
                          {document.extractedMetadata.certificateNumber}
                        </span>
                      </div>
                    )}
                    {document.extractedMetadata.landAreaDeclared && (
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Land Area Declared</span>
                        <span className="font-medium text-slate-800">
                          {document.extractedMetadata.landAreaDeclared}
                        </span>
                      </div>
                    )}
                    {document.extractedMetadata.validThrough && (
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Valid Through</span>
                        <span className="font-medium text-slate-800">
                          {document.extractedMetadata.validThrough}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {document.discrepancyNote && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800">
                    <div className="flex items-center gap-1.5 font-semibold text-xs mb-1">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Discrepancy Highlighted by Scrutiny:
                    </div>
                    <p className="text-xs">{document.discrepancyNote}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Document Footer with simulated seal and stamp */}
            <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-600/40 flex items-center justify-center text-[8px] font-bold text-emerald-700 uppercase">
                  NIC-eSign
                </div>
                <div>
                  <span className="font-medium text-slate-700 block">Digitally Scrutinised</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Uploaded: {document.uploadedAt}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-slate-400">AICTE Reg Tracking ID</span>
                <span className="font-mono text-slate-800 font-semibold">{document.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI & Metadata Inspection Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Validity & Verification Cards */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-parikalp-primary" />
              Document Compliance Status
            </h5>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Validity Horizon:</span>
                <StatusBadge status={document.validityStatus} size="sm" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Verification Stage:</span>
                <StatusBadge status={document.verificationStatus} size="sm" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Document Version:</span>
                <span className="font-mono font-medium text-slate-800">
                  v{document.version}.0 (Official)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Issue Date:</span>
                <span className="font-medium text-slate-800">{document.issueDate}</span>
              </div>
              {document.expiryDate && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Expiry Date:</span>
                  <span
                    className={`font-semibold ${
                      document.daysRemaining !== undefined && document.daysRemaining < 0
                        ? 'text-rose-600'
                        : 'text-slate-800'
                    }`}
                  >
                    {document.expiryDate}{' '}
                    {document.daysRemaining !== undefined && (
                      <span className="text-[10px] font-normal text-slate-500">
                        ({document.daysRemaining < 0
                          ? `${Math.abs(document.daysRemaining)} days ago`
                          : `${document.daysRemaining} days left`})
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* AI Inspection Card */}
          {verificationReport ? (
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    AI OCR & Layout Inspection
                  </h5>
                </div>
                <StatusBadge status={verificationReport.overallStatus} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                  <span className="text-[10px] font-medium text-blue-700 block">AI Match Confidence</span>
                  <span className="text-lg font-bold text-blue-900">
                    {verificationReport.aiConfidenceScore}%
                  </span>
                </div>
                <div
                  className={`p-2.5 rounded-lg border ${
                    verificationReport.tamperingDetected
                      ? 'bg-rose-50 border-rose-100 text-rose-900'
                      : 'bg-emerald-50 border-emerald-100 text-emerald-900'
                  }`}
                >
                  <span className="text-[10px] font-medium block">Tampering Screening</span>
                  <span className="text-lg font-bold">
                    {verificationReport.tamperingDetected ? 'Signals Detected' : 'Authentic'}
                  </span>
                </div>
              </div>

              {/* Extracted Fields List */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-600">Extracted Key Fields:</p>
                {verificationReport.extractedFields.slice(0, 4).map((field, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-slate-50 rounded border border-slate-100 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] text-slate-500 block">{field.fieldName}</span>
                      <span className="font-medium text-slate-800 text-[11px] truncate max-w-[200px] block">
                        {field.extractedValue}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        field.matchStatus === 'MATCH'
                          ? 'bg-emerald-100 text-emerald-700'
                          : field.matchStatus === 'PARTIAL'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {field.matchStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center py-6">
              <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-600">
                Click below to trigger automated OCR and discrepancy scanning.
              </p>
            </div>
          )}

          {/* Cryptographic Integrity Block */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 font-sans font-semibold text-slate-700 text-xs">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              SHA-256 Checksum:
            </div>
            <p className="break-all text-[10px] bg-white p-1.5 rounded border border-slate-200 text-slate-600">
              {document.checksum}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

