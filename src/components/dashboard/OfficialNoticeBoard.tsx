import React, { useState } from 'react';
import {
  Bell,
  Download,
  FileText,
  Calendar,
  ExternalLink,
  ChevronRight,
  Pin,
  Sparkles,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Notice {
  id: string;
  category: 'CIRCULAR' | 'NOTICE' | 'ADVISORY';
  titleEn: string;
  titleHi: string;
  date: string;
  isNew?: boolean;
  fileSize: string;
}

export const OfficialNoticeBoard: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'CIRCULAR' | 'NOTICE'>('ALL');
  const { language, t } = useAccessibility();

  const notices: Notice[] = [
    {
      id: 'not-1',
      category: 'CIRCULAR',
      titleEn: 'Extension of Last Date for Submitting EOA Applications for Session 2026-27 (Without Late Fee)',
      titleHi: 'सत्र 2026-27 के लिए ईओए आवेदन जमा करने की अंतिम तिथि का विस्तार (बिना विलंब शुल्क)',
      date: '30 Oct 2026',
      isNew: true,
      fileSize: '342 KB',
    },
    {
      id: 'not-2',
      category: 'ADVISORY',
      titleEn: 'Advisory on Mandatory Fire Safety & Wet Riser Hydrant NOC Verification for Technical Colleges',
      titleHi: 'तकनीकी कॉलेजों के लिए अनिवार्य अग्नि सुरक्षा एवं वेट राइज़र हाइड्रेंट एनओसी सत्यापन पर परामर्श',
      date: '28 Oct 2026',
      isNew: true,
      fileSize: '512 KB',
    },
    {
      id: 'not-3',
      category: 'NOTICE',
      titleEn: 'Public Notice: Implementation of Aadhaar-based Biometric Attendance for Full-time Faculty',
      titleHi: 'सार्वजनिक सूचना: पूर्णकालिक संकाय के लिए आधार-आधारित बायोमेट्रिक उपस्थिति का कार्यान्वयन',
      date: '25 Oct 2026',
      isNew: false,
      fileSize: '280 KB',
    },
    {
      id: 'not-4',
      category: 'CIRCULAR',
      titleEn: 'Approval Guidelines for Emerging Technology Courses in Artificial Intelligence, Cyber Security & Robotics',
      titleHi: 'आर्टिफिशियल इंटेलिजेंस, साइबर सुरक्षा और रोबोटिक्स में उभरती प्रौद्योगिकी पाठ्यक्रमों के लिए अनुमोदन दिशानिर्देश',
      date: '20 Oct 2026',
      isNew: false,
      fileSize: '1.2 MB',
    },
    {
      id: 'not-5',
      category: 'NOTICE',
      titleEn: 'Schedule of Standing Appellate Committee (SAC) Hearings for Redressal of Discrepancies (Session 2026-27)',
      titleHi: 'विसंगतियों के निवारण के लिए स्थायी अपीलीय समिति (SAC) की सुनवाई का कार्यक्रम (सत्र 2026-27)',
      date: '15 Oct 2026',
      isNew: false,
      fileSize: '460 KB',
    },
  ];

  const filtered = notices.filter(n => (filter === 'ALL' ? true : n.category === filter));

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4 font-sans select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-mygov-orange"></span>
            <span className="text-xs font-bold text-mygov-orange uppercase tracking-wider">
              {t('noticesHeader', 'OFFICIAL NOTICES & CIRCULARS')}
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-mygov-blue" />
            {t('noticesTitle', 'Important Announcements & Public Advisories')}
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              filter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('all', 'All')}
          </button>
          <button
            onClick={() => setFilter('CIRCULAR')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              filter === 'CIRCULAR' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('circulars', 'Circulars')}
          </button>
          <button
            onClick={() => setFilter('NOTICE')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              filter === 'NOTICE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('notices', 'Notices')}
          </button>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {filtered.map(notice => (
          <div
            key={notice.id}
            className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              <span className="mt-1 w-2 h-2 rounded-full bg-slate-400 flex-shrink-0"></span>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {notice.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {notice.date}
                  </span>
                  {notice.isNew && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 border border-rose-200 animate-pulse">
                      {language === 'hi' ? 'नवीन' : 'NEW'}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-mygov-blue cursor-pointer leading-snug">
                  {language === 'hi' ? notice.titleHi : notice.titleEn}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                PDF ({notice.fileSize})
              </span>
              <a
                href="https://www.aicte-india.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-orange-50 hover:text-mygov-orange hover:border-orange-200 text-slate-700 font-bold text-xs shadow-2xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('download', 'Download')}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">
          {language === 'hi'
            ? 'एआईसीटीई अनुमोदन ब्यूरो द्वारा प्रकाशित आधिकारिक अधिसूचनाएं'
            : 'Showing official notifications published by the AICTE Approval Bureau'}
        </span>
        <a
          href="https://www.aicte-india.org"
          target="_blank"
          rel="noreferrer"
          className="text-mygov-orange hover:underline font-bold flex items-center gap-1"
        >
          <span>{t('viewArchive', 'View Archive (2020-2025)')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
