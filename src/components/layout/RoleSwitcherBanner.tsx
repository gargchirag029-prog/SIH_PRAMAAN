import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { UserRole } from '../../types/user';
import {
  Building2,
  FileCheck2,
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  Users,
} from 'lucide-react';

export const RoleSwitcherBanner: React.FC = () => {
  const { user, role, switchRole } = useAuth();
  const { resetDemoData } = useParikalpData();

  const roles: { id: UserRole; label: string; icon: any; desc: string; badge: string }[] = [
    {
      id: 'institution',
      label: 'Institution Portal',
      icon: Building2,
      desc: 'Technical Institutes & Colleges',
      badge: 'Applicant Access',
    },
    {
      id: 'officer',
      label: 'Regional Officer Portal',
      icon: FileCheck2,
      desc: 'Document Scrutiny & Verification',
      badge: 'Scrutiny Officer',
    },
    {
      id: 'admin',
      label: 'Admin / Committee Portal',
      icon: ShieldAlert,
      desc: 'AICTE HQ, EVC & SAC Decisions',
      badge: 'Executive Oversight',
    },
  ];

  return (
    <div className="bg-parikalp-navy text-white px-4 sm:px-6 lg:px-8 py-2.5 border-b border-parikalp-darkborder shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Current Active Role Badge */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Active Portal:
            </span>
          </div>

          <div className="bg-white/10 px-3 py-1 rounded-md border border-white/15 flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-400" />
            <div className="leading-tight">
              <span className="text-xs font-bold text-white block">
                {user.name} ({user.designation})
              </span>
              <span className="text-[10px] text-sky-200">
                {user.institutionName || `${user.department} • ${user.region}`}
              </span>
            </div>
          </div>
        </div>

        {/* Center/Right: Quick 1-Click Role Switcher */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          <span className="text-[11px] text-slate-400 hidden xl:inline">Switch Perspective:</span>
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-parikalp-primary text-white ring-2 ring-sky-400/50 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
                title={r.desc}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-slate-400'}`} />
                <span>{r.label}</span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-0.5" />}
              </button>
            );
          })}

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all PARIKALP state to default demonstration dataset?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-rose-900/50 hover:text-rose-200 border border-slate-700 transition-colors ml-1"
            title="Reset storage to default 15-step demo workflow"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

