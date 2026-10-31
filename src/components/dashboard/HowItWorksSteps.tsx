import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  FileCheck2,
  Calendar,
  Award,
  ArrowRight,
  HelpCircle,
  Volume2,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const HowItWorksSteps: React.FC = () => {
  const { language, t, speakText } = useAccessibility();

  const steps = [
    {
      step: '01',
      title: t('step1Title', 'Online Application'),
      hindiTitle: 'ऑनलाइन आवेदन',
      description: t(
        'step1Desc',
        'Register your institution, fill program details, faculty counts, and upload supporting documents (Land Registration, Fire NOC, Building Stability).'
      ),
      icon: FileText,
      color: 'text-mygov-orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      linkText: language === 'hi' ? 'आवेदन शुरू करें' : 'Start Application',
      link: '/submit-application',
    },
    {
      step: '02',
      title: t('step2Title', 'Document Scrutiny'),
      hindiTitle: 'दस्तावेज़ संवीक्षा',
      description: t(
        'step2Desc',
        'Regional Scrutiny Officers review your submitted proofs. Automated checks help identify missing or expired dates early so you can fix them quickly.'
      ),
      icon: FileCheck2,
      color: 'text-mygov-blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      linkText: language === 'hi' ? 'संवीक्षा विवरण' : 'Scrutiny Details',
      link: '/scrutiny',
    },
    {
      step: '03',
      title: t('step3Title', 'Campus Inspection (EVC)'),
      hindiTitle: 'विशेषज्ञ समिति निरीक्षण',
      description: t(
        'step3Desc',
        'Independent senior academicians and CPWD representatives conduct physical or virtual inspection of laboratories, equipment, and fire safety.'
      ),
      icon: Calendar,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      linkText: language === 'hi' ? 'निरीक्षण नियम' : 'EVC Guidelines',
      link: '/evc',
    },
    {
      step: '04',
      title: t('step4Title', 'Approval Order Issued'),
      hindiTitle: 'डिजिटल अनुमोदन आदेश',
      description: t(
        'step4Desc',
        'Standing Appellate Committee (SAC) approves your dossier. Instantly download your digitally signed Extension of Approval (EOA) order with QR code.'
      ),
      icon: Award,
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      linkText: language === 'hi' ? 'आदेश डाउनलोड करें' : 'Download Orders',
      link: '/committee',
    },
  ];

  const handleNarrate = () => {
    const text =
      language === 'hi'
        ? 'एआईसीटीई अनुमोदन प्रक्रिया कैसे कार्य करती है। चार सरल चरण: पहला ऑनलाइन आवेदन, दूसरा दस्तावेज़ संवीक्षा, तीसरा परिसर निरीक्षण, और चौथा अनुमोदन आदेश।'
        : 'How the AICTE approval process works. Four simple steps: Step 1 Online application, Step 2 Document scrutiny, Step 3 Campus inspection, and Step 4 Approval order issued.';
    speakText(text);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6 font-sans select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-mygov-orange uppercase tracking-wider block">
              {t('howItWorksHeader', 'HOW IT WORKS • कार्यप्रणाली')}
            </span>
            <button
              onClick={handleNarrate}
              className="text-slate-400 hover:text-mygov-orange p-0.5 rounded transition-colors"
              title="Hear walkthrough"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {t('howItWorksTitle', 'How the AICTE Approval Process Works')}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('howItWorksSubtitle', 'Simple 4-step walkthrough for new institutions, applicants, and college administrators.')}
          </p>
        </div>

        <Link
          to="/settings"
          className="text-xs font-bold text-mygov-blue hover:text-mygov-orange transition-colors flex items-center gap-1 self-start sm:self-auto"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'सहायता चाहिए? मार्गदर्शिका पढ़ें' : 'Need Assistance? Read User Manual'}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map(st => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className={`rounded-xl p-5 border ${st.borderColor} ${st.bgColor} flex flex-col justify-between relative group hover:shadow-sm transition-all`}
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-black text-slate-300 font-mono">
                  {st.step}
                </span>
                <div
                  className={`w-9 h-9 rounded-lg bg-white border ${st.borderColor} flex items-center justify-center ${st.color} shadow-xs group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {st.title}
                </h4>
                <p className="text-[11px] font-semibold text-slate-500">
                  {st.hindiTitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {st.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <Link
                  to={st.link}
                  className={`font-bold flex items-center gap-1 text-xs ${st.color} hover:underline`}
                >
                  <span>{st.linkText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
