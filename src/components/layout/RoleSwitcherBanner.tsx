import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
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
  const { language, t } = useAccessibility();

  const roles: { id: UserRole; labelEn: string; labelHi: string; icon: any; desc: string; badge: string }[] = [
    {
      id: 'institution',
      labelEn: 'Institution Portal',
      labelHi: 'संस्थान पोर्टल',
      icon: Building2,
      desc: 'Technical Institutes & Colleges',
      badge: 'Applicant Access',
    },
    {
      id: 'officer',
      labelEn: 'Regional Officer Portal',
      labelHi: 'क्षेत्रीय अधिकारी पोर्टल',
      icon: FileCheck2,
      desc: 'Document Scrutiny & Verification',
      badge: 'Scrutiny Officer',
    },
    {
      id: 'admin',
      labelEn: 'Admin / Committee Portal',
      labelHi: 'प्रशासनिक / समिति पोर्टल',
      icon: ShieldAlert,
      desc: 'AICTE HQ, EVC & SAC Decisions',
      badge: 'Executive Oversight',
    },
  ];

  return (
    <div className="bg-white text-slate-800 px-4 sm:px-6 lg:px-8 py-2.5 border-b border-slate-200 shadow-xs select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Current Active Role Badge */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t('activePortal', 'Active Portal:')}
            </span>
          </div>

          <div className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 flex items-center gap-2 shadow-xs">
            <Users className="w-4 h-4 text-mygov-blue" />
            <div className="leading-tight">
              <span className="text-xs font-bold text-slate-900 block">
                {user.name} ({user.designation})
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {user.institutionName || `${user.department} • ${user.region}`}
              </span>
            </div>
          </div>
        </div>

        {/* Center/Right: Quick 1-Click Role Switcher */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          <span className="text-[11px] text-slate-500 font-medium hidden xl:inline">
            {t('roleView', 'Role View:')}
          </span>
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-orange-50 text-mygov-orange border border-orange-300 ring-2 ring-orange-200 shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
                title={r.desc}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-mygov-orange' : 'text-slate-500'}`} />
                <span>{language === 'hi' ? r.labelHi : r.labelEn}</span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-mygov-green ml-0.5" />}
              </button>
            );
          })}

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all PRAMAAN state to default demonstration dataset?')) {
                resetDemoData();
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-50 hover:bg-rose-50 hover:text-rose-700 border border-slate-200 transition-colors ml-1"
            title="Reset storage to default 15-step demo workflow"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">{language === 'hi' ? 'रीसेट' : 'Reset'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};


