import React from 'react';
import { ShieldCheck, Database, Server, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
              <div className="w-5 h-5 rounded bg-parikalp-primary flex items-center justify-center text-[10px]">
                P
              </div>
              PARIKALP
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Integrated AICTE Approval Workflow Automation, Continuous Compliance Monitoring & Real-time Alert Escalation Matrix.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">
              Statutory Links
            </h5>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a href="https://www.aicte-india.org" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  AICTE Official Portal <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://www.sih.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  Smart India Hackathon 2026 <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  National Portal of India <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">
              Security & Compliance
            </h5>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>AES-256 Object Vault Encryption</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>PostgreSQL Immutable Audit Trail</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Server className="w-3.5 h-3.5 text-amber-400" />
                <span>NIC Government Cloud Infrastructure</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">
              SIH 2026 Presentation
            </h5>
            <p className="text-[11px] text-slate-400 mb-2">
              Problem ID: <strong>26265</strong><br />
              Team: <strong>PARIKALP (ID: 199059)</strong><br />
              Theme: <strong>Smart Automation</strong>
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>
            © 2026 All India Council for Technical Education (AICTE). Designed for SIH 2026.
          </p>
          <p className="font-mono text-slate-400">
            PARIKALP v2.6.0-PROD • Build 2026.10.31
          </p>
        </div>
      </div>
    </footer>
  );
};

