import React, { useState, useMemo } from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { ApplicationStatus, Region, ApplicationCategory } from '../types/application';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  PlusCircle,
  Eye,
  FileCheck2,
  Calendar,
  Gavel,
  ShieldCheck,
  Download,
} from 'lucide-react';

export const ApplicationManagement: React.FC = () => {
  const { applications } = useParikalpData();
  const [searchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
  const statusParam = searchParams.get('status') || 'ALL';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [statusFilter, setStatusFilter] = useState<string>(statusParam);
  const [regionFilter, setRegionFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchSearch =
        app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.aictePermanentId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || app.status === statusFilter;
      const matchRegion = regionFilter === 'ALL' || app.region === regionFilter;
      const matchCategory = categoryFilter === 'ALL' || app.category === categoryFilter;

      return matchSearch && matchStatus && matchRegion && matchCategory;
    });
  }, [applications, searchQuery, statusFilter, regionFilter, categoryFilter]);

  const handleExportCSV = () => {
    const headers = ['Reference', 'Institution', 'PID', 'Region', 'Category', 'Status', 'Completeness', 'Submission Date'];
    const rows = filteredApplications.map(a => [
      a.referenceNumber,
      `"${a.institutionName}"`,
      a.aictePermanentId,
      a.region,
      `"${a.category}"`,
      a.status,
      `${a.documentCompletenessScore}%`,
      a.submissionDate,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AICTE_Applications_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block mb-1">
            Centralized National Register
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            AICTE Application Management Repository
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse, search and monitor institutional approval dossiers across all regional offices.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export CSV
          </button>
          <Link
            to="/submit-application"
            className="px-4 py-2 rounded-xl bg-parikalp-primary hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            New Application
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Ref, College or PID..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg bg-slate-50/50 text-xs focus:ring-2 focus:ring-parikalp-primary"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary font-medium"
            >
              <option value="ALL">All Application Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_SCRUTINY">Under Scrutiny</option>
              <option value="DISCREPANCY_RAISED">Discrepancy Raised</option>
              <option value="RE_SCRUTINY_PENDING">Awaiting Re-Scrutiny</option>
              <option value="EVC_SCHEDULED">EVC Scheduled</option>
              <option value="COMMITTEE_REVIEW">Committee Review (SAC)</option>
              <option value="APPROVED">Approved (LOA / EOA)</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <select
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
            >
              <option value="ALL">All Regional Offices (NWRO, SRO, etc.)</option>
              <option value="North-Western">North-Western (Delhi, Haryana, Punjab)</option>
              <option value="Southern">Southern (Tamil Nadu, Pondicherry)</option>
              <option value="Western">Western (Maharashtra, Goa)</option>
              <option value="Northern">Northern (UP, Uttarakhand)</option>
              <option value="Eastern">Eastern (West Bengal, Bihar)</option>
              <option value="South-Western">South-Western (Karnataka, Kerala)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
            >
              <option value="ALL">All Approval Categories</option>
              <option value="Extension of Approval (EOA)">Extension of Approval (EOA)</option>
              <option value="Increase in Intake (III)">Increase in Intake (III)</option>
              <option value="Introduction of New Course/Program">New Course / Program</option>
              <option value="New Technical Institution (NTI)">New Technical Institution (NTI)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Showing <strong>{filteredApplications.length}</strong> of {applications.length} applications</span>
          {(statusFilter !== 'ALL' || regionFilter !== 'ALL' || categoryFilter !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('ALL');
                setRegionFilter('ALL');
                setCategoryFilter('ALL');
                setSearchQuery('');
              }}
              className="text-parikalp-primary hover:underline font-semibold"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Application Reference</th>
                <th className="py-3 px-4">Institution Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Region</th>
                <th className="py-3 px-4 text-center">Completeness</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-parikalp-primary">
                    {app.referenceNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block truncate max-w-[220px]">
                      {app.institutionName}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      PID: {app.aictePermanentId}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="truncate max-w-[180px] block">{app.category}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{app.region}</td>
                  <td className="py-3.5 px-4 text-center">
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
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/scrutiny?appId=${app.id}`}
                        className="px-2.5 py-1 text-xs font-semibold text-parikalp-primary bg-parikalp-lightblue hover:bg-blue-100 rounded-md transition-colors inline-flex items-center gap-1"
                        title="Open Scrutiny Workspace"
                      >
                        <FileCheck2 className="w-3 h-3" />
                        Scrutinise
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

