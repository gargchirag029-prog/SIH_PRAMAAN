import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Application } from '../../types/application';
import { EVCCommitteeMember } from '../../types/evc';
import { evcService } from '../../services/evcService';
import { useParikalpData } from '../../context/ParikalpDataContext';
import { useNotification } from '../../context/NotificationContext';
import { Calendar, Users, ShieldCheck, MapPin, Check } from 'lucide-react';

interface EVCScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

export const EVCScheduleModal: React.FC<EVCScheduleModalProps> = ({
  isOpen,
  onClose,
  application,
}) => {
  const { refreshData } = useParikalpData();
  const { showToast } = useNotification();

  const [visitDate, setVisitDate] = useState('2026-11-06');
  const [visitTime, setVisitTime] = useState('10:00 AM');
  const [locationAddress, setLocationAddress] = useState(
    application?.institutionName ? `${application.institutionName} Main Campus, ${application.state}` : ''
  );
  const [chairmanName, setChairmanName] = useState('Prof. S. R. Gadag');
  const [chairmanInst, setChairmanInst] = useState('Senior Professor, IIT Delhi');
  const [expertName, setExpertName] = useState('Dr. Meenakshi Sundaram');
  const [expertInst, setExpertInst] = useState('Professor & Head of Dept, NIT Warangal');
  const [civilRepName, setCivilRepName] = useState('Er. Harish Chandra');
  const [civilRepInst, setCivilRepInst] = useState('Superintending Engineer, CPWD');
  const [remarks, setRemarks] = useState('Surprise physical verification of laboratories and faculty biometric attendance records.');

  if (!application) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const committeeMembers: EVCCommitteeMember[] = [
      {
        id: `m-${Date.now()}-1`,
        name: chairmanName,
        role: 'Chairman',
        institution: chairmanInst,
        phone: '+91 98100 23456',
        email: 'chairman.evc@aicte-india.org',
        confirmed: true,
      },
      {
        id: `m-${Date.now()}-2`,
        name: expertName,
        role: 'Subject Expert',
        institution: expertInst,
        phone: '+91 94440 88765',
        email: 'expert.evc@aicte-india.org',
        confirmed: true,
      },
      {
        id: `m-${Date.now()}-3`,
        name: civilRepName,
        role: 'Architect / Civil Representative',
        institution: civilRepInst,
        phone: '+91 94120 54321',
        email: 'civil.evc@cpwd.gov.in',
        confirmed: true,
      },
    ];

    evcService.scheduleVisit(
      application.id,
      visitDate,
      visitTime,
      locationAddress || `${application.institutionName} Campus`,
      committeeMembers,
      remarks
    );

    refreshData();
    showToast(
      'success',
      'EVC Inspection Scheduled',
      `Expert committee constituted for ${application.institutionName} on ${visitDate}. Conflict checks cleared.`
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Constitute & Schedule Expert Visit Committee (EVC)"
      subtitle={`Application: ${application.referenceNumber} • ${application.institutionName}`}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Conflict of Interest automated screening banner */}
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold text-xs">
              Automated Conflict of Interest Screening: Passed
            </span>
          </div>
          <span className="text-[10px] bg-emerald-200/70 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
            0 Affiliations Detected
          </span>
        </div>

        {/* Visit Logistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Proposed Visit Date:
            </label>
            <input
              type="date"
              value={visitDate}
              onChange={e => setVisitDate(e.target.value)}
              required
              className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Visit Reporting Time:
            </label>
            <input
              type="text"
              value={visitTime}
              onChange={e => setVisitTime(e.target.value)}
              placeholder="e.g. 10:00 AM IST"
              required
              className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Inspection Site Location & Campus Address:
          </label>
          <input
            type="text"
            value={locationAddress}
            onChange={e => setLocationAddress(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
          />
        </div>

        {/* Committee Member Assignment */}
        <div className="space-y-3 pt-2 border-t border-slate-200">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-600" />
            Nominated Committee Members:
          </h4>

          {/* Member 1: Chairman */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">1. Committee Chairman</span>
              <span className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-semibold">
                Senior Academician
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={chairmanName}
                onChange={e => setChairmanName(e.target.value)}
                placeholder="Chairman Name"
                className="border border-slate-300 rounded p-1.5 bg-white text-xs"
              />
              <input
                type="text"
                value={chairmanInst}
                onChange={e => setChairmanInst(e.target.value)}
                placeholder="Institution Affiliation"
                className="border border-slate-300 rounded p-1.5 bg-white text-xs"
              />
            </div>
          </div>

          {/* Member 2: Subject Expert */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">2. Subject Matter Expert</span>
              <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                Domain Specialist
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={expertName}
                onChange={e => setExpertName(e.target.value)}
                placeholder="Expert Name"
                className="border border-slate-300 rounded p-1.5 bg-white text-xs"
              />
              <input
                type="text"
                value={expertInst}
                onChange={e => setExpertInst(e.target.value)}
                placeholder="Institution Affiliation"
                className="border border-slate-300 rounded p-1.5 bg-white text-xs"
              />
            </div>
          </div>

          {/* Member 3: Civil / Architect */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">3. Architect / Civil Representative</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                PWD / CPWD Certified
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={civilRepName}
                onChange={e => setCivilRepName(e.target.value)}
                placeholder="Architect / Engineer Name"
                className="border border-slate-300 rounded p-1.5 bg-white text-xs"
              />
              <input
                type="text"
                value={civilRepInst}
                onChange={e => setCivilRepInst(e.target.value)}
                placeholder="Department"
                className="border border-slate-300 rounded p-1.5 bg-white text-xs"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Mandate & Special Directives for Committee:
          </label>
          <textarea
            rows={2}
            value={remarks}
            onChange={e => setRemarks(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
          />
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            Issue EVC Inspection Orders
          </button>
        </div>
      </form>
    </Modal>
  );
};

