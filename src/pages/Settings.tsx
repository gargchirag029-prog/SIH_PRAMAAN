import React from 'react';
import { useParikalpData } from '../context/ParikalpDataContext';
import { alertService } from '../services/alertService';
import { useNotification } from '../context/NotificationContext';
import {
  Settings as SettingsIcon,
  RotateCcw,
  Sliders,
  ShieldCheck,
  Bell,
  Sparkles,
  Server,
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { resetDemoData } = useParikalpData();
  const { showToast } = useNotification();
  const rules = alertService.getRules();

  const handleReset = () => {
    if (window.confirm('Reset PRAMAAN to the fresh 15-step demonstration dataset?')) {
      resetDemoData();
      showToast('info', 'Store Reset', 'Demo data re-initialized.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block">
              System Configuration
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">Regulatory Policies & Demo Controls</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <SettingsIcon className="w-6 h-6 text-parikalp-primary" />
            Platform Settings & SLA Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Configure automated escalation dispatch rules, SMS/Email notification gateways, and presentation resets for SIH 2026 jury demonstrations.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Demo State
        </button>
      </div>

      {/* Demonstration Workflow Guide for Judges */}
      <div className="bg-gradient-to-r from-blue-900 via-parikalp-navy to-slate-900 text-white rounded-2xl p-6 border border-blue-800 shadow-elevated space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            PRAMAAN • 15-Step Interactive Regulatory Lifecycle Walkthrough
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          PRAMAAN is configured with pre-seeded test records allowing you to demonstrate the complete regulatory lifecycle in under 3 minutes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <strong className="text-sky-300 block mb-1">Phase 1: Intake & Discrepancy</strong>
            <p className="text-[11px] text-slate-300">
              Institution submits application → Officer performs scrutiny → Flag expired Fire NOC discrepancy → Institution re-uploads renewed certificate.
            </p>
          </div>

          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <strong className="text-sky-300 block mb-1">Phase 2: EVC & Inspection</strong>
            <p className="text-[11px] text-slate-300">
              Scrutiny clears → Schedule EVC inspection team with conflict check → Committee conducts visit & submits 94/100 geotagged dossier.
            </p>
          </div>

          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <strong className="text-sky-300 block mb-1">Phase 3: Decision & Surveillance</strong>
            <p className="text-[11px] text-slate-300">
              SAC reviews dossier → Committee Chairman grants approval → Official LOA order with QR code generated → Continuous compliance monitoring activated.
            </p>
          </div>
        </div>
      </div>

      {/* Notification Gateways & Technical Architecture */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Connected Backend Architecture & Gateway Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <Server className="w-4 h-4 text-emerald-600" />
              FastAPI REST Services:
            </span>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-semibold inline-block">
              Operational / In-Memory Mock Hybrid
            </span>
            <p className="text-[11px] text-slate-500">
              REST APIs with full PostgreSQL data model compatibility and local client cache fallback.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Private Object Storage:
            </span>
            <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono font-semibold inline-block">
              AES-256 S3 Protocol Simulated
            </span>
            <p className="text-[11px] text-slate-500">
              Encrypted document storage with access control checks and SHA-256 integrity signatures.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-amber-600" />
              Notification Gateways:
            </span>
            <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono font-semibold inline-block">
              NIC SMS & SMTP Daemon Active
            </span>
            <p className="text-[11px] text-slate-500">
              Automated multi-channel alerts with 3-tier escalation triggers on deadline lapse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

