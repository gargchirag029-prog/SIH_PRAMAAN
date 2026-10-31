import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FilePlus,
  FileCheck2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building,
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Slide {
  id: number;
  tagEn: string;
  tagHi: string;
  tagBg: string;
  tagBorder: string;
  tagColor: string;
  titleEn: string;
  titleHi: string;
  highlightEn: string;
  highlightHi: string;
  descriptionEn: string;
  descriptionHi: string;
  primaryCtaTextEn: string;
  primaryCtaTextHi: string;
  primaryCtaLink: string;
  secondaryCtaTextEn: string;
  secondaryCtaTextHi: string;
  secondaryCtaLink: string;
  image: string;
  badgeTextEn: string;
  badgeTextHi: string;
  stat1En: string;
  stat1Hi: string;
  stat2En: string;
  stat2Hi: string;
}

export const MyGovHeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useAccessibility();

  const slides: Slide[] = [
    {
      id: 1,
      tagEn: 'AICTE APPROVAL PROCESS 2026-27',
      tagHi: 'एआईसीटीई अनुमोदन प्रक्रिया 2026-27',
      tagBg: 'bg-orange-50',
      tagBorder: 'border-orange-200',
      tagColor: 'text-mygov-orange',
      titleEn: 'Online Approvals for Technical Institutions',
      titleHi: 'तकनीकी संस्थानों के लिए ऑनलाइन अनुमोदन',
      highlightEn: 'Simple, Transparent & 100% Online',
      highlightHi: 'सरल, पारदर्शी एवं 100% ऑनलाइन',
      descriptionEn:
        'Technical institutes, engineering colleges, and polytechnics across India can now submit applications for Extension of Approval (EOA), new programs, and intake increases with real-time tracking.',
      descriptionHi:
        'भारत भर के तकनीकी संस्थान, इंजीनियरिंग कॉलेज और पॉलिटेक्निक अब अनुमोदन विस्तार (EOA), नए पाठ्यक्रम और सीट वृद्धि के लिए रीयल-टाइम ट्रैकिंग के साथ ऑनलाइन आवेदन कर सकते हैं।',
      primaryCtaTextEn: 'Apply Online (Session 2026-27)',
      primaryCtaTextHi: 'ऑनलाइन आवेदन करें (सत्र 2026-27)',
      primaryCtaLink: '/submit-application',
      secondaryCtaTextEn: 'Track Application Status',
      secondaryCtaTextHi: 'आवेदन की स्थिति जांचें',
      secondaryCtaLink: '/applications',
      image:
        'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      badgeTextEn: 'Session 2026-27 Active',
      badgeTextHi: 'सत्र 2026-27 सक्रिय',
      stat1En: 'Average Processing: 4.2 Days',
      stat1Hi: 'औसत निपटान: 4.2 दिन',
      stat2En: '1,428 Applications Received',
      stat2Hi: '1,428 कुल आवेदन प्राप्त',
    },
    {
      id: 2,
      tagEn: 'TRANSPARENT DOCUMENT SCRUTINY',
      tagHi: 'पारदर्शी दस्तावेज़ संवीक्षा',
      tagBg: 'bg-blue-50',
      tagBorder: 'border-blue-200',
      tagColor: 'text-mygov-blue',
      titleEn: 'Faster Scrutiny & Quick Clarifications',
      titleHi: 'त्वरित संवीक्षा एवं शीघ्र स्पष्टीकरण',
      highlightEn: 'Zero Unnecessary Paperwork',
      highlightHi: 'कागजी झंझटों से पूरी तरह मुक्त',
      descriptionEn:
        'Upload your Land Registration, Building Stability, and Fire Safety certificates. Automated checks instantly verify validity dates, helping regional scrutiny officers clear applications in days instead of weeks.',
      descriptionHi:
        'भूमि पंजीकरण, भवन स्थिरता एवं अग्नि सुरक्षा प्रमाण पत्र अपलोड करें। स्वचालित प्रणाली प्रमाण पत्रों की वैधता तिथियों का त्वरित मिलान करती है, जिससे क्षेत्रीय अधिकारी हफ्तों के बजाय दिनों में संवीक्षा पूर्ण करते हैं।',
      primaryCtaTextEn: 'Check Required Documents',
      primaryCtaTextHi: 'आवश्यक दस्तावेज़ जांचें',
      primaryCtaLink: '/verification',
      secondaryCtaTextEn: 'View Pending Scrutinies',
      secondaryCtaTextHi: 'लंबित संवीक्षा सूची देखें',
      secondaryCtaLink: '/scrutiny',
      image:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      badgeTextEn: 'Automated Checks Active',
      badgeTextHi: 'स्वचालित सत्यापन सक्रिय',
      stat1En: 'Instant SMS & Email Alerts',
      stat1Hi: 'त्वरित SMS व ईमेल अलर्ट',
      stat2En: 'Clear Discrepancy Rectification',
      stat2Hi: 'स्पष्ट विसंगति सुधार सुविधा',
    },
    {
      id: 3,
      tagEn: 'EXPERT COMMITTEE VISITS (EVC)',
      tagHi: 'विशेषज्ञ समिति दौरा (EVC)',
      tagBg: 'bg-emerald-50',
      tagBorder: 'border-emerald-200',
      tagColor: 'text-emerald-700',
      titleEn: 'Independent Campus Inspections',
      titleHi: 'निष्पक्ष एवं पारदर्शी परिसर निरीक्षण',
      highlightEn: 'Clear Guidelines & Fair Reviews',
      highlightHi: 'स्पष्ट दिशा-निर्देश एवं निष्पक्ष समीक्षा',
      descriptionEn:
        'Expert Visit Committees are formed with verified, independent academicians. Check your scheduled inspection date, lab equipment criteria, and safety norms well in advance.',
      descriptionHi:
        'विशेषज्ञ दौरा समिति का गठन सत्यापित, स्वतंत्र वरिष्ठ शिक्षाविदों द्वारा किया जाता है। अपनी निरीक्षण तिथि, प्रयोगशाला उपकरण मानक और सुरक्षा नियमों की अग्रिम जानकारी प्राप्त करें।',
      primaryCtaTextEn: 'View Inspection Guidelines',
      primaryCtaTextHi: 'निरीक्षण नियमावली देखें',
      primaryCtaLink: '/evc',
      secondaryCtaTextEn: 'Check Annual Compliance',
      secondaryCtaTextHi: 'वार्षिक अनुपालन जांचें',
      secondaryCtaLink: '/compliance',
      image:
        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      badgeTextEn: '184 Inspections Scheduled',
      badgeTextHi: '184 निरीक्षण निर्धारित',
      stat1En: 'Independent Senior Academic Panels',
      stat1Hi: 'वरिष्ठ शिक्षाविदों का निष्पक्ष पैनल',
      stat2En: 'Digital Signed Approval Orders',
      stat2Hi: 'डिजिटल हस्ताक्षरित अनुमोदन आदेश',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];
  const isHi = language === 'hi';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-slate-200 relative select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Clean White Content Area (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border shadow-2xs ${slide.tagBg} ${slide.tagBorder} ${slide.tagColor}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isHi ? slide.tagHi : slide.tagEn}
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                {isHi ? slide.badgeTextHi : slide.badgeTextEn}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-snug">
              {isHi ? slide.titleHi : slide.titleEn}{' '}
              <span className="text-mygov-orange block sm:inline">
                {isHi ? slide.highlightHi : slide.highlightEn}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              {isHi ? slide.descriptionHi : slide.descriptionEn}
            </p>
          </div>

          {/* CTA Buttons in Official MyGov Saffron/Orange & Outline */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={slide.primaryCtaLink}
                className="px-5 py-2.5 sm:py-3 rounded-xl bg-mygov-orange hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <FilePlus className="w-4 h-4" />
                <span>{isHi ? slide.primaryCtaTextHi : slide.primaryCtaTextEn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={slide.secondaryCtaLink}
                className="px-5 py-2.5 sm:py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-300 transition-colors shadow-2xs"
              >
                <FileCheck2 className="w-4 h-4 text-mygov-blue" />
                <span>{isHi ? slide.secondaryCtaTextHi : slide.secondaryCtaTextEn}</span>
              </Link>
            </div>

            {/* Real-time Status Badges */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{isHi ? slide.stat1Hi : slide.stat1En}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-mygov-blue"></span>
                <span>{isHi ? slide.stat2Hi : slide.stat2En}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Campus/Lab Image Frame (5 Cols) */}
        <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-hidden">
          <img
            src={slide.image}
            alt={isHi ? slide.titleHi : slide.titleEn}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />

          {/* Controls Overlay */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-md">
            <button
              onClick={() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="p-1 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 px-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentSlide === idx ? 'w-6 bg-mygov-orange' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
              className="p-1 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
