import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParikalpData } from '../context/ParikalpDataContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { DiscrepancyModal } from '../components/scrutiny/DiscrepancyModal';
import { EVCScheduleModal } from '../components/evc/EVCScheduleModal';
import { Application } from '../types/application';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  FileSearch,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const OfficerPortal: React.FC = () => {
  const { user } = useAuth();
  const { applications, metrics } = useParikalpData();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'ALL' | 'SCRUTINY' | 'RE_SCRUTINY' | 'EVC_PENDING'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [discrepancyApp, setDiscrepancyApp] = useState<Application | null>(null);
  const [evcScheduleApp, setEvcScheduleApp] = useState<Application | null>(null);

  const filteredApps = applications.filter(app => {
    const matchesSearch =
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.institutionName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'SCRUTINY') {
      return app.status === 'UNDER_SCRUTINY' || app.status === 'SUBMITTED';
    }
    if (activeTab === 'RE_SCRUTINY') {
      return app.status === 'RE_SCRUTINY_PENDING' || app.status === 'DISCREPANCY_RAISED';
    }
    if (activeTab === 'EVC_PENDING') {
      return app.status === 'SCRUTINY_PASSED' || app.status === 'EVC_SCHEDULED';
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Officer Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-parikalp-primary border border-blue-200 flex items-center justify-center flex-shrink-0">
            <FileSearch className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Regional Officer Scrutiny Desk
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {user.region || 'North-Western'} Regional Office (NWRO)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Officer: <strong className="text-slate-800">{user.name}</strong> • Regulatory Mandate: Scrutinise statutory documents, evaluate land/infrastructure norms, detect tampering, and route applications.
            </p>
          </div>
        </div>

        {/* Workload Stats */}
        <div className="flex items-center gap-4 text-center">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Queue Active</span>
            <span className="text-xl font-bold text-parikalp-primary">{metrics.underScrutiny}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Re-Scrutiny</span>
            <span className="text-xl font-bold text-amber-700">{metrics.rescrutinyPending}</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Approved</span>
            <span className="text-xl font-bold text-emerald-700">{metrics.approvedCount}</span>
          </div>
        </div>
      </div>

      {/* Scrutiny Applications Queue Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card">
        {/* Table Filters & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'ALL'
                  ? 'bg-parikalp-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Applications ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('SCRUTINY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'SCRUTINY'
                  ? 'bg-parikalp-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Under Scrutiny ({metrics.underScrutiny})
            </button>
            <button
              onClick={() => setActiveTab('RE_SCRUTINY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'RE_SCRUTINY'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Awaiting Re-Scrutiny ({metrics.rescrutinyPending})
            </button>
            <button
              onClick={() => setActiveTab('EVC_PENDING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'EVC_PENDING'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              EVC Inspection Ready ({metrics.evcScheduled})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search reference or college..."
              className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-parikalp-primary bg-slate-50/50"
            />
          </div>
        </div>

        {/* Applications Queue */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Application Ref</th>
                <th className="py-3 px-3">Institution Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Submission</th>
                <th className="py-3 px-3 text-center">Completeness</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Scrutiny Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-parikalp-primary">
                    {app.referenceNumber}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-900 block truncate max-w-[220px]">
                      {app.institutionName}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      PID: {app.aictePermanentId} • {app.region}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700">
                    <span className="truncate max-w-[180px] block">{app.category}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                    <span>{app.submissionDate}</span>
                    <span className="block text-[10px] text-slate-400">
                      Pending: {app.pendingDurationDays} days
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <div className="w-12 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            app.documentCompletenessScore === 100
                              ? 'bg-emerald-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${app.documentCompletenessScore}%` }}
                        />
                      </div>
                      <span className="font-bold text-[11px] text-slate-700">
                        {app.documentCompletenessScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/scrutiny?appId=${app.id}`}
                        className="px-2.5 py-1 text-xs font-semibold text-white bg-parikalp-primary hover:bg-blue-800 rounded-md transition-colors inline-flex items-center gap-1"
                      >
                        <FileSearch className="w-3 h-3" />
                        Scrutinise
                      </Link>

                      {app.status === 'UNDER_SCRUTINY' && (
                        <button
                          onClick={() => setDiscrepancyApp(app)}
                          className="px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
                          title="Raise Discrepancy Notice"
                        >
                          Discrepancy
                        </button>
                      )}

                      {app.status === 'SCRUTINY_PASSED' && (
                        <button
                          onClick={() => setEvcScheduleApp(app)}
                          className="px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-colors"
                          title="Schedule EVC Visit"
                        >
                          Schedule EVC
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discrepancy Modal */}
      <DiscrepancyModal
        isOpen={!!discrepancyApp}
        onClose={() => setDiscrepancyApp(null)}
        application={discrepancyApp}
      />

      {/* EVC Schedule Modal */}
      <EVCScheduleModal
        isOpen={!!evcScheduleApp}
        onClose={() => setEvcScheduleApp(null)}
        application={evcScheduleApp}
      />
    </div>
  );
};

