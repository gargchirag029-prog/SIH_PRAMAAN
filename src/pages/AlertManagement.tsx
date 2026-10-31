import React, { useState } from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import { alertService } from '../services/alertService';
import { useNotification } from '../context/NotificationContext';
import { StatusBadge } from '../components/shared/StatusBadge';
import { AlertItem, EscalationLevel } from '../types/alerts';
import {
  BellRing,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Smartphone,
  ShieldAlert,
  Send,
  Sliders,
} from 'lucide-react';

export const AlertManagement: React.FC = () => {
  const { alerts, refreshData } = useParikalpData();
  const { showToast } = useNotification();

  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'RESOLVED' | 'RULES'>('ACTIVE');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const rules = alertService.getRules();

  const handleEscalate = (alertId: string) => {
    const updated = alertService.escalate(alertId);
    refreshData();
    if (updated) {
      showToast(
        'warning',
        'Alert Escalated',
        `Alert "${updated.title}" escalated to ${updated.escalationLevel}. Priority SMS/Email dispatched.`
      );
    }
  };

  const handleResolve = (alertId: string) => {
    alertService.resolve(alertId);
    refreshData();
    showToast('success', 'Alert Resolved', 'Alert marked as resolved.');
  };

  const filteredAlerts = alerts.filter(a => {
    if (activeTab === 'ACTIVE') return a.status === 'ACTIVE' || a.status === 'ESCALATED';
    if (activeTab === 'RESOLVED') return a.status === 'RESOLVED';
    return true;
  }).filter(a => {
    if (filterPriority === 'ALL') return true;
    return a.priority === filterPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              SLA Monitoring & Automated Intervention
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">3-Tier Escalation Hierarchy</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BellRing className="w-6 h-6 text-rose-600" />
            Real-Time Alerts & Statutory Escalation Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Eliminate administrative pendency and compliance lapses through automated SLA tracking. Three-tier escalation matrix: Level 1 (Officer) → Level 2 (Regional Authority) → Level 3 (AICTE HQ / Member Secretary).
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'ACTIVE'
                ? 'bg-parikalp-primary text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Active & Escalated Alerts ({alerts.filter(a => a.status !== 'RESOLVED').length})
          </button>
          <button
            onClick={() => setActiveTab('RESOLVED')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'RESOLVED'
                ? 'bg-parikalp-primary text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Resolved Archive ({alerts.filter(a => a.status === 'RESOLVED').length})
          </button>
          <button
            onClick={() => setActiveTab('RULES')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'RULES'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Configurable Escalation Rules
          </button>
        </div>

        {activeTab !== 'RULES' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Filter Priority:</span>
            <select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value)}
              className="border border-slate-300 rounded-lg p-1.5 bg-white text-xs font-medium"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        )}
      </div>

      {/* Main Alert List */}
      {activeTab !== 'RULES' && (
        <div className="space-y-4">
          {filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border shadow-card transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                alert.priority === 'CRITICAL'
                  ? 'bg-rose-50/60 border-rose-200 ring-1 ring-rose-300'
                  : alert.escalationLevel === 'LEVEL_3_AICTE_HQ'
                  ? 'bg-purple-50/50 border-purple-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      alert.priority === 'CRITICAL'
                        ? 'bg-rose-600 text-white'
                        : alert.priority === 'HIGH'
                        ? 'bg-amber-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {alert.priority}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {alert.title}
                  </span>
                  {alert.applicationRef && (
                    <span className="font-mono text-xs font-bold text-parikalp-primary bg-slate-100 px-2 py-0.5 rounded">
                      {alert.applicationRef}
                    </span>
                  )}
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
                    {alert.escalationLevel}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
                  {alert.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span>Institution: <strong className="text-slate-800">{alert.institutionName}</strong></span>
                  <span>Responsible: <strong className="text-slate-800">{alert.responsibleOfficer}</strong></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Due Date: <strong className="text-slate-800">{alert.dueDate}</strong>
                  </span>
                </div>

                {/* Escalation Notification Dispatch Log */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-3 text-[10px] text-slate-500">
                  <span className="font-semibold text-slate-600">Dispatched To:</span>
                  {alert.escalationHistory.map((hist, idx) => (
                    <span key={idx} className="flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                      {hist.channel === 'SMS' ? <Smartphone className="w-2.5 h-2.5 text-blue-600" /> : <Mail className="w-2.5 h-2.5 text-amber-600" />}
                      <span>{hist.notifiedTo}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
                {alert.status !== 'RESOLVED' && (
                  <>
                    <button
                      onClick={() => handleEscalate(alert.id)}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                      title="Escalate to next statutory authority"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      Escalate Level
                    </button>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Resolve
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {filteredAlerts.length === 0 && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 text-xs">
              No alerts found under this view.
            </div>
          )}
        </div>
      )}

      {/* Escalation Rules Configuration Tab */}
      {activeTab === 'RULES' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Statutory Escalation Rules & SLA Threshold Configuration
              </h3>
              <p className="text-xs text-slate-500">
                Define regulatory deadlines and automated notifications across tiers
              </p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2.5 py-1 rounded-full">
              Auto-Escalation Daemon Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Regulatory Category</th>
                  <th className="py-2.5 px-3">Level 1 (Officer)</th>
                  <th className="py-2.5 px-3">Level 2 (Regional Director)</th>
                  <th className="py-2.5 px-3">Level 3 (AICTE HQ / Member Sec)</th>
                  <th className="py-2.5 px-3 text-center">SMS Gateway</th>
                  <th className="py-2.5 px-3 text-center">Auto Escalate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rules.map(rule => (
                  <tr key={rule.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {rule.category.replace(/_/g, ' ')}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-800">{rule.thresholdDaysLevel1} Days</span>
                      <span className="text-[10px] text-slate-500 block">{rule.recipientLevel1}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-amber-700">{rule.thresholdDaysLevel2} Days</span>
                      <span className="text-[10px] text-slate-500 block">{rule.recipientLevel2}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-rose-700">{rule.thresholdDaysLevel3} Days</span>
                      <span className="text-[10px] text-slate-500 block">{rule.recipientLevel3}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700">
                        Enabled
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-blue-50 text-blue-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

