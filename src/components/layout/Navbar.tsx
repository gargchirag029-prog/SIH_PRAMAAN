import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  Bell,
  Search,
  PlusCircle,
  FileCheck2,
  Calendar,
  ShieldCheck,
  ChevronDown,
  LogOut,
  ExternalLink,
  AlertTriangle,
  KeyRound,
} from 'lucide-react';

export const Navbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const { user, role, switchRole } = useAuth();
  const { alerts, applications } = useParikalpData();
  const { language, t } = useAccessibility();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE' || a.status === 'ESCALATED');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/applications?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile hamburger + Main Branding */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/pramaan-logo.jpg"
                alt="PRAMAAN Logo"
                className="h-10 w-auto max-w-[120px] object-contain rounded-lg border border-slate-200/80 shadow-xs group-hover:scale-105 transition-transform bg-white"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-mygov-navy tracking-tight">
                    PRAMAAN
                  </span>
                  <span className="bg-orange-100 text-mygov-orange text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-200">
                    AICTE • MyGov
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium tracking-tight line-clamp-1">
                  {language === 'hi'
                    ? 'प्रमाण • संस्थागत अनुमोदन एवं सतत अनुपालन प्रणाली'
                    : 'प्रमाण • AICTE Approval Workflow & Compliance Monitoring'}
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Global Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={language === 'hi' ? 'आवेदन संदर्भ (उदा. APP-8492) या संस्थान खोजें...' : 'Search Application Ref (e.g. APP-8492) or Institution...'}
                  className="block w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-parikalp-primary/20 focus:border-parikalp-primary bg-slate-50/50 hover:bg-white transition-colors"
                />
              </div>
            </form>
          </div>

          {/* Right: Quick Action, Alerts, User Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Actions Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-parikalp-primary bg-parikalp-lightblue hover:bg-blue-100 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showQuickActions && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-modal border border-slate-200 py-1.5 z-40 text-xs"
                  onClick={() => setShowQuickActions(false)}
                >
                  <Link
                    to="/submit-application"
                    className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <PlusCircle className="w-4 h-4 text-blue-600" />
                    <span>{language === 'hi' ? 'नया आवेदन करें' : 'Submit New Application'}</span>
                  </Link>
                  <Link
                    to="/scrutiny"
                    className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'hi' ? 'संवीक्षा कतार खोलें' : 'Open Scrutiny Queue'}</span>
                  </Link>
                  <Link
                    to="/evc"
                    className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>{language === 'hi' ? 'EVC निरीक्षण निर्धारित करें' : 'Schedule EVC Inspection'}</span>
                  </Link>
                  <Link
                    to="/verification"
                    className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>{language === 'hi' ? 'एआई दस्तावेज़ सत्यापन' : 'AI Document Verification'}</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Active Alerts and Escalations"
              >
                <Bell className="w-5 h-5" />
                {activeAlerts.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white ring-2 ring-white">
                    {activeAlerts.length}
                  </span>
                )}
              </button>

              {/* Notification Menu */}
              {showNotifications && (
                <div
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-modal border border-slate-200 py-2 z-40"
                  onClick={() => setShowNotifications(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-800 text-xs">
                      Live Regulatory Alerts ({activeAlerts.length})
                    </span>
                    <Link
                      to="/alerts"
                      className="text-[11px] text-parikalp-primary font-medium hover:underline flex items-center gap-1"
                    >
                      View All Matrix
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {activeAlerts.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No active alerts pending.
                      </div>
                    ) : (
                      activeAlerts.slice(0, 4).map(alert => (
                        <div key={alert.id} className="p-3 hover:bg-slate-50 transition-colors text-xs">
                          <div className="flex items-start gap-2">
                            <AlertTriangle
                              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                alert.priority === 'CRITICAL'
                                  ? 'text-rose-600'
                                  : alert.priority === 'HIGH'
                                  ? 'text-amber-600'
                                  : 'text-blue-600'
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-800 truncate">{alert.title}</p>
                              <p className="text-slate-500 text-[11px] line-clamp-2 mt-0.5">
                                {alert.description}
                              </p>
                              <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                                <span>Ref: {alert.applicationRef || 'General'}</span>
                                <span className="font-medium text-slate-600">{alert.escalationLevel}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* MyGov-style MeriPehchan / RBAC SSO Login CTA */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-mygov-orange hover:bg-orange-600 shadow-sm transition-all hover:shadow-md transform active:scale-95"
              title="National Single Sign-On / MeriPehchan RBAC Login"
            >
              <KeyRound className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">{language === 'hi' ? 'मेरी पहचान' : 'MeriPehchan'}</span>
              <span>{language === 'hi' ? 'लॉगिन' : 'Login'}</span>
            </Link>

            {/* User Profile Pill & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-parikalp-navy text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden lg:block leading-tight">
                  <span className="text-xs font-bold text-slate-800 block truncate max-w-[130px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">{user.role} Portal</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
              </button>

              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-modal border border-slate-200 py-2 z-40 text-xs"
                  onClick={() => setShowUserMenu(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="font-bold text-slate-900">{user.name}</p>
                    <p className="text-[11px] text-slate-500">{user.email}</p>
                    <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold uppercase">
                      {user.role} role
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                    >
                      Settings & Escalations
                    </Link>
                    <Link
                      to="/audit"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                    >
                      Audit Trail & Logs
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <Link
                      to="/login"
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-parikalp-primary" />
                      RBAC Login & 2FA Auth
                    </Link>
                    <button
                      onClick={() => switchRole(user.role === 'institution' ? 'officer' : 'institution')}
                      className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-slate-400" />
                      Switch Account / Role
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

