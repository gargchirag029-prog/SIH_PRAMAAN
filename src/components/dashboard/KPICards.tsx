import React from 'react';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
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
  const { language } = useAccessibility();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title={language === 'hi' ? 'कुल आवेदन' : 'Total Applications'}
        value={metrics.totalApplications}
        subtitle={language === 'hi' ? 'राष्ट्रीय सबमिशन 2026-27' : 'National Submissions 2026-27'}
        icon={FileText}
        trend={{ value: "+18%", isPositive: true, label: language === 'hi' ? 'पिछले चक्र की तुलना में' : 'vs last cycle' }}
        variant="default"
        onClick={() => navigate('/applications')}
      />

      <MetricCard
        title={language === 'hi' ? 'संवीक्षाधीन' : 'Under Scrutiny'}
        value={metrics.underScrutiny}
        subtitle={language === 'hi' ? 'क्षेत्रीय ब्यूरो को आवंटित' : 'Assigned to Regional Bureaus'}
        icon={FileSearch}
        trend={{ value: "48h SLA", isPositive: true }}
        variant="primary"
        onClick={() => navigate('/scrutiny')}
      />

      <MetricCard
        title={language === 'hi' ? 'पुनः संवीक्षा प्रतीक्षारत' : 'Awaiting Re-scrutiny'}
        value={metrics.rescrutinyPending}
        subtitle={language === 'hi' ? 'विसंगति उत्तर जमा' : 'Discrepancy Responses Filed'}
        icon={RotateCcw}
        trend={{ value: language === 'hi' ? 'सत्यापन लंबित' : 'Pending Verification', isPositive: false }}
        variant="warning"
        onClick={() => navigate('/scrutiny')}
      />

      <MetricCard
        title={language === 'hi' ? 'निर्धारित EVC' : 'EVCs Scheduled'}
        value={metrics.evcScheduled}
        subtitle={language === 'hi' ? 'सक्रिय विशेषज्ञ निरीक्षण दल' : 'Active Expert Inspection Teams'}
        icon={CalendarDays}
        trend={{ value: language === 'hi' ? 'इस सप्ताह 3 दौरे' : '3 Visits this week', isPositive: true }}
        variant="default"
        onClick={() => navigate('/evc')}
      />

      <MetricCard
        title={language === 'hi' ? 'लंबित EVC रिपोर्ट' : 'EVC Reports Pending'}
        value={metrics.evcReportsPending}
        subtitle={language === 'hi' ? 'निरीक्षण उपरांत डोज़ियर' : 'Post-Inspection Dossiers'}
        icon={FileCheck2}
        trend={{ value: language === 'hi' ? '72 घंटे शेष' : 'Due in 72 hours', isPositive: false }}
        variant="warning"
        onClick={() => navigate('/evc')}
      />

      <MetricCard
        title={language === 'hi' ? 'समिति समीक्षा प्रतीक्षारत' : 'Awaiting Committee'}
        value={metrics.awaitingCommittee}
        subtitle={language === 'hi' ? 'SAC / SHC अनुमोदन कतार' : 'SAC / SHC Approval Queue'}
        icon={Gavel}
        trend={{ value: language === 'hi' ? 'बैठक M5 निर्धारित' : 'Agenda M5 Scheduled', isPositive: true }}
        variant="primary"
        onClick={() => navigate('/committee')}
      />

      <MetricCard
        title={language === 'hi' ? 'स्वीकृत आवेदन' : 'Approved Applications'}
        value={metrics.approvedCount}
        subtitle={language === 'hi' ? 'LOA / EOA पत्र जारी' : 'LOA / EOA Letters Issued'}
        icon={CheckCircle2}
        trend={{ value: language === 'hi' ? '100% डिजिटल सील' : '100% Digital Seals', isPositive: true }}
        variant="success"
        onClick={() => navigate('/applications?status=APPROVED')}
      />

      <MetricCard
        title={language === 'hi' ? 'लंबित अनुपालन' : 'Pending Compliance'}
        value={metrics.pendingComplianceActions}
        subtitle={language === 'hi' ? 'समाप्त / अतिदेय मामले' : 'Expiring / Overdue Items'}
        icon={AlertTriangle}
        trend={{ value: language === 'hi' ? 'प्राथमिकता आवश्यक' : 'Requires Escalation', isPositive: false }}
        variant="danger"
        onClick={() => navigate('/compliance')}
      />
    </div>
  );
};

