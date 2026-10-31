import React from 'react';
import { ShieldCheck, Globe, ExternalLink, Award } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Footer: React.FC = () => {
  const { language, t } = useAccessibility();
  const isHi = language === 'hi';

  return (
    <footer className="bg-[#0B2545] text-slate-300 text-xs border-t border-slate-700/60 mt-auto select-none">
      {/* Tricolor Top Stripe */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 pb-8 border-b border-slate-700/60">
          {/* Col 1: Platform Branding & Mission */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/pramaan-logo.jpg"
                alt="PRAMAAN Logo"
                className="h-11 w-auto object-contain rounded-lg bg-white p-1 shadow-md border border-white/20"
              />
              <div>
                <span className="text-white font-extrabold text-base tracking-tight block">
                  PRAMAAN • {isHi ? 'प्रमाण' : 'AICTE Regulatory Platform'}
                </span>
                <span className="text-[11px] text-orange-400 font-semibold">
                  {isHi
                    ? 'एआईसीटीई अनुमोदन कार्यप्रवाह स्वचालन एवं सतत अनुपालन'
                    : 'AICTE Approval Workflow Automation & Continuous Compliance'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed pr-4">
              {isHi ? (
                <>
                  प्रमाण (PRAMAAN) तकनीकी संस्थानों के लिए एक राष्ट्रीय स्तर का नियामक सास (SaaS) प्लेटफॉर्म है।
                  यह स्वचालित रूटिंग, एआई दस्तावेज़ सत्यापन, हितों के टकराव रहित ईवीसी गठन और 3-स्तरीय एसएलए एस्केलेशन
                  के माध्यम से संस्थागत पेंडेंसी को समाप्त करता है।
                </>
              ) : (
                <>
                  PRAMAAN is a national-scale regulatory SaaS architecture for technical institutions.
                  It eliminates institutional pendency through automated routing, AI document verification,
                  unconflicted EVC constitution, and 3-tier SLA escalation.
                </>
              )}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/15">
                {isHi ? 'टीम नाम: PARIKALP' : 'Team Name: PARIKALP'}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/15">
                {isHi ? 'टीम आईडी: 199059' : 'Team ID: 199059'}
              </span>
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-400/40 font-bold">
                {isHi ? 'थीम: स्मार्ट ऑटोमेशन' : 'Theme: Smart Automation'}
              </span>
            </div>
          </div>

          {/* Col 2: AICTE Approval Portals */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-orange-400" />
              {isHi ? 'अनुमोदन पोर्टल' : 'Approval Portals'}
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="#/submit-application" className="hover:text-white transition-colors">
                  {isHi ? 'नया तकनीकी संस्थान' : 'New Technical Institution'}
                </a>
              </li>
              <li>
                <a href="#/submit-application" className="hover:text-white transition-colors">
                  {isHi ? 'अनुमोदन विस्तार (EOA)' : 'Extension of Approval (EOA)'}
                </a>
              </li>
              <li>
                <a href="#/submit-application" className="hover:text-white transition-colors">
                  {isHi ? 'स्वीकृत सीटों में वृद्धि' : 'Increase in Approved Intake'}
                </a>
              </li>
              <li>
                <a href="#/scrutiny" className="hover:text-white transition-colors">
                  {isHi ? 'क्षेत्रीय संवीक्षा कतार' : 'Regional Scrutiny Queue'}
                </a>
              </li>
              <li>
                <a href="#/evc" className="hover:text-white transition-colors">
                  {isHi ? 'विशेषज्ञ समिति (EVC)' : 'Expert Visit Committee (EVC)'}
                </a>
              </li>
              <li>
                <a href="#/committee" className="hover:text-white transition-colors">
                  {isHi ? 'अपीलीय समिति निर्णय' : 'SAC Appellate Decisions'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: National Government Gateways */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              {isHi ? 'सरकारी प्रवेश द्वार' : 'Government Gateways'}
            </h5>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="https://www.india.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  {isHi ? 'भारत का राष्ट्रीय पोर्टल' : 'National Portal of India'} <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.mygov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  {isHi ? 'माईगव नागरिक पोर्टल' : 'MyGov.in Citizen Portal'} <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.aicte-india.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  {isHi ? 'एआईसीटीई आधिकारिक पोर्टल' : 'AICTE Official Website'} <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.digilocker.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  {isHi ? 'डिजीलॉकर सत्यापन' : 'DigiLocker Verification'} <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.meripehchan.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  {isHi ? 'मेरी पहचान (जन परिचय)' : 'MeriPehchan (Jan Parichay)'} <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Statutory Compliance & GIGW */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {isHi ? 'मानक एवं सुरक्षा' : 'Standards & Security'}
            </h5>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{isHi ? 'GIGW 3.0 मानक अनुरूप' : 'GIGW 3.0 Standard Compliant'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>{isHi ? 'WCAG 2.1 लेवल AA सुगम्यता' : 'WCAG 2.1 Level AA Accessible'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>{isHi ? 'STQC एवं CERT-In सुरक्षित ढांचा' : 'STQC & CERT-In Cleared Architecture'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                <span>{isHi ? 'SHA-256 लेजर ऑडिट लॉग' : 'SHA-256 Ledger Audit Log'}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-700">
                <span className="text-[10px] text-slate-400 block">
                  {isHi ? 'एनआईसी मेघराज क्लाउड अवसंरचना' : 'NIC MeghRaj Cloud Infrastructure'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Sovereign Attribution, Visitor Counter & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="text-center md:text-left">
            <p>
              {t('footerDisclaimer', 'Website designed, developed, and deployed for All India Council for Technical Education (AICTE), Ministry of Education, Government of India.')}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {t('nicHosting', 'Hosted on National Informatics Centre (NIC) MeghRaj Cloud Infrastructure • Built for Smart India Hackathon 2026.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="bg-slate-900/90 px-3 py-1 rounded-md border border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300 text-[10px]">
                {t('visitorCounter', 'Visitor Counter:')} <strong className="text-white">2,481,902</strong>
              </span>
            </div>
            <span className="text-slate-400 text-[10px]">
              {t('lastUpdated', 'Last Updated:')} <strong className="text-slate-200">{isHi ? '31 अक्टूबर 2026' : '31 October 2026'}</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
