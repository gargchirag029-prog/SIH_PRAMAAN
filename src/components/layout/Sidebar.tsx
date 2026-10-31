import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  FileSearch,
  ShieldCheck,
  CalendarDays,
  Gavel,
  ShieldAlert,
  FolderLock,
  BellRing,
  BarChart3,
  History,
  Users2,
  Settings,
  Building,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role, user } = useAuth();
  const { metrics, alerts } = useParikalpData();
  const { language } = useAccessibility();

  const sectionTitles: Record<string, { en: string; hi: string }> = {
    'Command Centre': { en: 'Command Centre', hi: 'नियंत्रण केंद्र' },
    'Approvals & Workflows': { en: 'Approvals & Workflows', hi: 'अनुमोदन एवं कार्यप्रवाह' },
    'Compliance & Governance': { en: 'Compliance & Governance', hi: 'अनुपालन एवं सुशासन' },
    'Platform Administration': { en: 'Platform Administration', hi: 'प्रशासन एवं सेटिंग्स' },
  };

  const navItemTranslations: Record<string, { en: string; hi: string }> = {
    'Overview Dashboard': { en: 'Overview Dashboard', hi: 'मुख्य डैशबोर्ड' },
    'My Institution Profile': { en: 'My Institution Profile', hi: 'संस्थान प्रोफ़ाइल' },
    'Officer Queue': { en: 'Officer Queue', hi: 'संवीक्षा कतार' },
    'Executive HQ Desk': { en: 'Executive HQ Desk', hi: 'मुख्यालय कार्यकारी पटल' },
    'Application Queue': { en: 'Application Queue', hi: 'आवेदन सूची' },
    'Submit Application': { en: 'Submit Application', hi: 'नया आवेदन करें' },
    'Scrutiny Workspace': { en: 'Scrutiny Workspace', hi: 'संवीक्षा कार्यक्षेत्र' },
    'AI Document Verification': { en: 'AI Document Verification', hi: 'दस्तावेज़ सत्यापन' },
    'EVC Management': { en: 'EVC Management', hi: 'विशेषज्ञ समिति (EVC)' },
    'Committee Review (SAC)': { en: 'Committee Review (SAC)', hi: 'अपीलीय समिति (SAC)' },
    'Compliance Monitoring': { en: 'Compliance Monitoring', hi: 'सतत अनुपालन' },
    'Document Validity Vault': { en: 'Document Validity Vault', hi: 'दस्तावेज़ वैधता केंद्र' },
    'Alerts & Escalations': { en: 'Alerts & Escalations', hi: 'सूचनाएं एवं प्राथमिकता' },
    'Analytics & Reports': { en: 'Analytics & Reports', hi: 'रिपोर्ट एवं सांख्यिकी' },
    'Audit Logs & Trail': { en: 'Audit Logs & Trail', hi: 'ऑडिट लॉग्स' },
    'User & Role Access': { en: 'User & Role Access', hi: 'उपयोगकर्ता प्रबंधन' },
    'Settings & SLA Matrix': { en: 'Settings & SLA Matrix', hi: 'सेटिंग्स एवं नियमावली' },
  };

  const activeAlertsCount = alerts.filter(a => a.status === 'ACTIVE' || a.status === 'ESCALATED').length;

  const navItems = [
    {
      title: 'Command Centre',
      items: [
        {
          name: 'Overview Dashboard',
          to: '/',
          icon: LayoutDashboard,
          roles: ['institution', 'officer', 'admin'],
        },
        {
          name: 'My Institution Profile',
          to: '/institution-portal',
          icon: Building,
          roles: ['institution'],
        },
        {
          name: 'Officer Queue',
          to: '/officer-portal',
          icon: FileSearch,
          roles: ['officer'],
        },
        {
          name: 'Executive HQ Desk',
          to: '/admin-portal',
          icon: Gavel,
          roles: ['admin'],
        },
      ],
    },
    {
      title: 'Approvals & Workflows',
      items: [
        {
          name: 'Application Queue',
          to: '/applications',
          icon: FileText,
          badge: metrics.totalApplications,
          roles: ['institution', 'officer', 'admin'],
        },
        {
          name: 'Submit Application',
          to: '/submit-application',
          icon: FilePlus,
          badge: 'New',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          roles: ['institution', 'admin'],
        },
        {
          name: 'Scrutiny Workspace',
          to: '/scrutiny',
          icon: FileSearch,
          badge: metrics.underScrutiny,
          badgeColor: 'bg-blue-100 text-blue-800',
          roles: ['officer', 'admin'],
        },
        {
          name: 'AI Document Verification',
          to: '/verification',
          icon: ShieldCheck,
          roles: ['officer', 'admin', 'institution'],
        },
        {
          name: 'EVC Management',
          to: '/evc',
          icon: CalendarDays,
          badge: metrics.evcScheduled,
          badgeColor: 'bg-indigo-100 text-indigo-800',
          roles: ['officer', 'admin'],
        },
        {
          name: 'Committee Review (SAC)',
          to: '/committee',
          icon: Gavel,
          badge: metrics.awaitingCommittee,
          badgeColor: 'bg-purple-100 text-purple-800',
          roles: ['admin'],
        },
      ],
    },
    {
      title: 'Compliance & Governance',
      items: [
        {
          name: 'Compliance Monitoring',
          to: '/compliance',
          icon: ShieldAlert,
          badge: metrics.pendingComplianceActions > 0 ? metrics.pendingComplianceActions : undefined,
          badgeColor: 'bg-amber-100 text-amber-800',
          roles: ['institution', 'officer', 'admin'],
        },
        {
          name: 'Document Validity Vault',
          to: '/documents',
          icon: FolderLock,
          roles: ['institution', 'officer', 'admin'],
        },
        {
          name: 'Alerts & Escalations',
          to: '/alerts',
          icon: BellRing,
          badge: activeAlertsCount,
          badgeColor: 'bg-rose-100 text-rose-800',
          roles: ['institution', 'officer', 'admin'],
        },
        {
          name: 'Analytics & Reports',
          to: '/reports',
          icon: BarChart3,
          roles: ['officer', 'admin'],
        },
      ],
    },
    {
      title: 'Platform Administration',
      items: [
        {
          name: 'Audit Logs & Trail',
          to: '/audit',
          icon: History,
          roles: ['officer', 'admin'],
        },
        {
          name: 'User & Role Access',
          to: '/users',
          icon: Users2,
          roles: ['admin'],
        },
        {
          name: 'Settings & SLA Matrix',
          to: '/settings',
          icon: Settings,
          roles: ['admin', 'officer'],
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white text-slate-700 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto flex flex-col border-r border-slate-200 shadow-xs select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <img
              src="/pramaan-logo.jpg"
              alt="PRAMAAN Logo"
              className="h-8 w-auto max-w-[90px] object-contain rounded border border-slate-200/80 bg-white p-0.5 shadow-2xs"
            />
            <div>
              <span className="font-extrabold text-sm text-slate-900 tracking-tight block">
                PRAMAAN
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {language === 'hi' ? 'प्रमाण • एआईसीटीई हब' : 'AICTE Approval Hub'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-600 p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navItems.map((section, sIdx) => {
            // Filter items by active user role
            const visibleItems = section.items.filter(item => item.roles.includes(role));
            if (visibleItems.length === 0) return null;

            return (
              <div key={sIdx}>
                <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {sectionTitles[section.title]?.[language] || section.title}
                </h4>
                <ul className="space-y-1">
                  {visibleItems.map((item, iIdx) => {
                    const Icon = item.icon;
                    return (
                      <li key={iIdx}>
                        <NavLink
                          to={item.to}
                          onClick={() => {
                            if (window.innerWidth < 1024) onClose();
                          }}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                              isActive
                                ? 'bg-orange-50 text-mygov-orange font-bold border-l-4 border-l-mygov-orange shadow-xs'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <div className="flex items-center gap-2.5 truncate">
                                <Icon
                                  className={`w-4 h-4 flex-shrink-0 ${
                                    isActive ? 'text-mygov-orange' : 'text-slate-500'
                                  }`}
                                />
                                <span className="truncate">
                                  {navItemTranslations[item.name]?.[language] || item.name}
                                </span>
                              </div>
                              {item.badge !== undefined && (
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    item.badgeColor || 'bg-slate-100 text-slate-600 border border-slate-200'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200 text-xs shadow-xs">
            <div className="w-7 h-7 rounded-full bg-mygov-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-slate-900 font-bold truncate text-[11px]">{user.name}</p>
              <p className="text-slate-500 text-[10px] truncate capitalize font-medium">
                {user.role} • {user.region || 'HQ'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

