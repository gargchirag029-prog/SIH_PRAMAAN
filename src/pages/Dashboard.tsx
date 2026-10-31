import React from 'react';
import { KPICards } from '../components/dashboard/KPICards';
import { AnalyticsCharts } from '../components/dashboard/AnalyticsCharts';
import { EVCSummaryWidget } from '../components/dashboard/EVCSummaryWidget';
import { ComplianceWidget } from '../components/dashboard/ComplianceWidget';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import { BeforeAfterInspectionSlider } from '../components/shared/BeforeAfterInspectionSlider';
import { CampusInfrastructureInspector } from '../components/shared/CampusInfrastructureInspector';
import { FAQAccordion } from '../components/shared/FAQAccordion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  FilePlus,
  FileCheck2,
  Calendar,
  ShieldCheck,
  Building,
  Gavel,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, role } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome & Context Banner */}
      <div className="bg-gradient-to-r from-parikalp-navy via-slate-900 to-parikalp-primary text-white rounded-2xl p-6 shadow-elevated border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-sky-500/20 text-sky-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-sky-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              National AICTE Approval Session 2026-27
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">•</span>
            <span className="text-slate-300 text-xs hidden sm:inline">
              Single-Window Workflow & Compliance Automation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            PARIKALP Command Centre
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Welcome, <strong className="text-white">{user.name}</strong> ({user.designation}).
            Active portal: <span className="text-sky-300 font-semibold capitalize">{role}</span>.
            Real-time scrutiny status, EVC inspections, and institutional compliance are synchronized.
          </p>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <Link
            to="/submit-application"
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <FilePlus className="w-4 h-4" />
            New Application
          </Link>
          <Link
            to="/scrutiny"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 border border-white/20 transition-all"
          >
            <FileCheck2 className="w-4 h-4" />
            Review Applications
          </Link>
          <Link
            to="/evc"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 border border-white/20 transition-all"
          >
            <Calendar className="w-4 h-4" />
            Schedule EVC
          </Link>
        </div>
      </div>

      {/* 1. Main KPI Metrics Cards */}
      <KPICards />

      {/* 2. Interactive Analytics Visualizations */}
      <AnalyticsCharts />

      {/* 3. Operational Grid: EVC Monitoring & Continuous Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EVCSummaryWidget />
        <ComplianceWidget />
      </div>

      {/* 4. Interactive Inspection & AI Intelligence Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BeforeAfterInspectionSlider />
        <CampusInfrastructureInspector />
      </div>

      {/* 5. Real-time Governance Audit Feed */}
      <RecentActivityFeed />

      {/* 6. Regulatory Guidelines & Compliance FAQ Accordion */}
      <FAQAccordion />
    </div>
  );
};

