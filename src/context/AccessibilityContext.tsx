import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'en' | 'hi';
export type FontSize = 'small' | 'normal' | 'large';

interface AccessibilityContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  isHighContrast: boolean;
  toggleContrast: () => void;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
  t: (key: string, fallback?: string) => string;
}

export const translations: Record<string, { en: string; hi: string }> = {
  // Sovereign & Ministries
  govtOfIndia: { en: 'Government of India', hi: 'भारत सरकार' },
  ministryOfEdu: { en: 'Ministry of Education', hi: 'शिक्षा मंत्रालय' },
  aicteFull: { en: 'All India Council for Technical Education', hi: 'अखिल भारतीय तकनीकी शिक्षा परिषद' },
  aictePortalName: { en: 'AICTE National Regulatory Portal', hi: 'एआईसीटीई राष्ट्रीय नियामक पोर्टल' },
  skipToContent: { en: 'Skip to Main Content', hi: 'मुख्य सामग्री पर जाएं' },
  screenReader: { en: 'Screen Reader', hi: 'स्क्रीन रीडर' },
  contrast: { en: 'Contrast', hi: 'कंट्रास्ट' },
  meriPehchanLogin: { en: 'MeriPehchan Login', hi: 'मेरी पहचान लॉगिन' },
  activePortal: { en: 'Active Portal:', hi: 'सक्रिय पोर्टल:' },
  roleView: { en: 'Role View:', hi: 'भूमिका दृश्य:' },
  latestUpdates: { en: 'Latest Updates', hi: 'ताज़ा अपडेट' },

  // Navigation Items
  overviewDashboard: { en: 'Overview Dashboard', hi: 'मुख्य डैशबोर्ड' },
  institutionProfile: { en: 'My Institution Profile', hi: 'संस्थान प्रोफ़ाइल' },
  officerQueue: { en: 'Officer Queue', hi: 'अधिकारी संवीक्षा कतार' },
  executiveDesk: { en: 'Executive HQ Desk', hi: 'मुख्यालय कार्यकारी पटल' },
  applicationQueue: { en: 'Application Queue', hi: 'आवेदन सूची' },
  submitNewApplication: { en: 'Submit New Application', hi: 'नया आवेदन करें' },
  scrutinyWorkspace: { en: 'Scrutiny Workspace', hi: 'संवीक्षा कार्यक्षेत्र' },
  documentVerification: { en: 'AI Document Verification', hi: 'दस्तावेज़ सत्यापन' },
  evcManagement: { en: 'EVC Management', hi: 'विशेषज्ञ समिति (EVC)' },
  committeeReview: { en: 'Committee Review (SAC)', hi: 'अपीलीय समिति (SAC)' },
  complianceMonitoring: { en: 'Compliance Monitoring', hi: 'सतत अनुपालन निगरानी' },
  documentValidity: { en: 'Document Validity Hub', hi: 'दस्तावेज़ वैधता केंद्र' },
  alertsEscalations: { en: 'Alerts & Escalations', hi: 'सूचनाएं एवं प्राथमिकता' },
  reportsAnalytics: { en: 'Reports & Analytics', hi: 'रिपोर्ट एवं सांख्यिकी' },
  auditLedger: { en: 'Audit Ledger & Logs', hi: 'ऑडिट लॉग्स' },
  userManagement: { en: 'User Management', hi: 'उपयोगकर्ता प्रबंधन' },
  settingsManuals: { en: 'Settings & Guidelines', hi: 'सेटिंग्स एवं नियमावली' },

  // Quick Tracker
  trackYourApp: { en: 'Track Your Approval Application', hi: 'अपने अनुमोदन आवेदन की स्थिति जांचें' },
  trackSubtitle: {
    en: 'Enter your AICTE Application Reference Number to check real-time scrutiny and committee decisions.',
    hi: 'वास्तविक समय में संवीक्षा और समिति के निर्णयों की स्थिति जानने के लिए अपना आवेदन संदर्भ नंबर दर्ज करें।',
  },
  enterRefPlaceholder: { en: 'e.g. APP-8492 or APP-7821', hi: 'उदा. APP-8492 या APP-7821' },
  trackBtn: { en: 'Track', hi: 'जांचें' },

  // 4 Core Tasks
  newAppCardTitle: { en: 'New Application (2026-27)', hi: 'नया आवेदन (2026-27)' },
  newAppCardDesc: {
    en: 'Start new application for Extension of Approval (EOA), new institute, or intake increase.',
    hi: 'अनुमोदन विस्तार (EOA), नए संस्थान, या सीट वृद्धि के लिए नया ऑनलाइन आवेदन शुरू करें।',
  },
  applyOnline: { en: 'Apply Online', hi: 'ऑनलाइन आवेदन करें' },
  scrutinyCardTitle: { en: 'Check Scrutiny & Remarks', hi: 'संवीक्षा एवं टिप्पणियां देखें' },
  scrutinyCardDesc: {
    en: 'View regional officer remarks, check document completeness score, and respond to notices.',
    hi: 'क्षेत्रीय अधिकारी की टिप्पणियां देखें, दस्तावेज़ पूर्णता जांचें और विसंगति का उत्तर दें।',
  },
  viewRemarks: { en: 'View Remarks', hi: 'टिप्पणियां देखें' },
  evcCardTitle: { en: 'EVC Inspection Schedule', hi: 'विशेषज्ञ निरीक्षण कार्यक्रम' },
  evcCardDesc: {
    en: 'Check scheduled expert visit date, committee roster, and mandatory laboratory benchmarks.',
    hi: 'निर्धारित विशेषज्ञ दौरा तिथि, समिति सदस्यों की सूची और प्रयोगशाला मानदंड जांचें।',
  },
  inspectionDetails: { en: 'Inspection Details', hi: 'निरीक्षण विवरण' },
  ordersCardTitle: { en: 'Download Approval Orders', hi: 'अनुमोदन आदेश डाउनलोड' },
  ordersCardDesc: {
    en: 'Download digitally signed EOA approval letters and Standing Appellate Committee decisions.',
    hi: 'डिजिटल रूप से हस्ताक्षरित EOA पत्र और स्थायी अपीलीय समिति के निर्णय डाउनलोड करें।',
  },
  downloadLetter: { en: 'Download Letter', hi: 'पत्र डाउनलोड करें' },

  // Helpline Ribbon
  tollFreeHelpline: { en: 'Toll-Free Helpline', hi: 'टोल-फ्री हेल्पलाइन' },
  workingHours: { en: '(9:30 AM – 5:30 PM, Mon-Fri)', hi: '(प्रातः 9:30 से सायं 5:30, सोम-शुक्र)' },
  helpdeskEmail: { en: 'Helpdesk Email', hi: 'हेल्पडेस्क ईमेल' },
  approvalHandbook: { en: 'Approval Handbook (PDF)', hi: 'अनुमोदन हैंडबुक (PDF)' },
  userGuideFaqs: { en: 'User Guide & FAQs', hi: 'उपयोगकर्ता मार्गदर्शिका' },

  // How it works
  howItWorksHeader: { en: 'HOW IT WORKS • कार्यप्रणाली', hi: 'कार्यप्रणाली • कैसे काम करता है' },
  howItWorksTitle: { en: 'How the AICTE Approval Process Works', hi: 'एआईसीटीई अनुमोदन प्रक्रिया कैसे कार्य करती है' },
  howItWorksSubtitle: {
    en: 'Simple 4-step walkthrough for new institutions, applicants, and college administrators.',
    hi: 'नए संस्थानों, आवेदकों और कॉलेज प्रशासकों के लिए सरल 4-चरणीय मार्गदर्शन।',
  },
  step1Title: { en: 'Online Application', hi: 'ऑनलाइन आवेदन' },
  step1Desc: {
    en: 'Register your institution, fill program details, faculty counts, and upload supporting documents.',
    hi: 'संस्थान पंजीकृत करें, पाठ्यक्रम विवरण, संकाय संख्या भरें और आवश्यक दस्तावेज़ अपलोड करें।',
  },
  step2Title: { en: 'Document Scrutiny', hi: 'दस्तावेज़ संवीक्षा' },
  step2Desc: {
    en: 'Regional Scrutiny Officers review your submitted proofs. Automated checks help identify missing or expired dates early.',
    hi: 'क्षेत्रीय अधिकारी आपके साक्ष्यों की जांच करते हैं। स्वचालित जांच समाप्त तिथियों को शीघ्र पहचानने में सहायता करती है।',
  },
  step3Title: { en: 'Campus Inspection (EVC)', hi: 'परिसर निरीक्षण (EVC)' },
  step3Desc: {
    en: 'Independent senior academicians and CPWD representatives conduct physical or virtual inspection of laboratories and fire safety.',
    hi: 'स्वतंत्र वरिष्ठ शिक्षाविद और सीपीडब्ल्यूडी प्रतिनिधि प्रयोगशालाओं, उपकरणों और अग्नि सुरक्षा का सत्यापन करते हैं।',
  },
  step4Title: { en: 'Approval Order Issued', hi: 'डिजिटल अनुमोदन आदेश' },
  step4Desc: {
    en: 'Standing Appellate Committee (SAC) approves your dossier. Instantly download your digitally signed EOA letter.',
    hi: 'स्थायी अपीलीय समिति आपकी फ़ाइल को मंज़ूरी देती है। तुरंत डिजिटल हस्ताक्षरित EOA पत्र डाउनलोड करें।',
  },

  // Notices
  noticesHeader: { en: 'OFFICIAL NOTICES & CIRCULARS', hi: 'आधिकारिक सूचनाएं एवं परिपत्र' },
  noticesTitle: { en: 'Important Announcements & Public Advisories', hi: 'महत्वपूर्ण सूचनाएं एवं सार्वजनिक परामर्श' },
  all: { en: 'All', hi: 'सभी' },
  circulars: { en: 'Circulars', hi: 'परिपत्र' },
  notices: { en: 'Notices', hi: 'सूचनाएं' },
  download: { en: 'Download', hi: 'डाउनलोड' },
  viewArchive: { en: 'View Archive (2020-2025)', hi: 'अभिलेखागार देखें (2020-2025)' },

  // Footer & Compliance
  visitorCounter: { en: 'Visitor Counter:', hi: 'कुल आगंतुक:' },
  lastUpdated: { en: 'Last Updated:', hi: 'अंतिम अद्यतन:' },
  footerDisclaimer: {
    en: 'Website designed, developed, and deployed for All India Council for Technical Education (AICTE), Ministry of Education, Government of India.',
    hi: 'यह वेबसाइट अखिल भारतीय तकनीकी शिक्षा परिषद (एआईसीटीई), शिक्षा मंत्रालय, भारत सरकार के लिए विकसित और तैनात की गई है।',
  },
  nicHosting: {
    en: 'Hosted on National Informatics Centre (NIC) MeghRaj Cloud Infrastructure • High-Availability Regulatory Cluster.',
    hi: 'राष्ट्रीय सूचना विज्ञान केंद्र (एनआईसी) मेघराज क्लाउड अवसंरचना पर होस्ट किया गया • उच्च-उपलब्धता नियामक क्लस्टर।',
  },
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('parikalp_lang') as Language) || 'en';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('parikalp_font_size') as FontSize) || 'normal';
  });

  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('parikalp_contrast') === 'high';
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Apply font scale dynamically to root document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-scale-small', 'font-scale-normal', 'font-scale-large');
    root.classList.add(`font-scale-${fontSize}`);

    if (fontSize === 'small') {
      root.style.fontSize = '14.5px';
    } else if (fontSize === 'large') {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }

    localStorage.setItem('parikalp_font_size', fontSize);
  }, [fontSize]);

  // Apply high contrast mode to root document
  useEffect(() => {
    const root = document.documentElement;
    if (isHighContrast) {
      root.classList.add('high-contrast');
      localStorage.setItem('parikalp_contrast', 'high');
    } else {
      root.classList.remove('high-contrast');
      localStorage.setItem('parikalp_contrast', 'normal');
    }
  }, [isHighContrast]);

  // Persist language selection
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('parikalp_lang', lang);
    document.documentElement.lang = lang;
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  }, [language, setLanguage]);

  const setFontSize = useCallback((size: FontSize) => {
    setFontSizeState(size);
  }, []);

  const toggleContrast = useCallback(() => {
    setIsHighContrast(prev => !prev);
  }, []);

  // Web Speech API Narrator (Screen Reader Simulation)
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speakText = useCallback(
    (text: string) => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [language]
  );

  // Translation helper function
  const t = useCallback(
    (key: string, fallback?: string): string => {
      const entry = translations[key];
      if (entry) {
        return entry[language] || fallback || entry.en;
      }
      return fallback || key;
    },
    [language]
  );

  return (
    <AccessibilityContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        fontSize,
        setFontSize,
        isHighContrast,
        toggleContrast,
        speakText,
        isSpeaking,
        stopSpeaking,
        t,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

