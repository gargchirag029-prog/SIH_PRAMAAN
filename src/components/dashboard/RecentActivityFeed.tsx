import React from 'react';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { History, ArrowRight, UserCheck, FileCheck, ShieldAlert, CheckCircle, FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RecentActivityFeed: React.FC = () => {
  const { auditLogs } = useParikalpData();
  const { language } = useAccessibility();
  const isHi = language === 'hi';

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'APPLICATION_SUBMISSION':
        return <FilePlus className="w-3.5 h-3.5 text-blue-600" />;
      case 'SCRUTINY_STARTED':
      case 'DISCREPANCY_RAISED':
        return <FileCheck className="w-3.5 h-3.5 text-amber-600" />;
      case 'FINAL_DECISION_RECORDED':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />;
      case 'ALERT_GENERATED':
      case 'ESCALATION_TRIGGERED':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return <UserCheck className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const actionLabels: Record<string, { en: string; hi: string }> = {
    APPLICATION_SUBMISSION: { en: 'Application Submitted', hi: 'नया आवेदन जमा हुआ' },
    SCRUTINY_STARTED: { en: 'Scrutiny Started', hi: 'संवीक्षा प्रारंभ हुई' },
    DISCREPANCY_RAISED: { en: 'Discrepancy Raised', hi: 'विसंगति / आपत्ति दर्ज' },
    FINAL_DECISION_RECORDED: { en: 'Final Approval Issued', hi: 'अंतिम अनुमोदन आदेश जारी' },
    ALERT_GENERATED: { en: 'SLA Alert Generated', hi: 'समय-सीमा अलर्ट जारी' },
    ESCALATION_TRIGGERED: { en: 'Escalation to Tier-2', hi: 'अपर स्तर पर एस्केलेशन' },
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              {isHi ? 'हालिया संस्थागत एवं नियामक गतिविधि' : 'Recent Institutional & Regulatory Activity Feed'}
            </h3>
            <p className="text-xs text-slate-500">
              {isHi ? 'रीयल-टाइम अपरिवर्तनीय ऑडिट स्ट्रीम' : 'Live immutable governance event stream'}
            </p>
          </div>
        </div>
        <Link
          to="/audit"
          className="text-xs text-mygov-blue font-semibold hover:underline flex items-center gap-1"
        >
          {isHi ? 'पूर्ण ऑडिट ट्रेल देखें' : 'View Full Audit Trail'} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {auditLogs.slice(0, 5).map(log => (
          <div key={log.id} className="py-3 flex items-start gap-3 text-xs">
            <div className="p-2 rounded-full bg-slate-50 border border-slate-200 flex-shrink-0 mt-0.5">
              {getActionIcon(log.action)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">
                  {actionLabels[log.action]?.[language] || log.action.replace(/_/g, ' ')}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{log.timestamp}</span>
              </div>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{log.remarks}</p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                <span>
                  {isHi ? 'द्वारा:' : 'By:'} <strong className="text-slate-700">{log.userName}</strong> ({log.userRole})
                </span>
                {log.applicationRef && (
                  <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                    {log.applicationRef}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

