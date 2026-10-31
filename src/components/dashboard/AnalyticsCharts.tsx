import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import { useParikalpData } from '../../context/ParikalpDataContext';

export const AnalyticsCharts: React.FC = () => {
  const { applications } = useParikalpData();

  // Status breakdown data
  const statusCounts = applications.reduce((acc: Record<string, number>, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: 'Under Scrutiny', value: statusCounts['UNDER_SCRUTINY'] || 1, color: '#1456A0' },
    { name: 'EVC Scheduled', value: statusCounts['EVC_SCHEDULED'] || 1, color: '#6366F1' },
    { name: 'Committee Review', value: statusCounts['COMMITTEE_REVIEW'] || 1, color: '#A855F7' },
    { name: 'Approved', value: statusCounts['APPROVED'] || 1, color: '#16A36A' },
    { name: 'Discrepancy Raised', value: (statusCounts['DISCREPANCY_RAISED'] || 0) + (statusCounts['RE_SCRUTINY_PENDING'] || 0) || 1, color: '#E9A126' },
  ];

  // Region breakdown
  const regionData = [
    { region: 'North-Western', total: 42, approved: 28, scrutiny: 10, evc: 4 },
    { region: 'Southern', total: 58, approved: 44, scrutiny: 8, evc: 6 },
    { region: 'Western', total: 39, approved: 29, scrutiny: 6, evc: 4 },
    { region: 'Northern', total: 34, approved: 21, scrutiny: 9, evc: 4 },
    { region: 'Eastern', total: 24, approved: 14, scrutiny: 7, evc: 3 },
  ];

  // Monthly submission trends
  const trendData = [
    { month: 'Jun', submissions: 120, clearances: 80 },
    { month: 'Jul', submissions: 280, clearances: 190 },
    { month: 'Aug', submissions: 450, clearances: 340 },
    { month: 'Sep', submissions: 610, clearances: 520 },
    { month: 'Oct', submissions: 780, clearances: 710 },
    { month: 'Nov (Proj)', submissions: 920, clearances: 860 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Status Distribution Donut */}
      <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Application Status Distribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Live national approval pipeline</p>
        </div>

        <div className="h-64 w-full my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  borderRadius: '8px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
          {pieData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
              <span className="text-slate-600 truncate text-[11px]">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Region-Wise Application Statistics */}
      <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Regional Bureau Scrutiny & Approval Performance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Throughput across AICTE regional offices</p>
          </div>
          <span className="text-[11px] font-semibold text-parikalp-primary bg-parikalp-lightblue px-2.5 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
            Avg Turnaround: 11.4 Days
          </span>
        </div>

        <div className="h-64 w-full my-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData} barGap={4}>
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
              <Bar dataKey="approved" name="Approved (LOA/EOA)" fill="#16A36A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="scrutiny" name="Under Scrutiny" fill="#1456A0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="evc" name="EVC Inspection" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Benchmark SLA: Max 21 days from submission to final order</span>
          <span className="font-semibold text-emerald-600">92.4% On-Time Adherence</span>
        </div>
      </div>

      {/* 3. Monthly Submission & Clearance Trajectory */}
      <div className="lg:col-span-12 bg-white p-5 rounded-xl border border-slate-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              National Approval Processing & Clearance Velocity
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Cumulative monthly intake and regulatory decisions</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-1 bg-parikalp-primary rounded-full"></span> Submissions
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-1 bg-emerald-500 rounded-full"></span> Clearances
            </span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1456A0" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1456A0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorClear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A36A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#16A36A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
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
              <Area type="monotone" dataKey="submissions" stroke="#1456A0" fillOpacity={1} fill="url(#colorSub)" strokeWidth={2} />
              <Area type="monotone" dataKey="clearances" stroke="#16A36A" fillOpacity={1} fill="url(#colorClear)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

