import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export const TickerBanner: React.FC = () => {
  const tickerItems = [
    { text: '🏛️ AICTE NWRO cleared 14 EOA scrutiny records today', badge: 'Scrutiny Active' },
    { text: '⏱️ Average scrutiny turnaround reduced from 21 days to 4.2 days via AI screening', badge: 'SLA Optimized' },
    { text: '🔒 SHA-256 cryptographic audit ledger active across 7 regional bureaus', badge: 'Zero Tampering' },
    { text: '📋 EVC inspection team constituted for Chennai Academy of Technology', badge: 'EVC Scheduled' },
    { text: '⚖️ Standing Appellate Committee (SAC) meeting M5 scheduled for Nov 2, 2026', badge: 'SAC Agenda' },
    { text: '⚡ 92.4% on-time compliance adherence across technical institutions', badge: 'Compliance 2026' },
  ];

  return (
    <div className="w-full overflow-hidden bg-slate-900 border-b border-slate-800 py-1.5 text-xs select-none">
      <div className="flex animate-ticker whitespace-nowrap gap-12 text-slate-300">
        {/* Double array for seamless infinite looping */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-3">
            <span className="text-[11px] font-medium text-slate-200">{item.text}</span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-parikalp-primary/40 text-sky-300 border border-sky-400/30 uppercase tracking-wider">
              {item.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

