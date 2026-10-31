import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  ShieldCheck,
  Building2,
  Users,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface SpotlightCard {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  image: string;
  summary: string;
  benchmark: string;
  link: string;
}

export const MyGovSpotlight: React.FC = () => {
  const cards: SpotlightCard[] = [
    {
      id: 'spotlight-1',
      category: 'AI & COMPUTING LABS',
      categoryColor: 'bg-blue-100 text-mygov-blue border-blue-200',
      title: 'High-Performance AI & Robotics Infrastructure Norms',
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      summary:
        'Technical colleges must maintain minimum 30 high-spec computing nodes with dedicated GPU clusters for Artificial Intelligence, Machine Learning & Cyber-physical systems.',
      benchmark: 'Min 1:4 Terminal to Student Ratio',
      link: '/verification',
    },
    {
      id: 'spotlight-2',
      category: 'LIFE SAFETY & FIRE NOC',
      categoryColor: 'bg-rose-100 text-rose-700 border-rose-200',
      title: 'Mandatory Fire NOC & Wet Riser Hydrant Verification',
      image:
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
      summary:
        'Automated expiration tracking prevents regulatory lapses. Institutions receive proactive 90-day renewal alerts prior to Fire Department NOC expiry.',
      benchmark: '100% Unobstructed Egress & Standpipe',
      link: '/documents',
    },
    {
      id: 'spotlight-3',
      category: 'FACULTY CADRE RATIO',
      categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      title: 'Cadre Proportions (1:2:6) & Aadhaar Biometric Attendance',
      image:
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
      summary:
        'Statutory 1:15 Student-Faculty Ratio verified through Form-16 tax records and biometric log synchronization to eliminate ghost faculty.',
      benchmark: '1 Professor : 2 Assoc. : 6 Asst. Prof',
      link: '/compliance',
    },
    {
      id: 'spotlight-4',
      category: 'INNOVATION & STARTUP HUBS',
      categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
      title: 'Campus Incubation & Industry Collaboration Standards',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      summary:
        'Normative guidelines for IIC (Institution’s Innovation Council), FabLabs, patent filings, and corporate apprenticeship pathways under NEP 2020.',
      benchmark: 'Minimum 500 sq.m Dedicated Incubation Space',
      link: '/reports',
    },
  ];

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <span className="text-xs font-bold text-mygov-blue uppercase tracking-wider block">
            STATUTORY BENCHMARKS & CAMPUS SPOTLIGHT
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            AICTE Regulatory Guidelines & Infrastructure Norms
          </h2>
        </div>
        <Link
          to="/compliance"
          className="text-xs font-bold text-mygov-orange hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View All Compliance Checklists</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(card => (
          <div
            key={card.id}
            className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo Header */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs ${card.categoryColor}`}
                  >
                    {card.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-mygov-blue transition-colors line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {card.summary}
                </p>
              </div>
            </div>

            {/* Card Footer with Benchmark Badge */}
            <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[170px]" title={card.benchmark}>
                {card.benchmark}
              </span>
              <Link
                to={card.link}
                className="text-mygov-orange hover:text-orange-700 font-bold text-xs flex items-center gap-1 flex-shrink-0"
              >
                Inspect <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

