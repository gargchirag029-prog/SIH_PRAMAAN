import React from 'react';
import { Link } from 'react-router-dom';
import {
  FilePlus,
  FileCheck2,
  Calendar,
  Gavel,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface PillarItem {
  id: string;
  badge: string;
  badgeBg: string;
  title: string;
  hindiTitle: string;
  desc: string;
  icon: any;
  iconBg: string;
  borderColor: string;
  hoverBorder: string;
  link: string;
  stats: string;
}

export const MyGovPillars: React.FC = () => {
  const pillars: PillarItem[] = [
    {
      id: 'apply',
      badge: 'DO • आवेदन',
      badgeBg: 'bg-orange-100 text-mygov-orange border-orange-200',
      title: 'Submit Application',
      hindiTitle: 'नया आवेदन एवं अनुमोदन विस्तार',
      desc: 'Extension of Approval (EOA), New Technical Institutions, and Intake Expansion with real-time checklist validation.',
      icon: FilePlus,
      iconBg: 'bg-orange-500 text-white',
      borderColor: 'border-t-4 border-t-mygov-orange',
      hoverBorder: 'hover:border-orange-400',
      link: '/submit-application',
      stats: '1,428 Applications In Process',
    },
    {
      id: 'scrutiny',
      badge: 'DISCUSS • संवीक्षा',
      badgeBg: 'bg-blue-100 text-mygov-blue border-blue-200',
      title: 'Scrutiny & Verification',
      hindiTitle: 'दस्तावेज़ संवीक्षा एवं विसंगति निवारण',
      desc: 'AI forensic document analysis, Land Title & Fire NOC validation, and transparent discrepancy rectification notices.',
      icon: FileCheck2,
      iconBg: 'bg-mygov-blue text-white',
      borderColor: 'border-t-4 border-t-mygov-blue',
      hoverBorder: 'hover:border-blue-400',
      link: '/scrutiny',
      stats: '4.2 Days Avg Scrutiny SLA',
    },
    {
      id: 'evc',
      badge: 'INSPECT • निरीक्षण',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      title: 'Expert Visit Committee',
      hindiTitle: 'विशेषज्ञ समिति निरीक्षण एवं भू-टैगिंग',
      desc: 'Conflict-of-interest screened committee appointment, geotagged infrastructure verification, and digital visit reports.',
      icon: Calendar,
      iconBg: 'bg-emerald-600 text-white',
      borderColor: 'border-t-4 border-t-emerald-600',
      hoverBorder: 'hover:border-emerald-400',
      link: '/evc',
      stats: '184 Inspections Scheduled',
    },
    {
      id: 'sac',
      badge: 'DECIDE • निर्णय',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
      title: 'Committee Review & SAC',
      hindiTitle: 'अपीलीय समिति निर्णय एवं डिजिटल आदेश',
      desc: 'Executive review by Standing Appellate Committee (SAC) with cryptographic digital signatures and instant EOA orders.',
      icon: Gavel,
      iconBg: 'bg-purple-600 text-white',
      borderColor: 'border-t-4 border-t-purple-600',
      hoverBorder: 'hover:border-purple-400',
      link: '/committee',
      stats: '892 Digital Orders Issued',
    },
    {
      id: 'compliance',
      badge: 'MONITOR • अनुपालन',
      badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      title: '365-Day Compliance',
      hindiTitle: 'सतत निगरानी एवं बायोमेट्रिक सत्यापन',
      desc: 'Continuous surveillance of FDR maturity, mandatory disclosures, faculty cadre ratios, and automated SLA escalations.',
      icon: ShieldCheck,
      iconBg: 'bg-cyan-600 text-white',
      borderColor: 'border-t-4 border-t-cyan-600',
      hoverBorder: 'hover:border-cyan-400',
      link: '/compliance',
      stats: '96.8% Institutional Compliance',
    },
  ];

  return (
    <div className="space-y-3 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold text-mygov-orange uppercase tracking-wider block">
            CITIZEN & INSTITUTIONAL PARTICIPATION
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            PARIKALP Regulatory Pillars • नियामक स्तम्भ
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-md">
          Single-window automated framework aligned with National Education Policy (NEP 2020) and AICTE Approval Regulations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {pillars.map(pillar => {
          const Icon = pillar.icon;
          return (
            <Link
              key={pillar.id}
              to={pillar.link}
              className={`bg-white rounded-xl p-5 border border-slate-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between group transform hover:-translate-y-1 ${pillar.borderColor} ${pillar.hoverBorder}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${pillar.iconBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pillar.badgeBg}`}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-mygov-blue transition-colors line-clamp-1">
                  {pillar.title}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 mb-2">
                  {pillar.hindiTitle}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-500 text-[10px]">
                  {pillar.stats}
                </span>
                <span className="text-mygov-orange font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

