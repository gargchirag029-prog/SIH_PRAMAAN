import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useParikalpData } from '../context/ParikalpDataContext';
import { useNotification } from '../context/NotificationContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { DocumentViewerModal } from '../components/shared/DocumentViewerModal';
import { DiscrepancyModal } from '../components/scrutiny/DiscrepancyModal';
import { EVCScheduleModal } from '../components/evc/EVCScheduleModal';
import { DocumentRecord } from '../types/document';
import { applicationService } from '../services/applicationService';
import {
  Building2,
  FileCheck2,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Eye,
  FileText,
  FilePlus,
  ArrowRight,
  ListChecks,
  Send,
  Sparkles,
} from 'lucide-react';

export const ScrutinyWorkspace: React.FC = () => {
  const { applications, documents, verifications, refreshData } = useParikalpData();
  const { showToast } = useNotification();
  const [searchParams] = useSearchParams();

  const appIdFromQuery = searchParams.get('appId');
  const defaultApp = applications.find(a => a.id === appIdFromQuery) || applications[0];

  const [selectedAppId, setSelectedAppId] = useState<string>(defaultApp ? defaultApp.id : '');
  const activeApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const [isDiscrepancyOpen, setIsDiscrepancyOpen] = useState(false);
  const [isEVCScheduleOpen, setIsEVCScheduleOpen] = useState(false);
  const [officerRemarks, setOfficerRemarks] = useState(activeApp?.scrutinyRemarks || '');

  // Scrutiny review checklist state
  const [checklist, setChecklist] = useState({
    landTitle: true,
    fireSafetyNOC: false,
    buildingApproval: true,
    cadreRatio: true,
    jointFdr: true,
    antiRagging: true,
  });

  const appDocs = documents.filter(
    d => d.applicationId === activeApp?.id || d.applicationRef === activeApp?.referenceNumber
  );

  const handleStartScrutiny = () => {
    if (!activeApp) return;
    applicationService.startScrutiny(activeApp.id);
    refreshData();
    showToast('info', 'Scrutiny Started', `Application ${activeApp.referenceNumber} is now Under Active Scrutiny.`);
  };

  const handlePassScrutiny = (forwardTo: 'EVC' | 'COMMITTEE') => {
    if (!activeApp) return;
    applicationService.passScrutiny(
      activeApp.id,
      forwardTo,
      officerRemarks || `Scrutiny successfully cleared by Regional Scrutiny Cell. Forwarded to ${forwardTo}.`
    );
    refreshData();
    showToast(
      'success',
      'Scrutiny Cleared',
      `Application approved by Scrutiny Officer and forwarded to ${forwardTo} stage.`
    );
  };

  if (!activeApp) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
        No application selected or queue is empty.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Workspace Header & Application Switcher Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Regional Scrutiny Cell Workspace
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Dual-Pane Verification Terminal</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeApp.institutionName}
            </h1>
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 rounded-md text-slate-700">
              {activeApp.referenceNumber}
            </span>
            <StatusBadge status={activeApp.status} size="md" />
          </div>
        </div>

        {/* Quick Application Switcher Dropdown */}
        <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto">
          <label className="text-xs font-semibold text-slate-600 hidden sm:inline">
            Active Application:
          </label>
          <select
            value={selectedAppId}
            onChange={e => {
              setSelectedAppId(e.target.value);
              const target = applications.find(a => a.id === e.target.value);
              if (target) setOfficerRemarks(target.scrutinyRemarks || '');
            }}
            className="border border-slate-300 rounded-lg p-2 bg-white text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-parikalp-primary w-full md:w-64"
          >
            {applications.map(app => (
              <option key={app.id} value={app.id}>
                {app.referenceNumber} - {app.institutionName.slice(0, 24)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Dual-Pane Scrutiny Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ================= LEFT SECTION (7 Cols) ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Institution & Application Profile Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-parikalp-primary" />
                Institutional Data & Infrastructure Norms
              </h3>
              <span className="text-xs font-semibold text-slate-600">
                Region: {activeApp.region}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">AICTE Permanent ID</span>
                <span className="font-mono font-bold text-slate-900">{activeApp.aictePermanentId}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Management Type</span>
                <span className="font-bold text-slate-900">{activeApp.institutionType}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Approval Category</span>
                <span className="font-bold text-slate-900 truncate block">{activeApp.category}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Contiguous Land Area</span>
                <span className="font-bold text-slate-900">{activeApp.landAreaAcres} Acres</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Built-up Space</span>
                <span className="font-bold text-slate-900">{activeApp.builtUpAreaSqMeters.toLocaleString()} Sq.M.</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-500 block">Faculty Cadre Ratio</span>
                <span className="font-bold text-slate-900">{activeApp.totalFacultyCount} Faculty ({activeApp.studentFacultyRatio})</span>
              </div>
            </div>

            {/* Courses Matrix */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                Applied Courses & Intake:
              </span>
              <div className="overflow-x-auto border border-slate-200 rounded-lg text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[10px] uppercase">
                    <tr>
                      <th className="py-2 px-3">Program & Course</th>
                      <th className="py-2 px-3 text-center">Current</th>
                      <th className="py-2 px-3 text-center">Proposed</th>
                      <th className="py-2 px-3 text-center">Accreditation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeApp.courses.map(c => (
                      <tr key={c.id}>
                        <td className="py-2 px-3 font-semibold text-slate-800">
                          {c.name} <span className="text-[10px] text-slate-400 font-normal">({c.level})</span>
                        </td>
                        <td className="py-2 px-3 text-center text-slate-600">{c.currentIntake}</td>
                        <td className="py-2 px-3 text-center font-bold text-emerald-700">
                          {c.proposedIntake}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${c.nbaAccredited ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                            {c.nbaAccredited ? 'NBA Tier-I' : 'Standard'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 2. Uploaded Documents for Scrutiny Table */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-parikalp-primary" />
                Submitted Documents & AI Pre-Screening Signals
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {appDocs.length} Documents Attached
              </span>
            </div>

            <div className="space-y-2.5">
              {appDocs.map(doc => {
                const report = verifications.find(v => v.documentId === doc.id);
                return (
                  <div
                    key={doc.id}
                    className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition-colors flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg border border-slate-200 text-blue-600 flex-shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{doc.category}</p>
                        <p className="text-[11px] font-mono text-slate-500 truncate max-w-[280px]">
                          {doc.fileName} ({doc.fileSize})
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusBadge status={doc.validityStatus} size="sm" />
                          <StatusBadge status={doc.verificationStatus} size="sm" />
                          {report && (
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono font-semibold">
                              AI: {report.aiConfidenceScore}% match
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="px-3 py-1.5 bg-parikalp-primary hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs flex-shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Inspect & OCR
                    </button>
                  </div>
                );
              })}

              {appDocs.length === 0 && (
                <div className="text-center py-6 text-slate-500 text-xs">
                  No documents found for this application.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION (5 Cols) ================= */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Automated Validation & Discrepancy Alert Signals */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-parikalp-primary" />
              Automated Completeness & Discrepancies
            </h3>

            {/* AI Discrepancy Detection Callout */}
            {activeApp.discrepancyCount > 0 ? (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  Regulatory Discrepancy Signal Active:
                </div>
                {activeApp.discrepancies?.map((disc, idx) => (
                  <p key={idx} className="text-xs text-rose-800 pl-6 leading-relaxed">
                    • {disc}
                  </p>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center gap-2.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero discrepancies detected. Document set meets APH norms.</span>
              </div>
            )}

            {/* Statutory Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 block">
                Officer Statutory Scrutiny Checklist:
              </span>

              {[
                { key: 'landTitle', label: 'Land registered & contiguous (Min urban/rural area)' },
                { key: 'fireSafetyNOC', label: 'Fire & Life Safety NOC valid for current AY' },
                { key: 'buildingApproval', label: 'Municipal Sanctioned Building Plan & Stability' },
                { key: 'cadreRatio', label: 'Faculty Cadre Ratio of 1:15 & Form-16 matched' },
                { key: 'jointFdr', label: 'Joint AICTE Fixed Deposit Receipt valid' },
                { key: 'antiRagging', label: 'Anti-Ragging Squad notified on college website' },
              ].map(item => (
                <label
                  key={item.key}
                  className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={(checklist as any)[item.key]}
                    onChange={e =>
                      setChecklist(prev => ({ ...prev, [item.key]: e.target.checked }))
                    }
                    className="mt-0.5 rounded text-parikalp-primary focus:ring-parikalp-primary"
                  />
                  <span className="text-slate-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Officer Decision & Workflow Routing Actions */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <ListChecks className="w-4 h-4 text-parikalp-primary" />
              Scrutiny Remarks & Workflow Action
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                Official Scrutiny Remarks (Logged in Audit Trail):
              </label>
              <textarea
                rows={3}
                value={officerRemarks}
                onChange={e => setOfficerRemarks(e.target.value)}
                placeholder="Enter regulatory verification notes, citations, or instructions..."
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>

            {/* Action Buttons Grid */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {activeApp.status === 'SUBMITTED' && (
                <button
                  onClick={handleStartScrutiny}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <FileCheck2 className="w-4 h-4" />
                  Initiate Formal Scrutiny
                </button>
              )}

              <button
                onClick={() => setIsDiscrepancyOpen(true)}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Raise Regulatory Discrepancy Notice
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsEVCScheduleOpen(true)}
                  className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Forward to EVC Visit
                </button>

                <button
                  onClick={() => handlePassScrutiny('COMMITTEE')}
                  className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Forward to Committee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DocumentViewerModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        document={selectedDoc}
      />

      <DiscrepancyModal
        isOpen={isDiscrepancyOpen}
        onClose={() => setIsDiscrepancyOpen(false)}
        application={activeApp}
      />

      <EVCScheduleModal
        isOpen={isEVCScheduleOpen}
        onClose={() => setIsEVCScheduleOpen(false)}
        application={activeApp}
      />
    </div>
  );
};

