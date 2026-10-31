import React, { useState } from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { EVCScheduleModal } from '../components/evc/EVCScheduleModal';
import { EVCReportModal } from '../components/evc/EVCReportModal';
import { EVCVisit } from '../types/evc';
import { Application } from '../types/application';
import {
  CalendarDays,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  PlusCircle,
  FileText,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const EVCManagement: React.FC = () => {
  const { evcVisits, applications } = useParikalpData();

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedAppForSchedule, setSelectedAppForSchedule] = useState<Application | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedVisitForReport, setSelectedVisitForReport] = useState<EVCVisit | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'SCHEDULED' | 'REPORT_SUBMITTED'>('ALL');

  const filteredVisits = evcVisits.filter(v => {
    if (activeFilter === 'SCHEDULED') return v.status === 'SCHEDULED' || v.status === 'IN_PROGRESS';
    if (activeFilter === 'REPORT_SUBMITTED') return v.status === 'REPORT_SUBMITTED';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Inspection Directorate • AICTE
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Expert Visit Committee Operations</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarDays className="w-6 h-6 text-parikalp-primary" />
            EVC Scheduling & Inspection Dossier Management
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Manage expert physical audits, committee constitution, automated conflict-of-interest checks, geotagged evidence archives, and scoring reports for technical institutions.
          </p>
        </div>

        <button
          onClick={() => {
            const candidateApp = applications.find(a => a.status === 'SCRUTINY_PASSED') || applications[1];
            setSelectedAppForSchedule(candidateApp);
            setScheduleModalOpen(true);
          }}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Constitute & Schedule EVC
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            EVCs Required
          </span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">
            {applications.filter(a => a.evcRequired).length} Institutions
          </span>
          <span className="text-xs text-slate-500 mt-1 block">New courses & expansion</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Upcoming Visits Scheduled
          </span>
          <span className="text-2xl font-bold text-indigo-700 mt-1 block">
            {evcVisits.filter(v => v.status === 'SCHEDULED').length} Scheduled
          </span>
          <span className="text-xs text-slate-500 mt-1 block">Teams notified & confirmed</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Reports Submitted
          </span>
          <span className="text-2xl font-bold text-emerald-700 mt-1 block">
            {evcVisits.filter(v => v.status === 'REPORT_SUBMITTED').length} Dossiers
          </span>
          <span className="text-xs text-slate-500 mt-1 block">Forwarded to SAC Committee</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Conflict Screening Status
          </span>
          <span className="text-2xl font-bold text-emerald-700 mt-1 block">
            100% Passed
          </span>
          <span className="text-xs text-slate-500 mt-1 block">Institutional bias check</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeFilter === 'ALL'
              ? 'bg-parikalp-primary text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Visits ({evcVisits.length})
        </button>
        <button
          onClick={() => setActiveFilter('SCHEDULED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeFilter === 'SCHEDULED'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Scheduled Visits ({evcVisits.filter(v => v.status === 'SCHEDULED').length})
        </button>
        <button
          onClick={() => setActiveFilter('REPORT_SUBMITTED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeFilter === 'REPORT_SUBMITTED'
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Completed Reports ({evcVisits.filter(v => v.status === 'REPORT_SUBMITTED').length})
        </button>
      </div>

      {/* EVC Visits Registry Cards */}
      <div className="space-y-4">
        {filteredVisits.map(visit => (
          <div
            key={visit.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-parikalp-primary">
                  {visit.applicationRef}
                </span>
                <span className="text-slate-300">•</span>
                <h3 className="text-base font-bold text-slate-900">
                  {visit.institutionName}
                </h3>
                <StatusBadge status={visit.status} size="sm" />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-indigo-600" />
                  Visit Date: <strong>{visit.visitDate}</strong> ({visit.visitTime})
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[260px]">{visit.locationAddress}</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Conflict of Interest Checked
                </span>
              </div>

              {/* Committee Members Pill List */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
                <span className="font-semibold text-slate-500 text-[11px]">Assigned Experts:</span>
                {visit.committeeMembers.map(m => (
                  <span
                    key={m.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-[11px]"
                  >
                    <Users className="w-3 h-3 text-slate-400" />
                    <strong>{m.name}</strong> ({m.role})
                  </span>
                ))}
              </div>

              {/* Inspection Report Snippet if Submitted */}
              {visit.report && (
                <div className="mt-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      EVC Composite Score: {visit.report.overallScore}/100
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800">
                      Recommendation: {visit.report.recommendation.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800 line-clamp-2">
                    "{visit.report.finalSummary}"
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-2 flex-shrink-0 self-end lg:self-auto w-full lg:w-auto">
              {visit.status === 'SCHEDULED' && (
                <button
                  onClick={() => {
                    setSelectedVisitForReport(visit);
                    setReportModalOpen(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  Submit Inspection Report
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredVisits.length === 0 && (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 text-xs">
            No EVC visits found under the selected filter.
          </div>
        )}
      </div>

      {/* Modals */}
      <EVCScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        application={selectedAppForSchedule}
      />

      <EVCReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        visit={selectedVisitForReport}
      />
    </div>
  );
};

