import React, { useState } from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  BarChart3,
  Download,
  Printer,
  Filter,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';

export const Reports: React.FC = () => {
  const { applications, complianceProfiles, evcVisits } = useParikalpData();

  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const regionPerformance = [
    { region: 'North-Western', total: 42, approved: 28, pending: 14, evcAverage: '4.2 Days' },
    { region: 'Southern', total: 58, approved: 44, pending: 14, evcAverage: '3.8 Days' },
    { region: 'Western', total: 39, approved: 29, pending: 10, evcAverage: '4.5 Days' },
    { region: 'Northern', total: 34, approved: 21, pending: 13, evcAverage: '5.1 Days' },
    { region: 'Eastern', total: 24, approved: 14, pending: 10, evcAverage: '5.4 Days' },
  ];

  const complianceByCategory = [
    { name: 'Fire Safety NOC', compliant: 86, deficient: 14 },
    { name: 'Land Title & Lease', compliant: 98, deficient: 2 },
    { name: 'Faculty Cadre Ratio', compliant: 92, deficient: 8 },
    { name: 'Joint FDR Maintenance', compliant: 89, deficient: 11 },
    { name: 'Anti-Ragging Squad', compliant: 100, deficient: 0 },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Region', 'Total Applications', 'Approved LOA/EOA', 'Under Scrutiny / Pending', 'EVC Turnaround SLA'];
    const rows = regionPerformance.map(r => [r.region, r.total, r.approved, r.pending, r.evcAverage]);
    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csv);
    link.download = `AICTE_PARIKALP_Executive_Report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              Regulatory Intelligence & MIS Reporting
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">AY 2026-27 Executive Statistics</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-parikalp-primary" />
            Analytics, Regional Throughput & Statutory Reporting
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Generate verifiable reports on approval pendency, scrutiny SLA compliance, EVC performance, and continuous institutional health across the Indian technical education system.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-parikalp-primary hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Executive Dossier
          </button>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
            Regional Bureau Approval Throughput
          </h3>
          <p className="text-xs text-slate-500 mb-4">Total submissions versus cleared applications</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="region" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="total" name="Total Intake" fill="#1456A0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="approved" name="Approved (LOA/EOA)" fill="#16A36A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
            Statutory Compliance Adherence
          </h3>
          <p className="text-xs text-slate-500 mb-4">Institutional adherence rate by category (%)</p>

          <div className="space-y-3 pt-2">
            {complianceByCategory.map((cat, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{cat.name}</span>
                  <span className="font-bold text-emerald-700">{cat.compliant}% Compliant</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${cat.compliant}%` }}
                  />
                  <div
                    className="bg-rose-500 h-full"
                    style={{ width: `${cat.deficient}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Regional Performance & Turnaround Audit Table
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Regional Office</th>
                <th className="py-3 px-3 text-center">Total Applications</th>
                <th className="py-3 px-3 text-center">Approved (LOA/EOA)</th>
                <th className="py-3 px-3 text-center">Pending / Under Scrutiny</th>
                <th className="py-3 px-3 text-center">EVC Report SLA</th>
                <th className="py-3 px-3 text-center">SLA Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {regionPerformance.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">{row.region}</td>
                  <td className="py-3 px-3 text-center font-bold text-slate-800">{row.total}</td>
                  <td className="py-3 px-3 text-center font-bold text-emerald-700">{row.approved}</td>
                  <td className="py-3 px-3 text-center font-bold text-parikalp-primary">{row.pending}</td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600">{row.evcAverage}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                      94.2% On-Time
                    </span>
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

