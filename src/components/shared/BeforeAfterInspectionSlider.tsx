import React, { useState, useRef } from 'react';
import { Eye, ShieldCheck, AlertTriangle, Scan, ChevronsLeftRight } from 'lucide-react';

export const BeforeAfterInspectionSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-card space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span className="pill pill-accent text-[10px] py-0.5 mb-1.5 inline-block">
            AI Forensic Inspection Comparison
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Raw Scanned Document vs. AI-Extracted & Annotated Dossier
          </h3>
          <p className="text-xs text-slate-400">
            Drag the slider horizontally to view how the PARIKALP AI vision engine detects date stamp anomalies and metadata fields.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Slider: {Math.round(sliderPosition)}%</span>
        </div>
      </div>

      {/* Interactive Comparison Canvas */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={e => handleMove(e.clientX)}
        className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-700 bg-slate-950"
      >
        {/* RIGHT LAYER: AI-Annotated & Verified Result */}
        <div className="absolute inset-0 bg-white p-6 text-slate-800 flex flex-col justify-between font-sans">
          <div>
            <div className="flex items-center justify-between border-b-2 border-blue-600 pb-2 mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                  PARIKALP AI Vision Extraction Engine v2.6
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  Delhi Fire Service Clearance NOC (OCR Annotated)
                </h4>
              </div>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 rounded text-[10px] font-bold">
                DISCREPANCY DETECTED
              </span>
            </div>

            {/* Simulated Annotated Body */}
            <div className="space-y-3 text-xs">
              <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded text-slate-800 relative">
                <span className="absolute -top-2 right-2 bg-blue-600 text-white px-1.5 py-0.2 rounded text-[8px] font-mono">
                  OCR Match 98.4%
                </span>
                <span className="font-semibold block text-[11px] text-blue-900">
                  Premise Name: Delhi Institute of Advanced Technology
                </span>
                <p className="text-[11px] text-slate-600">
                  Plot No. 12, Sector 23, Dwarka, New Delhi - 110077
                </p>
              </div>

              {/* Red Discrepancy Highlight Box */}
              <div className="p-2.5 bg-rose-50 border-2 border-rose-500 rounded relative">
                <span className="absolute -top-2.5 right-2 bg-rose-600 text-white px-2 py-0.5 rounded text-[9px] font-bold">
                  FLAG: EXPIRED VALIDITY
                </span>
                <div className="flex items-center justify-between text-xs font-bold text-rose-900">
                  <span>Issue Date: 12/04/2023</span>
                  <span className="text-rose-700">Expiry Date: 11/04/2024 (Lapsed 930 Days Ago)</span>
                </div>
                <p className="text-[10px] text-rose-700 mt-1">
                  AI Recommendation: Require institution to upload renewal certificate valid for AY 2026-27.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b</span>
            <span className="font-bold text-emerald-700">NIC-eSign Verified</span>
          </div>
        </div>

        {/* LEFT LAYER: Raw Scanned Institution Document (Clipped based on slider position) */}
        <div
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          className="absolute inset-0 bg-slate-200 p-6 text-slate-700 flex flex-col justify-between font-serif filter grayscale contrast-125"
        >
          <div>
            <div className="text-center border-b border-slate-400 pb-3 mb-4">
              <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">
                Government of NCT of Delhi • Headquarters: Delhi Fire Service
              </p>
              <h4 className="text-sm font-bold text-slate-900 uppercase">
                FIRE SAFETY CERTIFICATE / NOC
              </h4>
              <p className="text-[10px] text-slate-500 font-mono">
                No. DFS/MS/2023/SZ/1109 • Dated: 12/04/2023
              </p>
            </div>

            <div className="space-y-2 text-[11px] leading-relaxed text-slate-800">
              <p>
                Certified that the educational building comprised of Ground plus Three upper
                floors owned and occupied by Delhi Institute of Advanced Technology located at Plot
                12, Sector 23, Dwarka, New Delhi complies with the fire prevention requirements.
              </p>
              <p className="font-bold">
                The fire safety certificate is issued on 12/04/2023 for a period of one year in
                accordance with Rule 36 of Delhi Fire Service Rules 2010.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500 font-sans">
            <span>Raw Scan Ingestion</span>
            <span>Sub-Registrar Digital Record</span>
          </div>
        </div>

        {/* Draggable Vertical Handle */}
        <div
          style={{ left: `${sliderPosition}%` }}
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 -translate-x-1/2 shadow-glow"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-elevated border border-slate-300">
            <ChevronsLeftRight className="w-4 h-4 text-parikalp-primary" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-300 z-10">
          Raw Scanned Document
        </div>
        <div className="absolute bottom-3 right-3 bg-parikalp-primary/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white z-10">
          AI-Annotated Extraction
        </div>
      </div>
    </div>
  );
};

