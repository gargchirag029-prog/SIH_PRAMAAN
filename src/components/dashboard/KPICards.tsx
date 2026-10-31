import React from 'react';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { MetricCard } from '../shared/MetricCard';
import {
  FileText,
  FileSearch,
  RotateCcw,
  CalendarDays,
  FileCheck2,
  Gavel,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const KPICards: React.FC = () => {
  const { metrics } = useParikalpData();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Applications"
        value={metrics.totalApplications}
        subtitle="National Submissions 2026-27"
        icon={FileText}
        trend={{ value: "+18%", isPositive: true, label: "vs last cycle" }}
        variant="default"
        onClick={() => navigate('/applications')}
      />

      <MetricCard
        title="Under Scrutiny"
        value={metrics.underScrutiny}
        subtitle="Assigned to Regional Bureaus"
        icon={FileSearch}
        trend={{ value: "48h SLA", isPositive: true }}
        variant="primary"
        onClick={() => navigate('/scrutiny')}
      />

      <MetricCard
        title="Awaiting Re-scrutiny"
        value={metrics.rescrutinyPending}
        subtitle="Discrepancy Responses Filed"
        icon={RotateCcw}
        trend={{ value: "Pending Verification", isPositive: false }}
        variant="warning"
        onClick={() => navigate('/scrutiny')}
      />

      <MetricCard
        title="EVCs Scheduled"
        value={metrics.evcScheduled}
        subtitle="Active Expert Inspection Teams"
        icon={CalendarDays}
        trend={{ value: "3 Visits this week", isPositive: true }}
        variant="default"
        onClick={() => navigate('/evc')}
      />

      <MetricCard
        title="EVC Reports Pending"
        value={metrics.evcReportsPending}
        subtitle="Post-Inspection Dossiers"
        icon={FileCheck2}
        trend={{ value: "Due in 72 hours", isPositive: false }}
        variant="warning"
        onClick={() => navigate('/evc')}
      />

      <MetricCard
        title="Awaiting Committee"
        value={metrics.awaitingCommittee}
        subtitle="SAC / SHC Approval Queue"
        icon={Gavel}
        trend={{ value: "Agenda M5 Scheduled", isPositive: true }}
        variant="primary"
        onClick={() => navigate('/committee')}
      />

      <MetricCard
        title="Approved Applications"
        value={metrics.approvedCount}
        subtitle="LOA / EOA Letters Issued"
        icon={CheckCircle2}
        trend={{ value: "100% Digital Seals", isPositive: true }}
        variant="success"
        onClick={() => navigate('/applications?status=APPROVED')}
      />

      <MetricCard
        title="Pending Compliance"
        value={metrics.pendingComplianceActions}
        subtitle="Expiring / Overdue Items"
        icon={AlertTriangle}
        trend={{ value: "Requires Escalation", isPositive: false }}
        variant="danger"
        onClick={() => navigate('/compliance')}
      />
    </div>
  );
};

