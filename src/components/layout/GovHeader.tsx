import React from 'react';
import { Volume2, VolumeX, Eye, Sparkles } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const GovHeader: React.FC = () => {
  const {
    language,
    setLanguage,
    fontSize,
    setFontSize,
    isHighContrast,
    toggleContrast,
    speakText,
    isSpeaking,
    stopSpeaking,
    t,
  } = useAccessibility();

  const handleScreenReader = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const announcement =
        language === 'hi'
          ? 'अखिल भारतीय तकनीकी शिक्षा परिषद, शिक्षा मंत्रालय, भारत सरकार का प्रमाण अनुमोदन पोर्टल।'
          : 'All India Council for Technical Education, Ministry of Education, Government of India. Welcome to PRAMAAN Approval Portal.';
      speakText(announcement);
    }
  };

  return (
    <header className="bg-white text-slate-700 text-xs border-b border-slate-200 select-none">
      {/* Official Government of India Tricolor Ribbon */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white border-y border-slate-100"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Official Ashoka Emblem & Ministry Credentials */}
        <div className="flex items-center gap-3">
          {/* Ashoka Emblem Graphic representation */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5 text-amber-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 7.5L20 9L16 13L17 19L12 16.5L7 19L8 13L4 9L9.5 7.5L12 2Z" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs tracking-tight">
                  {t('govtOfIndia', 'भारत सरकार')}
                </span>
                <span className="text-slate-400 text-[10px]">|</span>
                <span className="font-semibold text-slate-800 text-xs">
                  {language === 'hi' ? 'Government of India' : 'Government of India'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium block">
                {t('ministryOfEdu', 'शिक्षा मंत्रालय')} • {t('aictePortalName', 'AICTE National Regulatory Portal')}
              </span>
            </div>
          </div>
        </div>


        {/* Right: GIGW 3.0 / MyGov.in Accessibility Toolbar */}
        <div className="flex items-center gap-3 text-[11px] text-slate-600">
          {/* Skip to Main Link */}
          <a
            href="#main-content"
            className="hidden lg:inline text-[11px] text-mygov-blue hover:text-mygov-orange font-medium underline underline-offset-2"
          >
            {t('skipToContent', 'Skip to Main Content')}
          </a>

          <span className="hidden lg:inline text-slate-300">|</span>

          {/* Screen Reader Access with Audio Narrator */}
          <button
            type="button"
            onClick={handleScreenReader}
            className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
              isSpeaking
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 animate-pulse'
                : 'hover:text-mygov-blue'
            }`}
            title="Screen Reader Voice Narrator"
          >
            {isSpeaking ? (
              <VolumeX className="w-3.5 h-3.5 text-amber-700" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="text-[11px]">{t('screenReader', 'Screen Reader')}</span>
          </button>

          <span className="hidden sm:inline text-slate-300">|</span>

          {/* Interactive Font Resizer A- A A+ */}
          <div
            className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-300 font-bold text-xs"
            role="group"
            aria-label="Text size controls"
          >
            <button
              onClick={() => setFontSize('small')}
              className={`px-2 py-0.5 rounded transition-all ${
                fontSize === 'small'
                  ? 'bg-mygov-orange text-white shadow-xs font-black'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Small text size (14px) • छोटा फॉन्ट"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded transition-all ${
                fontSize === 'normal'
                  ? 'bg-mygov-orange text-white shadow-xs font-black'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Standard text size (16px) • सामान्य फॉन्ट"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded transition-all ${
                fontSize === 'large'
                  ? 'bg-mygov-orange text-white shadow-xs font-black'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Large accessible text size (19px) • बड़ा फॉन्ट"
            >
              A+
            </button>
          </div>

          {/* Contrast Mode Toggle */}
          <button
            onClick={toggleContrast}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded border transition-colors text-xs font-semibold ${
              isHighContrast
                ? 'bg-slate-900 text-amber-300 border-amber-400 font-bold ring-1 ring-amber-400'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title="Toggle High Contrast Mode (WCAG AA)"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t('contrast', 'Contrast')}</span>
          </button>

          <span className="text-slate-300">|</span>

          {/* Interactive Bilingual Language Switcher */}
          <div className="flex items-center gap-1 font-semibold text-xs select-none">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded transition-colors ${
                language === 'en'
                  ? 'bg-mygov-orange text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-mygov-blue hover:bg-slate-100'
              }`}
              title="Switch to English"
            >
              English
            </button>
            <span className="text-slate-300">/</span>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded transition-colors ${
                language === 'hi'
                  ? 'bg-mygov-orange text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-mygov-blue hover:bg-slate-100'
              }`}
              title="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

