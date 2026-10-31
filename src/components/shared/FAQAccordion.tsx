import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How does the PARIKALP AI Document Intelligence pipeline operate?',
      answer:
        'PARIKALP uses an automated multi-stage computer vision and OCR pipeline. Upon document ingestion into the private object storage, the system executes layout classification, extracts text, cross-references land/building/cadre data against the AICTE Approval Process Handbook (APH 2026-27), checks date stamp metadata to detect tampering signals, and presents verification results to the scrutiny officer as GREEN (passed), AMBER (requires review), or RED (discrepancy detected).',
    },
    {
      question: 'What happens when an institution receives a discrepancy notice?',
      answer:
        'When an officer issues a discrepancy notice (e.g., an expired Fire Safety Certificate or ambiguous land demarcation), the application automatically moves to "Discrepancy Raised" status. An automated multi-channel notification (In-app, SMS, and Email) is dispatched to the Registrar with a statutory rectification window (default 7 days). Once the institution uploads the corrected document, the application enters the officer re-scrutiny queue.',
    },
    {
      question: 'How does automated Conflict of Interest screening work for EVC appointments?',
      answer:
        'Before any Expert Visit Committee (EVC) is confirmed, PARIKALP runs an algorithmic conflict check cross-referencing candidate experts against institutional alumni registers, previous employment records, consultancy disclosures, and regional proximity. Only unconflicted academicians and CPWD representatives are scheduled.',
    },
    {
      question: 'How does the 3-Tier Escalation Matrix prevent administrative pendency?',
      answer:
        'Every stage of the approval process has an enforceable SLA countdown. If an action is overdue beyond the configured threshold, the system auto-escalates: Level 1 (Assigned Scrutiny Officer) -> Level 2 (Regional Director) -> Level 3 (AICTE Member Secretary & SAC Chairman), triggering priority SMS and alert dispatches.',
    },
    {
      question: 'How does Continuous Compliance Monitoring function after initial approval?',
      answer:
        'Unlike legacy portals where compliance ends at the initial approval date, PARIKALP maintains active surveillance over perpetual lease validity, fire NOC renewals, FDR maturity countdowns (with 9-month advance alerts), and faculty biometric ratios throughout the academic year. Deficiencies trigger automated show-cause notices.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4 font-sans">
      <div className="border-b border-slate-100 pb-3">
        <span className="pill pill-accent text-[10px] py-0.5 mb-1.5 inline-block">
          Regulatory Knowledge Base
        </span>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-parikalp-primary" />
          Frequently Asked Questions & Approval Guidelines
        </h3>
        <p className="text-xs text-slate-500">
          Official statutory procedures under the All India Council for Technical Education Act 1987.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-3.5">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-parikalp-primary transition-colors gap-3"
              >
                <span>{faq.question}</span>
                <span className="p-1 rounded-full bg-slate-100 text-slate-600 flex-shrink-0">
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>
              {isOpen && (
                <div className="pt-2.5 text-xs text-slate-600 leading-relaxed animate-fade">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

