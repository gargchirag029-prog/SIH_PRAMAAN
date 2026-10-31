import React, { useState } from 'react';
import { Cpu, Award, ShieldCheck, MapPin, CheckCircle2, AlertTriangle, Eye, Layers } from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  category: string;
  top: string;
  left: string;
  complianceScore: number;
  benchmark: string;
  observed: string;
  status: 'COMPLIANT' | 'DEFICIENT';
}

export const CampusInfrastructureInspector: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<string>('hs-1');

  const hotspots: Hotspot[] = [
    {
      id: 'hs-1',
      title: 'High-Performance Computing Cluster',
      category: 'Computer Center & AI Lab',
      top: '32%',
      left: '28%',
      complianceScore: 98,
      benchmark: 'Min 30 High Performance CAD/CAM & Simulation nodes',
      observed: '36 Dedicated Xeon Workstations with ROS2 and ABB Robotic Arms verified',
      status: 'COMPLIANT',
    },
    {
      id: 'hs-2',
      title: 'Industrial Robotics Simulation Bench',
      category: 'Engineering Research Lab',
      top: '52%',
      left: '68%',
      complianceScore: 94,
      benchmark: 'Calibrated payload robotic manipulators with emergency cutoff',
      observed: 'Dual-arm 6-DOF industrial collaborative robots operational',
      status: 'COMPLIANT',
    },
    {
      id: 'hs-3',
      title: 'Fire & Emergency Wet Riser Station',
      category: 'Life Safety & Civil Infrastructure',
      top: '72%',
      left: '38%',
      complianceScore: 96,
      benchmark: 'Unobstructed fire stairwells, wet risers & barrier-free ramps',
      observed: '100% clear egress routes, calibrated hydrants & functional lift alarms',
      status: 'COMPLIANT',
    },
    {
      id: 'hs-4',
      title: 'Biometric Attendance & Form-16 Portal',
      category: 'Faculty Cadre Verification',
      top: '25%',
      left: '75%',
      complianceScore: 100,
      benchmark: '1:15 Faculty-Student Cadre Ratio with Form-16 cross-verification',
      observed: '148 Verified full-time faculty roster matched with live biometric logs',
      status: 'COMPLIANT',
    },
  ];

  const activeHotspot = hotspots.find(h => h.id === selectedHotspot) || hotspots[0];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <span className="pill pill-accent text-[10px] py-0.5 mb-1.5 inline-block">
            EVC Physical Audit Terminal
          </span>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Interactive Campus Infrastructure & Laboratory Inspector
          </h3>
          <p className="text-xs text-slate-500">
            Hover or click on the glowing hotspots to review physical inspection observations and AICTE equipment norms.
          </p>
        </div>

        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Geotagged EVC Dossier Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Canvas (8 Cols) */}
        <div className="lg:col-span-8 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-inner bg-slate-950 border border-slate-800">
          {/* Simulated Laboratory / Campus Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/60" />

          {/* Hotspots */}
          {hotspots.map(hs => {
            const isSelected = hs.id === selectedHotspot;
            return (
              <button
                key={hs.id}
                onClick={() => setSelectedHotspot(hs.id)}
                style={{ top: hs.top, left: hs.left }}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white transition-transform ${
                  isSelected
                    ? 'bg-parikalp-primary ring-4 ring-sky-400 scale-125 z-20'
                    : 'bg-emerald-600 hover:scale-110 z-10 pulse-hotspot'
                }`}
                title={hs.title}
              >
                +
              </button>
            );
          })}

          {/* Canvas Tag */}
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white border border-slate-700 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Inspection Site: Pune Institute of Computer Science (Dhankawadi Campus)</span>
          </div>

          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-slate-300 border border-slate-700">
            Latitude: 18.4575° N • Longitude: 73.8508° E • Elevation: 560m
          </div>
        </div>

        {/* Selected Hotspot Detail Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {activeHotspot.category}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                {activeHotspot.title}
              </h4>
            </div>
            <span className="text-base font-black text-parikalp-primary">
              {activeHotspot.complianceScore}%
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">
                Statutory APH 2026-27 Norm:
              </span>
              <p className="text-slate-700 mt-0.5 leading-relaxed bg-white p-2 rounded border border-slate-200">
                {activeHotspot.benchmark}
              </p>
            </div>

            <div>
              <span className="text-slate-500 font-semibold block text-[11px]">
                EVC Committee Physical Observation:
              </span>
              <p className="text-slate-900 font-medium mt-0.5 leading-relaxed bg-emerald-50/70 p-2 rounded border border-emerald-200 text-emerald-950">
                "{activeHotspot.observed}"
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Inspection Status:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

