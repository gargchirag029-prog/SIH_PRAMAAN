import React from 'react';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { StatusBadge } from '../shared/StatusBadge';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EVCSummaryWidget: React.FC = () => {
  const { evcVisits } = useParikalpData();
  const { language } = useAccessibility();
  const isHi = language === 'hi';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                {isHi ? 'EVC निरीक्षण एवं निगरानी' : 'EVC Monitoring & Visits'}
              </h3>
              <p className="text-xs text-slate-500">
                {isHi ? 'विशेषज्ञ समिति भौतिक एवं लैब सत्यापन' : 'Expert Visit Committee physical audits'}
              </p>
            </div>
          </div>
          <Link
            to="/evc"
            className="text-xs text-mygov-blue font-semibold hover:underline flex items-center gap-1"
          >
            {isHi ? 'EVC प्रबंधन' : 'Manage EVC'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {evcVisits.slice(0, 3).map(visit => (
            <div
              key={visit.id}
              className="p-3 bg-slate-50/70 hover:bg-slate-50 rounded-lg border border-slate-200/80 transition-colors text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900 block truncate max-w-[260px]">
                    {visit.institutionName}
                  </span>
                  <span className="text-slate-500 text-[11px] font-mono">
                    {visit.applicationRef}
                  </span>
                </div>
                <StatusBadge status={visit.status} size="sm" />
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {isHi ? 'दौरा तिथि:' : 'Visit Date:'} <strong className="text-slate-700">{visit.visitDate}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-400" />
                  {visit.committeeMembers.length} {isHi ? 'विशेषज्ञ नियुक्त' : 'Experts Assigned'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>{isHi ? 'हितों के टकराव जांच:' : 'Conflict-of-interest check:'} <strong className="text-emerald-600">{isHi ? 'सत्यापित' : 'Enforced'}</strong></span>
        <span>{isHi ? 'जियोटैगिंग:' : 'Geotagging:'} <strong className="text-emerald-600">{isHi ? 'अनिवार्य' : 'Mandatory'}</strong></span>
      </div>
    </div>
  );
};

