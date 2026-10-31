import React, { useState } from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const GovHeader: React.FC = () => {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  return (
    <header className="bg-slate-900 text-white text-xs border-b border-slate-800">
      {/* Tricolor accent bar */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Official Emblem & Bilingual AICTE Identity */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-400/40 flex items-center justify-center font-bold text-[10px] text-amber-300">
            AICTE
          </div>
          <div className="leading-tight">
            <span className="font-semibold text-slate-200 block text-[11px]">
              अखिल भारतीय तकनीकी शिक्षा परिषद • All India Council for Technical Education
            </span>
            <span className="text-[10px] text-slate-400">
              Department of Higher Education, Ministry of Education, Government of India
            </span>
          </div>
        </div>

        {/* Right: SIH 2026 Badges & Accessibility */}
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              <strong>Smart India Hackathon 2026</strong> • Problem ID: <strong>26265</strong>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-sky-300 font-medium">Team PARIKALP (ID: 199059)</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="hidden sm:inline">Screen Reader Access</span>
            <div className="flex items-center bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700 font-mono text-[10px]">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1 hover:text-white ${fontSize === 'normal' ? 'text-sky-400 font-bold' : ''}`}
                title="Normal text size"
              >
                A-
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1 hover:text-white ${fontSize === 'large' ? 'text-sky-400 font-bold' : ''}`}
                title="Larger text size"
              >
                A+
              </button>
            </div>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-medium cursor-pointer hover:underline">
              English / हिन्दी
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

