import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Search, Volume2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface FAQItem {
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
  category: string;
}

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');
  const { language, speakText } = useAccessibility();

  const isHi = language === 'hi';

  const faqs: FAQItem[] = [
    {
      category: 'DOCUMENT INTELLIGENCE',
      questionEn: 'How does the PARIKALP AI Document Intelligence pipeline operate?',
      questionHi: 'परिकल्प एआई दस्तावेज़ सत्यापन पाइपलाइन कैसे कार्य करती है?',
      answerEn:
        'PARIKALP uses an automated multi-stage computer vision and OCR pipeline. Upon document ingestion into the private object storage, the system executes layout classification, extracts text, cross-references land/building/cadre data against the AICTE Approval Process Handbook (APH 2026-27), checks date stamp metadata to detect tampering signals, and presents verification results to the scrutiny officer as GREEN (passed), AMBER (requires review), or RED (discrepancy detected).',
      answerHi:
        'परिकल्प एक बहु-चरणीय कंप्यूटर विज़न और ओसीआर पाइपलाइन का उपयोग करता है। निजी ऑब्जेक्ट स्टोरेज में दस्तावेज़ अपलोड होते ही, प्रणाली लेआउट का वर्गीकरण करती है, टेक्स्ट निकालती है, एआईसीटीई अनुमोदन नियमावली (APH 2026-27) के अनुसार भूमि, भवन और संकाय डेटा का मिलान करती है, और संवीक्षा अधिकारी के समक्ष हरा (मान्य), पीला (समीक्षा आवश्यक), या लाल (विसंगति) के रूप में परिणाम प्रस्तुत करती है।',
    },
    {
      category: 'DISCREPANCIES & APPEALS',
      questionEn: 'What happens when an institution receives a discrepancy notice?',
      questionHi: 'जब किसी संस्थान को विसंगति या आपत्ति की सूचना मिलती है तो क्या प्रक्रिया है?',
      answerEn:
        'When an officer issues a discrepancy notice (e.g., an expired Fire Safety Certificate or ambiguous land demarcation), the application automatically moves to "Discrepancy Raised" status. An automated multi-channel notification (In-app, SMS, and Email) is dispatched to the Registrar with a statutory rectification window (default 7 days). Once the institution uploads the corrected document, the application enters the officer re-scrutiny queue.',
      answerHi:
        'जब अधिकारी द्वारा विसंगति दर्ज की जाती है (जैसे समाप्त हो चुकी फायर सेफ्टी एनओसी या अस्पष्ट भूमि दस्तावेज), तो आवेदन स्वतः "विसंगति दर्ज" स्थिति में चला जाता है। कुलसचिव को एसएमएस, ईमेल और पोर्टल अधिसूचना के माध्यम से 7 दिनों की वैधानिक समय-सीमा दी जाती है। सही दस्तावेज़ अपलोड करते ही आवेदन पुनः संवीक्षा कतार में आ जाता है।',
    },
    {
      category: 'EVC INSPECTION',
      questionEn: 'How does automated Conflict of Interest screening work for EVC appointments?',
      questionHi: 'विशेषज्ञ समिति (EVC) गठन में हितों के टकराव (Conflict of Interest) की जांच कैसे होती है?',
      answerEn:
        'Before any Expert Visit Committee (EVC) is confirmed, PARIKALP runs an algorithmic conflict check cross-referencing candidate experts against institutional alumni registers, previous employment records, consultancy disclosures, and regional proximity. Only unconflicted academicians and CPWD representatives are scheduled.',
      answerHi:
        'किसी भी विशेषज्ञ दौरा समिति (EVC) की पुष्टि से पहले, परिकल्प पूर्व छात्रों की सूची, पूर्व रोजगार रिकॉर्ड, परामर्श संबंधों और क्षेत्रीय निकटता के आधार पर स्वचालित जांच करता है। केवल स्वतंत्र एवं निष्पक्ष वरिष्ठ शिक्षाविदों और सीपीडब्ल्यूडी प्रतिनिधियों को ही समिति में नियुक्त किया जाता है।',
    },
    {
      category: 'SLA ESCALATION',
      questionEn: 'How does the 3-Tier Escalation Matrix prevent administrative pendency?',
      questionHi: '3-स्तरीय एस्केलेशन व्यवस्था प्रशासनिक देरी को कैसे रोकती है?',
      answerEn:
        'Every stage of the approval process has an enforceable SLA countdown. If an action is overdue beyond the configured threshold, the system auto-escalates: Level 1 (Assigned Scrutiny Officer) -> Level 2 (Regional Director) -> Level 3 (AICTE Member Secretary & SAC Chairman), triggering priority SMS and alert dispatches.',
      answerHi:
        'अनुमोदन प्रक्रिया के प्रत्येक चरण में एक सख्त एसएलए (SLA) उलटी गिनती होती है। यदि कोई अधिकारी निर्धारित समय से अधिक देरी करता है, तो मामला स्वतः आगे बढ़ जाता है: स्तर 1 (संवीक्षा अधिकारी) -> स्तर 2 (क्षेत्रीय निदेशक) -> स्तर 3 (एआईसीटीई सदस्य सचिव एवं समिति अध्यक्ष), जिससे त्वरित निस्तारण सुनिश्चित होता है।',
    },
    {
      category: 'CONTINUOUS COMPLIANCE',
      questionEn: 'How does Continuous Compliance Monitoring function after initial approval?',
      questionHi: 'प्रारंभिक अनुमोदन प्राप्त होने के बाद सतत अनुपालन निगरानी कैसे काम करती है?',
      answerEn:
        'Unlike legacy portals where compliance ends at the initial approval date, PARIKALP maintains active surveillance over perpetual lease validity, fire NOC renewals, FDR maturity countdowns (with 9-month advance alerts), and faculty biometric ratios throughout the academic year. Deficiencies trigger automated show-cause notices.',
      answerHi:
        'पारंपरिक व्यवस्था के विपरीत जहाँ अनुमोदन के बाद निगरानी समाप्त हो जाती थी, परिकल्प पूरे शैक्षणिक वर्ष में भूमि लीज की वैधता, फायर एनओसी नवीनीकरण, सावधि जमा (FDR) परिपक्वता (9 महीने पूर्व अग्रिम चेतावनी) और बायोमेट्रिक उपस्थिति पर निरंतर नज़र रखता है।',
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    if (!faqSearch.trim()) return true;
    const q = faqSearch.toLowerCase();
    return (
      faq.questionEn.toLowerCase().includes(q) ||
      faq.questionHi.toLowerCase().includes(q) ||
      faq.answerEn.toLowerCase().includes(q) ||
      faq.answerHi.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q)
    );
  });

  const handleReadFAQ = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakText(text);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-5 font-sans select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-100 text-mygov-orange text-[10px] font-bold border border-orange-200 mb-1.5">
            {isHi ? 'नियामक ज्ञान केंद्र' : 'Regulatory Knowledge Base'}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-mygov-blue" />
            {isHi ? 'अक्सर पूछे जाने वाले प्रश्न एवं दिशा-निर्देश' : 'Frequently Asked Questions & Approval Guidelines'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {isHi
              ? 'अखिल भारतीय तकनीकी शिक्षा परिषद अधिनियम 1987 के तहत आधिकारिक वैधानिक प्रक्रियाएं।'
              : 'Official statutory procedures under the All India Council for Technical Education Act 1987.'}
          </p>
        </div>

        {/* Live FAQ Search Input */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={faqSearch}
            onChange={e => setFaqSearch(e.target.value)}
            placeholder={isHi ? 'प्रश्न या कीवर्ड खोजें...' : 'Search questions or keywords...'}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mygov-orange bg-slate-50/50 hover:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {filteredFaqs.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            {isHi ? 'कोई प्रश्न नहीं मिला।' : 'No matching questions found.'}
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const question = isHi ? faq.questionHi : faq.questionEn;
            const answer = isHi ? faq.answerHi : faq.answerEn;

            return (
              <div key={idx} className="py-3.5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-mygov-blue transition-colors gap-3 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase hidden sm:inline">
                      {faq.category}
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform">{question}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={e => handleReadFAQ(e, `${question}. ${answer}`)}
                      className="p-1 rounded-full text-slate-400 hover:text-mygov-orange hover:bg-orange-50 transition-colors"
                      title="Listen with screen narrator"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="p-1 rounded-full bg-slate-100 text-slate-600">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </button>
                {isOpen && (
                  <div className="pt-2.5 text-xs text-slate-600 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 mt-2">
                    {answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
