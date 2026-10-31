import React, { useState } from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import { AuditLogEntry } from '../types/audit';
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  Hash,
  Download,
  Calendar,
  UserCheck,
} from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const { auditLogs } = useParikalpData();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const filteredLogs = auditLogs.filter(log => {
    const matchSearch =
      log.remarks.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.applicationRef && log.applicationRef.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.institutionName && log.institutionName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchRole = roleFilter === 'ALL' || log.userRole === roleFilter;

    return matchSearch && matchRole;
  });

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Action', 'User', 'Role', 'Application Ref', 'Institution', 'Remarks', 'Integrity Hash'];
    const rows = filteredLogs.map(l => [
      l.timestamp,
      l.action,
      `"${l.userName}"`,
      l.userRole,
      l.applicationRef || 'N/A',
      `"${l.institutionName || 'N/A'}"`,
      `"${l.remarks.replace(/"/g, '""')}"`,
      l.integrityHash,
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `AICTE_Audit_Trail_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Regulatory Accountability & Governance
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Cryptographically Chained Audit Trail</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-parikalp-primary" />
            Immutable Audit Log & Compliance Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Every administrative action—application submissions, document replacements, officer scrutiny remarks, EVC visit reports, and committee decisions—is immutably recorded with actor identity, timestamp, IP gateway, and SHA-256 integrity hash.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Download className="w-4 h-4 text-slate-500" />
          Export Audit Ledger
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search action, application ref, or remarks..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg bg-slate-50/50 text-xs focus:ring-2 focus:ring-parikalp-primary"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-slate-500">Filter Actor Role:</span>
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="border border-slate-300 rounded-lg p-2 bg-white text-xs font-medium"
          >
            <option value="ALL">All Actors</option>
            <option value="institution">Institution</option>
            <option value="officer">Regional Officer</option>
            <option value="admin">AICTE Admin / Committee</option>
            <option value="SYSTEM_CRON">System Automated Service</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Action Type</th>
                <th className="py-3 px-3">Actor & Role</th>
                <th className="py-3 px-3">Application Reference</th>
                <th className="py-3 px-3">Remarks & Transition</th>
                <th className="py-3 px-3 font-mono">Integrity Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[10px] block truncate max-w-[160px]">
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-slate-800 block truncate max-w-[140px]">
                      {log.userName}
                    </span>
                    <span className="text-[10px] text-slate-500 capitalize">{log.userRole}</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-parikalp-primary whitespace-nowrap">
                    {log.applicationRef || '—'}
                  </td>
                  <td className="py-3 px-3 text-slate-700 max-w-sm">
                    <p className="line-clamp-2 leading-relaxed">{log.remarks}</p>
                    {log.previousStatus && log.newStatus && (
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Status Transition: {log.previousStatus} → <strong>{log.newStatus}</strong>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-slate-400 max-w-[120px] truncate">
                    {log.integrityHash}
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

