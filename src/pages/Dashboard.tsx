import React from 'react';
import { MyGovHeroCarousel } from '../components/dashboard/MyGovHeroCarousel';
import { CitizenQuickServices } from '../components/dashboard/CitizenQuickServices';
import { HowItWorksSteps } from '../components/dashboard/HowItWorksSteps';
import { OfficialNoticeBoard } from '../components/dashboard/OfficialNoticeBoard';
import { KPICards } from '../components/dashboard/KPICards';
import { AnalyticsCharts } from '../components/dashboard/AnalyticsCharts';
import { EVCSummaryWidget } from '../components/dashboard/EVCSummaryWidget';
import { ComplianceWidget } from '../components/dashboard/ComplianceWidget';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import { FAQAccordion } from '../components/shared/FAQAccordion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user, role } = useAuth();

  return (
    <div className="space-y-8 pb-6 font-sans">
      {/* 1. Official MyGov-style Hero Carousel with Real Photos & Human Language */}
      <MyGovHeroCarousel />

      {/* 2. Instant Application Status Tracker & 4 Core Services for New Users */}
      <CitizenQuickServices />

      {/* 3. "How It Works" — Simple 4-Step Walkthrough for Institutions */}
      <HowItWorksSteps />

      {/* 4. Official Notice Board & Public Circulars (With Download PDF Links) */}
      <OfficialNoticeBoard />

      {/* 5. Key Approval & Pendency KPI Cards */}
      <KPICards />

      {/* 6. Approval Analytics Visualizations */}
      <AnalyticsCharts />

      {/* 7. Operational Oversight: EVC Schedule & Compliance Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EVCSummaryWidget />
        <ComplianceWidget />
      </div>

      {/* 8. Recent Application Activity Feed */}
      <RecentActivityFeed />

      {/* 9. Approval Process Guidelines & Statutory FAQs */}
      <FAQAccordion />
    </div>
  );
};
