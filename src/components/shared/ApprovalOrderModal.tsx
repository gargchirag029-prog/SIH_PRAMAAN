import React from 'react';
import { Modal } from './Modal';
import { Application } from '../../types/application';
import { Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

interface ApprovalOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

export const ApprovalOrderModal: React.FC<ApprovalOrderModalProps> = ({
  isOpen,
  onClose,
  application,
}) => {
  if (!application) return null;

  const handlePrint = () => {
    window.print();
  };

  const orderNo = application.approvalLetterNumber || `F.No. AICTE/AB/2026/LOA-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const approvalDate = application.approvalDate || new Date().toISOString().split('T')[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Regulatory Approval Order"
      subtitle="Issued by All India Council for Technical Education (A Statutory Body of the Govt. of India)"
      maxWidth="4xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Digitally Endorsed by Executive Committee, AICTE New Delhi
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Print Order
            </button>
            <button
              onClick={() => alert(`Official PDF Downloaded:\n${orderNo}.pdf`)}
              type="button"
              className="px-4 py-1.5 text-xs font-medium text-white bg-parikalp-primary hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Official PDF
            </button>
          </div>
        </div>
      }
    >
      <div className="bg-white p-6 sm:p-8 border border-slate-300 rounded-lg shadow-sm text-slate-900 font-serif leading-relaxed print:p-0 print:border-none print:shadow-none">
        {/* National Emblem & AICTE Header */}
        <div className="text-center border-b-2 border-slate-900 pb-4 mb-6 font-sans">
          <div className="flex justify-center mb-2">
            {/* Simulated Ashoka Emblem / AICTE Seal */}
            <div className="w-14 h-14 rounded-full border-2 border-slate-800 flex items-center justify-center p-1 bg-amber-50/50">
              <span className="text-[9px] font-black tracking-tight text-center text-slate-800 uppercase leading-none">
                अखिल भारतीय तकनीकी शिक्षा परिषद<br />AICTE
              </span>
            </div>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-wide uppercase">
            All India Council for Technical Education
          </h2>
          <p className="text-xs font-semibold text-slate-700">
            (A Statutory Body Under Ministry of Education, Govt. of India)
          </p>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070 • Website: www.aicte-india.org
          </p>
        </div>

        {/* Letter Metadata */}
        <div className="flex justify-between items-start text-xs font-sans mb-6 border-b border-slate-200 pb-3">
          <div>
            <p className="font-semibold text-slate-800">
              LETTER OF APPROVAL / EXTENSION OF APPROVAL
            </p>
            <p className="font-mono text-slate-700 mt-1">
              Order Ref: <span className="font-bold">{orderNo}</span>
            </p>
            <p className="text-slate-600">
              AICTE Permanent Institute ID: <span className="font-mono font-semibold">{application.aictePermanentId}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium text-slate-700">
              Date of Order: <span className="font-semibold">{approvalDate}</span>
            </p>
            <p className="text-slate-600">Academic Session: 2026-2027</p>
            <p className="text-slate-600">Regional Office: {application.region}</p>
          </div>
        </div>

        {/* Addressee */}
        <div className="text-xs mb-5 font-sans">
          <p className="text-slate-600">To,</p>
          <p className="font-bold text-slate-900">{application.contactPerson.name}</p>
          <p className="text-slate-700">{application.contactPerson.designation}</p>
          <p className="font-semibold text-slate-800">{application.institutionName}</p>
          <p className="text-slate-600">{application.state}, India</p>
        </div>

        {/* Subject */}
        <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs mb-5 font-sans">
          <p className="font-bold text-slate-900">
            Sub: AICTE Approval for {application.category} for Academic Year 2026-27 — Reg.
          </p>
          <p className="text-[11px] text-slate-600 mt-1">
            Ref: Application No. <span className="font-mono font-semibold">{application.referenceNumber}</span> submitted via PARIKALP National Approval Portal.
          </p>
        </div>

        {/* Main Body */}
        <div className="text-xs text-slate-800 space-y-3 font-sans leading-relaxed">
          <p>
            Sir / Madam,
          </p>
          <p>
            In terms of the provisions under the All India Council for Technical Education
            (Grant of Approvals for Technical Education) Regulations, 2026 and relevant
            norms and standards specified in the Approval Process Handbook (APH) 2026-27,
            the Competent Authority is pleased to convey approval to{' '}
            <strong className="text-slate-900">{application.institutionName}</strong> for the
            courses and intake shown below for the Academic Year 2026-27:
          </p>

          {/* Approved Courses Table */}
          <div className="overflow-x-auto my-3 border border-slate-300 rounded">
            <table className="min-w-full text-[11px] text-left">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 font-semibold">
                <tr>
                  <th className="py-2 px-3">Program</th>
                  <th className="py-2 px-3">Level</th>
                  <th className="py-2 px-3">Course Name</th>
                  <th className="py-2 px-3 text-center">Approved Intake 2026-27</th>
                  <th className="py-2 px-3 text-center">Accreditation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {application.courses.map((course, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2 px-3">{course.program}</td>
                    <td className="py-2 px-3 font-medium">{course.level}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{course.name}</td>
                    <td className="py-2 px-3 text-center font-bold text-emerald-700">
                      {course.proposedIntake} Seats
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-medium">
                        {course.nbaAccredited ? 'NBA Tier-I Accredited' : 'Approved AICTE Norms'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            The institution shall strictly adhere to the Student-Faculty Ratio of 1:15,
            maintain unencumbered continuous land demarcation, ensure mandatory biometric
            faculty reporting, and maintain compliance throughout the academic year.
          </p>
        </div>

        {/* Digital Signature & QR Verification */}
        <div className="mt-8 pt-6 border-t border-slate-300 flex items-end justify-between font-sans text-xs">
          <div className="flex items-center gap-3">
            {/* Simulated QR Code */}
            <div className="w-16 h-16 border-2 border-slate-900 p-1 flex flex-col justify-between items-center bg-white">
              <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-200'} rounded-xs`}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-slate-500">
                Digital Verification QR
              </p>
              <p className="text-[10px] text-slate-600 font-mono">
                Verify at: parikalp.aicte-india.org/verify
              </p>
              <p className="text-[9px] text-slate-400 font-mono break-all max-w-[260px]">
                Digest: {application.digitalSignatureHash || '0x9a84b01e38927164ff58201a'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Digitally Signed by:
            </div>
            <p className="font-bold text-slate-900">Prof. Rajive Kumar</p>
            <p className="text-slate-600 text-[11px]">Member Secretary, AICTE New Delhi</p>
            <p className="text-slate-400 text-[10px]">Date: {approvalDate}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

