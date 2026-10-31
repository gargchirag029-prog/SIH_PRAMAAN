import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export const TickerBanner: React.FC = () => {
  const tickerItems = [
    { text: '🏛️ AICTE NWRO cleared 14 EOA scrutiny records today', badge: 'Scrutiny Active' },
    { text: '⏱️ Average scrutiny turnaround reduced from 21 days to 4.2 days via AI screening', badge: 'SLA Optimized' },
    { text: '🔒 SHA-256 cryptographic audit ledger active across 7 regional bureaus', badge: 'Zero Tampering' },
    { text: '📋 EVC inspection team constituted for Chennai Academy of Technology', badge: 'EVC Scheduled' },
    { text: '⚖️ Standing Appellate Committee (SAC) meeting M5 scheduled for Nov 2, 2026', badge: 'SAC Agenda' },
    { text: '⚡ 96.8% on-time compliance adherence across technical institutions', badge: 'Compliance 2026' },
  ];

  return (
    <div className="w-full overflow-hidden bg-amber-50/90 border-b border-amber-200/80 py-2 text-xs select-none shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Fixed Title Tag in Official MyGov Orange */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-mygov-orange text-white text-[10px] font-extrabold px-3 py-1 rounded-md shadow-xs mr-4 uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-200" />
          <span>Latest Updates</span>
        </div>

        {/* Marquee Ticker with clean readable dark text */}
        <div className="overflow-hidden flex-1 relative">
          <div className="flex animate-ticker whitespace-nowrap gap-12 text-slate-800">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2.5">
                <span className="text-[12px] font-medium text-slate-800">{item.text}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-mygov-blue border border-blue-200 shadow-xs">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

