import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GovHeader } from './GovHeader';
import { TickerBanner } from './TickerBanner';
import { RoleSwitcherBanner } from './RoleSwitcherBanner';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { ToastContainer } from '../shared/Toast';
import { AIChatAssistant } from '../shared/AIChatAssistant';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-parikalp-bg text-parikalp-text font-sans">
      {/* 1. Official Government of India Header */}
      <GovHeader />

      {/* 2. Real-time Regulatory Ticker Banner */}
      <TickerBanner />

      {/* 3. Interactive 3-Portal Role Switcher Bar */}
      <RoleSwitcherBanner />

      {/* 4. Platform Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

      {/* 5. Main Body: Sidebar + Dynamic Page Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* 6. National Portal Footer */}
      <Footer />

      {/* 7. Real-time Toast System */}
      <ToastContainer />

      {/* 8. Floating AICTE Regulatory Intelligence AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
};

