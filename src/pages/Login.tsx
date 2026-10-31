import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // Instant Demo Login (1-Click for SIH Judges)
  const handleQuickDemoLogin = (role: UserRole) => {
    switchRole(role);
    showToast(
      'success',
      'Authenticated Successfully',
      `Logged in as ${role.toUpperCase()} Portal. Welcome to PARIKALP.`
    );
    if (role === 'institution') navigate('/institution-portal');
    else if (role === 'officer') navigate('/officer-portal');
    else navigate('/admin-portal');
  };

  // Credentials / 2FA Submit
  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!step2FA) {
      // Advance to 2FA OTP simulation
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep2FA(true);
        setOtpCode('849201'); // Pre-fill mock OTP for convenience
        showToast('info', '2FA OTP Dispatched', 'Simulated 6-digit OTP sent to registered mobile & email.');
      }, 600);
    } else {
      // Finalise 2FA verification
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        switchRole(selectedRole);
        showToast(
          'success',
          'Multi-Factor Authentication Verified',
          `Session cryptographically authenticated for ${activeUser.name}.`
        );
        if (selectedRole === 'institution') navigate('/institution-portal');
        else if (selectedRole === 'officer') navigate('/officer-portal');
        else navigate('/admin-portal');
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background ambient lighting effects (like HTML) */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <header className="p-4 sm:p-6 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-parikalp-primary flex items-center justify-center font-bold text-white shadow-card">
            P
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-display">
                PARIKALP
              </span>
              <span className="pill pill-accent text-[10px] py-0.5">
                AICTE 2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Department of Higher Education • Government of India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="hidden sm:inline text-slate-400">
            SIH 2026 Problem ID: <strong>26265</strong>
          </span>
          <span className="pill pill-outline text-[11px] text-sky-300 border-sky-500/40 bg-sky-950/40">
            Team ID: 199059
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto my-8 px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero & Live Role Matrix (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="pill pill-accent mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Role-Based Access Control (RBAC)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
                Single Sign-On for Technical Education Governance
              </h1>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Seamless role switching between Institutions, Regional Officers, and AICTE Executive Administration with strict least-privilege authorization.
              </p>
            </div>

            {/* Active Selected Role Card Preview */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-700/80 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-parikalp-primary text-white flex items-center justify-center font-bold text-xs">
                    {selectedRole === 'institution' ? 'IN' : selectedRole === 'officer' ? 'RO' : 'HQ'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Selected Role Identity
                    </h4>
                    <p className="text-[11px] text-sky-400 capitalize">{selectedRole} Portal</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  AES-256 RBAC
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-100 text-sm">{activeUser.name}</p>
                <p className="text-slate-400">{activeUser.designation}</p>
                <p className="text-slate-400 text-[11px]">
                  {activeUser.institutionName || `${activeUser.department} • ${activeUser.region}`}
                </p>
                <p className="font-mono text-slate-500 text-[10px]">{activeUser.email}</p>
              </div>

              {/* Dynamic Permissions Live Preview */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Granted Statutory Capabilities:
                </span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Submit AICTE Approval Application:</span>
                    <span className={permissions.canSubmitApplication ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                      {permissions.canSubmitApplication ? '✓ Authorized' : '✕ Restricted'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Scrutiny & Document Verification:</span>
                    <span className={permissions.canScrutinize ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                      {permissions.canScrutinize ? '✓ Authorized' : '✕ Restricted'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">EVC Inspection Constitution:</span>
                    <span className={permissions.canScheduleEVC ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                      {permissions.canScheduleEVC ? '✓ Authorized' : '✕ Restricted'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">SAC / SHC Regulatory Order Sanction:</span>
                    <span className={permissions.canMakeFinalDecision ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                      {permissions.canMakeFinalDecision ? '✓ Authorized' : '✕ Restricted'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Seals */}
            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NIC Certified Cloud
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sky-400" /> 256-Bit SSL Encryption
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Login Terminal (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-modal space-y-6">
              {/* Tab Selector */}
              <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab('DEMO')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'DEMO'
                      ? 'bg-parikalp-primary text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  SIH Quick Role Selector (Jury Mode)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('CREDENTIALS')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'CREDENTIALS'
                      ? 'bg-parikalp-primary text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
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
                    <h3 className="text-base font-bold text-white">
                      Select Evaluator Persona to Enter
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Click any role below to launch the respective portal instantly with seeded demonstration workflows.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Role 1: Institution */}
                    <div
                      onClick={() => handleQuickDemoLogin('institution')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                        selectedRole === 'institution'
                          ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                          : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-white">
                              1. Technical Institution Portal
                            </span>
                            <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                              Applicant
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5">
                            Dr. Ramesh Sharma (Registrar, Delhi Institute of Advanced Tech)
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            PID: 1-42981001 • Extension of Approval (EOA)
                          </span>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-transform group-hover:translate-x-1">
                        Launch <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Role 2: Regional Officer */}
                    <div
                      onClick={() => handleQuickDemoLogin('officer')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                        selectedRole === 'officer'
                          ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30'
                          : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                          <FileCheck2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-white">
                              2. Regional Scrutiny Officer
                            </span>
                            <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full font-semibold">
                              Scrutiny Bureau
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5">
                            Dr. R. K. Soni (Regional Officer, North-Western Region)
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Desk: NWRO • AI Scrutiny & Discrepancy Matrix
                          </span>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 rounded-xl bg-parikalp-primary hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-transform group-hover:translate-x-1">
                        Launch <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Role 3: Admin & SAC Committee */}
                    <div
                      onClick={() => handleQuickDemoLogin('admin')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                        selectedRole === 'admin'
                          ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/30'
                          : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/80'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                          <Gavel className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-white">
                              3. AICTE Admin & SAC Committee
                            </span>
                            <span className="text-[10px] bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full font-semibold">
                              Executive Authority
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5">
                            Prof. Anil Sahasrabudhe (Chairman SAC & Approval Bureau)
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            EVC Decisions • LOA Orders • Escalations
                          </span>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-transform group-hover:translate-x-1">
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
                    <label className="block font-semibold text-slate-300 mb-1.5">
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
                              ? 'bg-parikalp-primary text-white border-sky-400'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
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
                        <label className="block font-semibold text-slate-300 mb-1">
                          NIC Government Email / AICTE Permanent ID:
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                            required
                            placeholder="e.g. ro.nwro@aicte-india.org or 1-42981001"
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-parikalp-primary focus:border-parikalp-primary"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Password / Digital Token:
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full pl-9 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-parikalp-primary"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-slate-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Captcha Verification */}
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">
                          Statutory Captcha Verification:
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={captchaInput}
                            onChange={e => setCaptchaInput(e.target.value)}
                            required
                            className="w-32 py-2 px-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-center tracking-widest text-sm"
                          />
                          <div className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-xl font-mono text-base font-extrabold text-amber-400 tracking-widest select-none bg-radial from-slate-700 to-slate-800">
                            {captchaCode}
                          </div>
                          <button
                            type="button"
                            onClick={handleRefreshCaptcha}
                            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                            title="Refresh captcha"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 rounded-xl bg-parikalp-primary hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        {isLoading ? 'Verifying Credentials...' : 'Proceed to Two-Factor Authentication (2FA) →'}
                      </button>
                    </>
                  ) : (
                    /* Step 2FA Screen */
                    <div className="space-y-4 pt-2">
                      <div className="p-3.5 bg-sky-950/50 border border-sky-800 rounded-xl text-xs space-y-1">
                        <div className="flex items-center gap-2 font-bold text-sky-300">
                          <Smartphone className="w-4 h-4" />
                          Two-Factor Authentication (2FA) Mandatory
                        </div>
                        <p className="text-[11px] text-slate-300">
                          A 6-digit OTP has been sent to the registered mobile (+91 98*** 45890) and official NIC gateway.
                        </p>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 mb-1 text-center">
                          Enter 6-Digit Verification Code:
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={e => setOtpCode(e.target.value)}
                          placeholder="849201"
                          required
                          className="w-48 mx-auto block py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-center tracking-widest text-lg font-bold focus:ring-2 focus:ring-parikalp-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => setStep2FA(false)}
                          className="text-slate-400 hover:text-white"
                        >
                          ← Back to password
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {isLoading ? 'Verifying Token...' : 'Authenticate & Enter Portal'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Parichay / DigiLocker Govt SSO Button */}
                  <div className="pt-3 border-t border-slate-800 text-center">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin(selectedRole)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
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
      <footer className="p-4 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500 relative z-10">
        PARIKALP — One Platform. Smarter Approvals. Continuous Compliance. Transparent Governance. • Smart India Hackathon 2026
      </footer>
    </div>
  );
};
