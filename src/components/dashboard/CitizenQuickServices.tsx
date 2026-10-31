import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  FilePlus,
  FileCheck2,
  Calendar,
  Download,
  PhoneCall,
  Mail,
  HelpCircle,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Volume2,
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export const CitizenQuickServices: React.FC = () => {
  const [appNumber, setAppNumber] = useState('');
  const [trackResult, setTrackResult] = useState<{ found: boolean; message: string; status?: string } | null>(null);
  const { applications } = useParikalpData();
  const { showToast } = useNotification();
  const { language, t, speakText } = useAccessibility();
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appNumber.trim()) return;

    const query = appNumber.trim().toUpperCase();
    const app = applications.find(
      a => a.referenceNumber.toUpperCase().includes(query) || a.id.toUpperCase().includes(query)
    );

    if (app) {
      const msg =
        language === 'hi'
          ? `आवेदन ${app.referenceNumber} (${app.institutionName}): वर्तमान स्थिति "${app.status.replace(/_/g, ' ')}" है, चरण "${app.currentStage}" में।`
          : `Application ${app.referenceNumber} (${app.institutionName}): Current Status is "${app.status.replace(/_/g, ' ')}" at stage "${app.currentStage}".`;

      setTrackResult({
        found: true,
        message: msg,
        status: app.status,
      });
      showToast('success', language === 'hi' ? 'आवेदन प्राप्त हुआ' : 'Application Located', msg);
    } else {
      const notFoundMsg =
        language === 'hi'
          ? `सत्र 2026-27 में "${appNumber}" से मेल खाता कोई आवेदन नहीं मिला। कृपया "APP-8492" या "APP-7821" आज़माएं।`
          : `No application matching "${appNumber}" was found in current session 2026-27. Try "APP-8492" or "APP-7821".`;

      setTrackResult({
        found: false,
        message: notFoundMsg,
      });
      showToast('warning', language === 'hi' ? 'आवेदन नहीं मिला' : 'Application Not Found', notFoundMsg);
    }
  };

  const handleNarrate = () => {
    const text =
      language === 'hi'
        ? 'अपने अनुमोदन आवेदन की स्थिति जांचें। अपना आवेदन संदर्भ नंबर दर्ज करें और वास्तविक समय स्थिति प्राप्त करें।'
        : 'Track your approval application. Enter your AICTE reference number to check real-time scrutiny status.';
    speakText(text);
  };

  return (
    <div className="space-y-4 font-sans select-none">
      {/* 1. Instant Application Status Tracker Box */}
      <div className="bg-gradient-to-r from-amber-50/90 via-orange-50/80 to-amber-50/90 rounded-2xl p-5 sm:p-6 border border-orange-200/90 shadow-xs">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-mygov-orange uppercase tracking-wider block">
                {language === 'hi' ? 'त्वरित नागरिक एवं संस्थान सेवा' : 'INSTANT CITIZEN & INSTITUTE SERVICE'}
              </span>
              <button
                onClick={handleNarrate}
                className="text-slate-400 hover:text-mygov-orange p-0.5 rounded transition-colors"
                title="Hear text"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Search className="w-5 h-5 text-mygov-orange" />
              {t('trackYourApp', 'Track Your Approval Application')}
            </h3>
            <p className="text-xs text-slate-600">
              {t('trackSubtitle', 'Enter your AICTE Application Reference Number to check real-time scrutiny and committee decisions.')}
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              value={appNumber}
              onChange={e => setAppNumber(e.target.value)}
              placeholder={t('enterRefPlaceholder', 'e.g. APP-8492 or APP-7821')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-mygov-orange focus:border-mygov-orange w-full sm:w-64 shadow-xs"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-mygov-orange hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors flex-shrink-0"
            >
              <span>{t('trackBtn', 'Track')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Search Result Feedback Banner */}
        {trackResult && (
          <div
            className={`mt-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 border ${
              trackResult.found
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}
          >
            {trackResult.found ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-semibold">{trackResult.message}</p>
              {trackResult.found && (
                <button
                  onClick={() => navigate('/applications')}
                  className="mt-1 text-mygov-blue underline font-bold text-[11px] block"
                >
                  {language === 'hi'
                    ? 'आवेदन सूची में पूरा विवरण देखें →'
                    : 'View full application details in Application Queue →'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Four Core Citizen Services (Easy Human Tasks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Service 1 */}
        <Link
          to="/submit-application"
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group transform hover:-translate-y-0.5 border-t-4 border-t-mygov-orange"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-mygov-orange mb-3 group-hover:scale-110 transition-transform">
              <FilePlus className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-mygov-orange transition-colors">
              {t('newAppCardTitle', 'New Application (2026-27)')}
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t('newAppCardDesc', 'Start new application for Extension of Approval (EOA), new institute, or intake increase.')}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-mygov-orange font-bold">
            <span>{t('applyOnline', 'Apply Online')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Service 2 */}
        <Link
          to="/scrutiny"
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group transform hover:-translate-y-0.5 border-t-4 border-t-mygov-blue"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-mygov-blue mb-3 group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-mygov-blue transition-colors">
              {t('scrutinyCardTitle', 'Check Scrutiny & Remarks')}
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t('scrutinyCardDesc', 'View regional officer remarks, check document completeness score, and respond to notices.')}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-mygov-blue font-bold">
            <span>{t('viewRemarks', 'View Remarks')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Service 3 */}
        <Link
          to="/evc"
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group transform hover:-translate-y-0.5 border-t-4 border-t-emerald-600"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {t('evcCardTitle', 'EVC Inspection Schedule')}
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t('evcCardDesc', 'Check scheduled expert visit date, committee roster, and mandatory laboratory benchmarks.')}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
            <span>{t('inspectionDetails', 'Inspection Details')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Service 4 */}
        <Link
          to="/committee"
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group transform hover:-translate-y-0.5 border-t-4 border-t-purple-600"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 mb-3 group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
              {t('ordersCardTitle', 'Download Approval Orders')}
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t('ordersCardDesc', 'Download digitally signed EOA approval letters and Standing Appellate Committee decisions.')}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-bold">
            <span>{t('downloadLetter', 'Download Letter')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* 3. Official Helpdesk Support & Manuals Ribbon */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">{t('tollFreeHelpline', 'Toll-Free Helpline')}</span>
              <strong className="text-slate-900">1800-11-2244</strong>
              <span className="text-[10px] text-slate-500 ml-1">{t('workingHours', '(9:30 AM – 5:30 PM, Mon-Fri)')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-50 text-mygov-blue flex items-center justify-center">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">{t('helpdeskEmail', 'Helpdesk Email')}</span>
              <strong className="text-slate-900">helpdesk-aicte@gov.in</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.aicte-india.org"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('approvalHandbook', 'Approval Handbook (PDF)')}</span>
          </a>
          <Link
            to="/settings"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-mygov-orange font-bold text-xs transition-colors border border-orange-200"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('userGuideFaqs', 'User Guide & FAQs')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
