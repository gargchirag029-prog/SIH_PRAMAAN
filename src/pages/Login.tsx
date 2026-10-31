import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService, ROLE_PERMISSIONS } from '../services/authService';
import { useNotification } from '../context/NotificationContext';
import { UserRole } from '../types/user';
import {
  Building2,
  FileCheck2,
  Gavel,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  RefreshCw,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole, setUser } = useAuth();
  const { showToast } = useNotification();
  const availableUsers = authService.getAvailableUsers();

  const [activeTab, setActiveTab] = useState<'DEMO' | 'CREDENTIALS'>('DEMO');
  const [selectedRole, setSelectedRole] = useState<UserRole>('officer');

  // Form State for Credentials Tab
  const [identifier, setIdentifier] = useState('ro.nwro@aicte-india.org');
  const [password, setPassword] = useState('AICTE@2026#Gov');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('7K9P4');
  const [captchaCode, setCaptchaCode] = useState('7K9P4');
  const [step2FA, setStep2FA] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const activeUser = availableUsers.find(u => u.role === selectedRole) || availableUsers[1];
  const permissions = ROLE_PERMISSIONS[selectedRole];

  // Refresh simulated Captcha
  const handleRefreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput(code);
  };

  // Instant Demo Login (1-Click Role Switch)
  const handleQuickDemoLogin = (role: UserRole) => {
    switchRole(role);
    showToast(
      'success',
      'Authenticated Successfully',
      `Logged in as ${role.toUpperCase()} Portal. Welcome to PRAMAAN.`
    );
    if (role === 'institution') navigate('/institution-portal');
    else if (role === 'officer') navigate('/officer-portal');
    else navigate('/admin-portal');
  };

  // Credentials Submission Flow
  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (captchaInput.toUpperCase() !== captchaCode.toUpperCase()) {
      showToast('error', 'Captcha Validation Failed', 'The security captcha entered does not match.');
      handleRefreshCaptcha();
      return;
    }

    if (!step2FA) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep2FA(true);
        showToast(
          'info',
          'Two-Factor Authentication Required',
          'A 6-digit TOTP code has been dispatched to your registered credentials (simulated code: 849201).'
        );
      }, 700);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const user = availableUsers.find(u => u.role === selectedRole) || availableUsers[0];
        setUser(user);
        switchRole(user.role);
        showToast('success', 'Identity Verified via 2FA', `Welcome back, ${user.name}`);
        navigate('/');
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col justify-between relative overflow-hidden font-sans select-none">
      {/* Top Banner Header with Tricolor Ribbon */}
      <header className="bg-white border-b border-slate-200 shadow-xs relative z-10">
        <div className="h-1.5 w-full flex">
          <div className="h-full w-1/3 bg-[#FF9933]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#138808]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/pramaan-logo.jpg"
              alt="PRAMAAN Logo"
              className="h-10 w-auto object-contain rounded border border-slate-200 bg-white p-0.5 shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  PRAMAAN • प्रमाण
                </span>
                <span className="bg-orange-100 text-mygov-orange text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200">
                  MeriPehchan SSO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                AICTE Approval Workflow & Compliance Monitoring • Ministry of Education
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto my-8 px-4 sm:px-6 relative z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Column: Context & Live Role Matrix (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-mygov-orange border border-orange-200 mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" /> Role-Based Access Control (RBAC)
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                National Single Sign-On for Technical Education
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Seamless role switching between Technical Institutions, Regional Scrutiny Officers, and AICTE Executive Administration with strict least-privilege authorization.
              </p>
            </div>

            {/* Active Selected Role Card Preview */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-mygov-blue text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {selectedRole === 'institution' ? 'IN' : selectedRole === 'officer' ? 'RO' : 'HQ'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Selected Role Identity
                    </h4>
                    <p className="text-[11px] text-mygov-orange font-bold capitalize">{selectedRole} Portal</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                  AES-256 RBAC
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-900 text-sm">{activeUser.name}</p>
                <p className="text-slate-600 font-medium">{activeUser.designation}</p>
                <p className="text-slate-500 text-[11px]">
                  {activeUser.institutionName || `${activeUser.department} • ${activeUser.region}`}
                </p>
                <p className="font-mono text-slate-400 text-[10px]">{activeUser.email}</p>
              </div>

              {/* Dynamic Permissions Live Preview */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Granted Statutory Capabilities:
                </span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Submit AICTE Approval Application:</span>
                    <span className={permissions.canSubmitApplication ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      {permissions.canSubmitApplication ? '✓ Authorized' : '✕ Restricted'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Scrutiny & Document Verification:</span>
                    <span className={permissions.canScrutinize ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      {permissions.canScrutinize ? '✓ Authorized' : '✕ Restricted'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">EVC Inspection Constitution:</span>
                    <span className={permissions.canScheduleEVC ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      {permissions.canScheduleEVC ? '✓ Authorized' : '✕ Restricted'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">SAC / SHC Regulatory Order Sanction:</span>
                    <span className={permissions.canMakeFinalDecision ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                      {permissions.canMakeFinalDecision ? '✓ Authorized' : '✕ Restricted'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Seals */}
            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> NIC Certified Cloud
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-mygov-blue" /> 256-Bit SSL Encryption
              </span>
            </div>
          </div>

          {/* Right Column: Clean White Login Terminal (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              {/* Tab Selector */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('DEMO')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'DEMO'
                      ? 'bg-mygov-orange text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  1-Click Role Selector (Jury Mode)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('CREDENTIALS')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'CREDENTIALS'
                      ? 'bg-mygov-orange text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  Official 2FA Credentials
                </button>
              </div>

              {/* TAB 1: QUICK ROLE SELECTOR (INSTANT 1-CLICK DEMO FOR JURY) */}
              {activeTab === 'DEMO' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-base font-bold text-slate-900">
                      Select Evaluator Persona to Enter
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Click any role below to launch the respective portal instantly with seeded demonstration workflows.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Role 1: Institution */}
                    <div
                      onClick={() => handleQuickDemoLogin('institution')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                        selectedRole === 'institution'
                          ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-200'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-xs">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">
                              1. Technical Institution Portal
                            </span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                              Applicant
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Dr. Ramesh Sharma (Registrar, Delhi Institute of Advanced Tech)
                          </p>
                          <span className="text-[10px] text-slate-500 font-mono">
                            PID: 1-42981001 • Extension of Approval (EOA)
                          </span>
                        </div>
                      </div>
                      <button className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-transform group-hover:translate-x-1">
                        Launch <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Role 2: Regional Officer */}
                    <div
                      onClick={() => handleQuickDemoLogin('officer')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                        selectedRole === 'officer'
                          ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-200'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-mygov-blue shadow-xs">
                          <FileCheck2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">
                              2. Regional Scrutiny Officer
                            </span>
                            <span className="text-[10px] bg-blue-100 text-mygov-blue px-2 py-0.5 rounded-full font-bold">
                              Scrutiny Bureau
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Dr. R. K. Soni (Regional Officer, North-Western Region)
                          </p>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Desk: NWRO • AI Scrutiny & Discrepancy Matrix
                          </span>
                        </div>
                      </div>
                      <button className="px-3.5 py-1.5 rounded-xl bg-mygov-blue hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-transform group-hover:translate-x-1">
                        Launch <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Role 3: Admin & SAC Committee */}
                    <div
                      onClick={() => handleQuickDemoLogin('admin')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                        selectedRole === 'admin'
                          ? 'bg-purple-50/70 border-purple-300 ring-2 ring-purple-200'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shadow-xs">
                          <Gavel className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">
                              3. AICTE Admin & SAC Committee
                            </span>
                            <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                              Executive Authority
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Prof. Anil Sahasrabudhe (Chairman SAC & Approval Bureau)
                          </p>
                          <span className="text-[10px] text-slate-500 font-mono">
                            EVC Decisions • LOA Orders • Escalations
                          </span>
                        </div>
                      </div>
                      <button className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-transform group-hover:translate-x-1">
                        Launch <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CREDENTIALS & 2FA LOGIN */}
              {activeTab === 'CREDENTIALS' && (
                <form onSubmit={handleCredentialSubmit} className="space-y-4 text-xs">
                  {/* Select Target Role */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Select Access Level / Authority Category:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'institution', label: 'Institution' },
                        { id: 'officer', label: 'Regional Officer' },
                        { id: 'admin', label: 'AICTE Admin/SAC' },
                      ].map(r => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => {
                            setSelectedRole(r.id as UserRole);
                            const target = availableUsers.find(u => u.role === r.id);
                            if (target) setIdentifier(target.email);
                          }}
                          className={`p-2 rounded-xl border text-center font-bold text-xs transition-colors ${
                            selectedRole === r.id
                              ? 'bg-mygov-orange text-white border-orange-500 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {!step2FA ? (
                    <>
                      {/* Identifier */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Official Email / AICTE Permanent ID:
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                            required
                            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-mygov-orange focus:border-mygov-orange"
                            placeholder="username@aicte-india.org"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Password / Digital Token:
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full pl-9 pr-9 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-mygov-orange focus:border-mygov-orange"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Captcha */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Security Verification Captcha:
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={captchaInput}
                            onChange={e => setCaptchaInput(e.target.value)}
                            placeholder="Enter Captcha"
                            required
                            className="w-32 py-2 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono text-center tracking-widest text-sm focus:ring-2 focus:ring-mygov-orange"
                          />
                          <div className="px-4 py-2 bg-amber-50 border border-amber-300 rounded-xl font-mono text-base font-extrabold text-amber-900 tracking-widest select-none shadow-xs">
                            {captchaCode}
                          </div>
                          <button
                            type="button"
                            onClick={handleRefreshCaptcha}
                            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300"
                            title="Refresh captcha"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-mygov-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        {isLoading ? 'Verifying Credentials...' : 'Proceed to Two-Factor Authentication (2FA) →'}
                      </button>
                    </>
                  ) : (
                    /* Step 2FA Screen */
                    <div className="space-y-4 pt-2">
                      <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1">
                        <div className="flex items-center gap-2 font-bold text-mygov-blue">
                          <Smartphone className="w-4 h-4" />
                          Two-Factor Authentication (2FA) Mandatory
                        </div>
                        <p className="text-[11px] text-slate-600">
                          A 6-digit OTP has been sent to the registered mobile (+91 98*** 45890) and official NIC gateway.
                        </p>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1 text-center">
                          Enter 6-Digit Verification Code:
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={e => setOtpCode(e.target.value)}
                          placeholder="849201"
                          required
                          className="w-48 mx-auto block py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono text-center tracking-widest text-lg font-bold focus:ring-2 focus:ring-mygov-orange"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setStep2FA(false)}
                          className="text-slate-500 hover:text-slate-800 font-semibold text-xs"
                        >
                          ← Back to password
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {isLoading ? 'Verifying Token...' : 'Authenticate & Enter Portal'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Parichay / DigiLocker Govt SSO Button */}
                  <div className="pt-3 border-t border-slate-200 text-center">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin(selectedRole)}
                      className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-mygov-orange" />
                      Sign in with MeriPehchaan (National Govt SSO)
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500 relative z-10">
        PRAMAAN — Integrated AICTE Approval Workflow Automation & Compliance Monitoring System
      </footer>
    </div>
  );
};
