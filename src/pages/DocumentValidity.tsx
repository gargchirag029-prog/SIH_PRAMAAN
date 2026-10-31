import React, { useState } from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { DocumentViewerModal } from '../components/shared/DocumentViewerModal';
import { DocumentRecord } from '../types/document';
import { documentService } from '../services/documentService';
import { useNotification } from '../context/NotificationContext';
import {
  FolderLock,
  Search,
  Eye,
  RefreshCw,
  Download,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Lock,
} from 'lucide-react';

export const DocumentValidity: React.FC = () => {
  const { documents, refreshData } = useParikalpData();
  const { showToast } = useNotification();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const [replacingDocId, setReplacingDocId] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [newExpiryDate, setNewExpiryDate] = useState('2027-10-31');

  const filteredDocs = documents.filter(doc =>
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReplaceSubmit = (docId: string) => {
    if (!newFileName.trim()) return;

    documentService.replaceDocument(
      docId,
      newFileName,
      new Date().toISOString().split('T')[0],
      newExpiryDate
    );

    refreshData();
    showToast(
      'success',
      'Document Replaced & Version Increment Recorded',
      `Uploaded renewed copy: ${newFileName}. Version bumped and AI re-verification initiated.`
    );
    setReplacingDocId(null);
    setNewFileName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Cryptographic Document Repository
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">AES-256 S3 Object Vault</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FolderLock className="w-6 h-6 text-parikalp-primary" />
            Centralized Document Validity & Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Institutional document records, lease deeds, fire safety NOCs, building sanctions, and joint FDR receipts with validity countdowns and cryptographic checksum verification.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Role-Based Secure Object Access</span>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900">
            Document Vault Records ({filteredDocs.length})
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search category, filename or college..."
              className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-slate-50/50 focus:ring-2 focus:ring-parikalp-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Document Category</th>
                <th className="py-3 px-3">Institution Name</th>
                <th className="py-3 px-3">File Name & Version</th>
                <th className="py-3 px-3">Issue Date</th>
                <th className="py-3 px-3">Expiry Date</th>
                <th className="py-3 px-3 text-center">Validity</th>
                <th className="py-3 px-3 text-center">Verification</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map(doc => (
                <React.Fragment key={doc.id}>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">{doc.category}</td>
                    <td className="py-3 px-3 text-slate-700">
                      <span className="truncate max-w-[180px] block font-medium">
                        {doc.institutionName}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{doc.fileName}</span>
                        <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded text-[10px]">
                          v{doc.version}.0
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{doc.issueDate}</td>
                    <td className="py-3 px-3 text-slate-700">
                      {doc.expiryDate ? (
                        <span
                          className={`font-semibold ${
                            doc.validityStatus === 'EXPIRED'
                              ? 'text-rose-600'
                              : doc.validityStatus === 'EXPIRING_SOON'
                              ? 'text-amber-600'
                              : 'text-slate-800'
                          }`}
                        >
                          {doc.expiryDate}
                        </span>
                      ) : (
                        <span className="text-slate-400">Perpetual</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <StatusBadge status={doc.validityStatus} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <StatusBadge status={doc.verificationStatus} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedDoc(doc)}
                          className="px-2.5 py-1 text-xs font-semibold text-parikalp-primary bg-parikalp-lightblue hover:bg-blue-100 rounded-md transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Inspect
                        </button>
                        <button
                          onClick={() => {
                            if (replacingDocId === doc.id) {
                              setReplacingDocId(null);
                            } else {
                              setReplacingDocId(doc.id);
                              setNewFileName(`Renewed_${doc.fileName}`);
                            }
                          }}
                          className="px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                          title="Upload updated version"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Inline Replacement Form when toggled */}
                  {replacingDocId === doc.id && (
                    <tr className="bg-blue-50/50">
                      <td colSpan={8} className="p-4 border-t border-b border-blue-200">
                        <div className="max-w-xl space-y-2">
                          <span className="font-bold text-xs text-blue-900 block">
                            Replace Document & Bump Version for: {doc.category}
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                              type="text"
                              value={newFileName}
                              onChange={e => setNewFileName(e.target.value)}
                              placeholder="New File Name (e.g. Renewed_NOC_2026.pdf)"
                              className="border border-slate-300 rounded p-1.5 bg-white text-xs"
                            />
                            <input
                              type="date"
                              value={newExpiryDate}
                              onChange={e => setNewExpiryDate(e.target.value)}
                              className="border border-slate-300 rounded p-1.5 bg-white text-xs"
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setReplacingDocId(null)}
                              className="px-3 py-1 bg-white border border-slate-300 rounded text-slate-700 text-xs"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReplaceSubmit(doc.id)}
                              className="px-4 py-1 bg-parikalp-primary hover:bg-blue-800 text-white rounded text-xs font-bold shadow-xs"
                            >
                              Upload & Bump to v{doc.version + 1}.0
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
    </div>
  );
};

