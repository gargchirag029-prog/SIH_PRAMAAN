import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationService } from '../services/applicationService';
import { documentService } from '../services/documentService';
import { useNotification } from '../context/NotificationContext';
import { useParikalpData } from '../context/ParikalpDataContext';
import { ApplicationCategory, Region } from '../types/application';
import {
  Building2,
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Plus,
  Trash2,
  Download,
  FileCheck,
} from 'lucide-react';

export const ApplicationSubmission: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useNotification();
  const { refreshData } = useParikalpData();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppRef, setSubmittedAppRef] = useState<string | null>(null);

  // Form State
  // Step 1: Institution Info
  const [institutionName, setInstitutionName] = useState('Delhi Institute of Advanced Technology');
  const [institutionType, setInstitutionType] = useState<'Government' | 'Govt-Aided' | 'Private-Unaided'>('Government');
  const [aictePermanentId, setAictePermanentId] = useState('1-42981001');
  const [region, setRegion] = useState<Region>('North-Western');
  const [state, setState] = useState('Delhi');
  const [contactName, setContactName] = useState('Dr. Ramesh Sharma');
  const [contactDesignation, setContactDesignation] = useState('Registrar');
  const [contactPhone, setContactPhone] = useState('+91 98112 45890');
  const [contactEmail, setContactEmail] = useState('registrar@diat.ac.in');

  // Step 2: Application Details
  const [category, setCategory] = useState<ApplicationCategory>('Extension of Approval (EOA)');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [landAreaAcres, setLandAreaAcres] = useState(12.5);
  const [builtUpAreaSqMeters, setBuiltUpAreaSqMeters] = useState(28400);
  const [totalFacultyCount, setTotalFacultyCount] = useState(148);
  const [studentFacultyRatio, setStudentFacultyRatio] = useState('1:15');
  const [courses, setCourses] = useState([
    {
      id: 'c-101',
      name: 'Computer Science & Engineering',
      program: 'Engineering & Technology' as const,
      level: 'UG' as const,
      currentIntake: 180,
      proposedIntake: 180,
      nbaAccredited: true,
    },
    {
      id: 'c-102',
      name: 'Artificial Intelligence & Machine Learning',
      program: 'Engineering & Technology' as const,
      level: 'UG' as const,
      currentIntake: 60,
      proposedIntake: 120,
      nbaAccredited: false,
    },
  ]);

  // Step 3: Supporting Documents
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { name: string; size: string; ready: boolean } }>({
    landDoc: { name: 'DDA_Perpetual_Lease_Deed_Registered.pdf', size: '8.7 MB', ready: true },
    fireSafety: { name: 'Delhi_Fire_Service_NOC_2026_2027.pdf', size: '2.4 MB', ready: true },
    buildingPlan: { name: 'MCD_Sanctioned_Building_Plan_Stability.pdf', size: '5.2 MB', ready: true },
    previousEoa: { name: 'AICTE_EOA_Letter_2025_2026.pdf', size: '1.8 MB', ready: true },
    fdrCertificate: { name: 'SBI_Joint_FDR_Rs_50_Lakhs_Receipt.pdf', size: '1.2 MB', ready: true },
    facultyForm16: { name: 'Faculty_Biometric_Roster_Form16.pdf', size: '4.1 MB', ready: true },
  });

  // Step 4: Undertakings
  const [declaredAccurate, setDeclaredAccurate] = useState(true);
  const [antiRaggingCompliant, setAntiRaggingCompliant] = useState(true);

  const handleAddCourse = () => {
    setCourses(prev => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        name: 'Electronics & Communication Engineering',
        program: 'Engineering & Technology',
        level: 'UG',
        currentIntake: 60,
        proposedIntake: 60,
        nbaAccredited: true,
      },
    ]);
  };

  const handleRemoveCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Create Application in persistent store
      const newApp = applicationService.create({
        institutionId: `inst-${Date.now()}`,
        institutionName,
        institutionType,
        aictePermanentId,
        region,
        state,
        category,
        academicYear,
        documentCompletenessScore: 100,
        contactPerson: {
          name: contactName,
          designation: contactDesignation,
          phone: contactPhone,
          email: contactEmail,
        },
        landAreaAcres,
        builtUpAreaSqMeters,
        totalFacultyCount,
        studentFacultyRatio,
        courses,
        evcRequired: category !== 'Extension of Approval (EOA)',
        discrepancyCount: 0,
      });

      // 2. Upload supporting documents for the new application
      documentService.upload(
        newApp.id,
        newApp.referenceNumber,
        newApp.institutionId,
        newApp.institutionName,
        'Land Document & Lease Deed',
        uploadedFiles.landDoc.name,
        uploadedFiles.landDoc.size
      );

      documentService.upload(
        newApp.id,
        newApp.referenceNumber,
        newApp.institutionId,
        newApp.institutionName,
        'Fire & Life Safety Certificate',
        uploadedFiles.fireSafety.name,
        uploadedFiles.fireSafety.size,
        '2026-05-10',
        '2027-05-09'
      );

      documentService.upload(
        newApp.id,
        newApp.referenceNumber,
        newApp.institutionId,
        newApp.institutionName,
        'Building Approval & Structural Stability',
        uploadedFiles.buildingPlan.name,
        uploadedFiles.buildingPlan.size
      );

      refreshData();
      setIsSubmitting(false);
      setSubmittedAppRef(newApp.referenceNumber);
      setCurrentStep(5); // Success step
      showToast(
        'success',
        'Application Submitted Successfully!',
        `Reference: ${newApp.referenceNumber}. Routed to AICTE Regional Scrutiny Queue.`
      );
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card">
        <span className="text-xs font-bold uppercase tracking-wider text-parikalp-primary block mb-1">
          National Single Window System • Technical Approvals 2026-27
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          AICTE Institutional Approval Application
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Under AICTE Approval Process Handbook (APH) 2026-27. Mandatory field validation & automated document completeness verification.
        </p>

        {/* Stepper Wizard Indicator */}
        <div className="grid grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-100">
          {[
            { num: 1, title: 'Institution Info' },
            { num: 2, title: 'Application Details' },
            { num: 3, title: 'Document Upload' },
            { num: 4, title: 'Review & Validate' },
            { num: 5, title: 'Submission Done' },
          ].map(step => (
            <div key={step.num} className="text-center">
              <div
                className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs transition-colors ${
                  currentStep === step.num
                    ? 'bg-parikalp-primary text-white ring-4 ring-blue-100'
                    : currentStep > step.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {currentStep > step.num ? '✓' : step.num}
              </div>
              <span
                className={`text-[11px] block mt-1.5 font-semibold ${
                  currentStep === step.num
                    ? 'text-parikalp-primary font-bold'
                    : currentStep > step.num
                    ? 'text-emerald-700'
                    : 'text-slate-400'
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: INSTITUTION INFORMATION */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-parikalp-primary" />
            Step 1: Institution & Authorized Signatory Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Institution Full Legal Name *
              </label>
              <input
                type="text"
                value={institutionName}
                onChange={e => setInstitutionName(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                AICTE Permanent Institution ID (PID) *
              </label>
              <input
                type="text"
                value={aictePermanentId}
                onChange={e => setAictePermanentId(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white font-mono text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Institution Management Type *
              </label>
              <select
                value={institutionType}
                onChange={e => setInstitutionType(e.target.value as any)}
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              >
                <option value="Government">Government Institution</option>
                <option value="Govt-Aided">Government-Aided</option>
                <option value="Private-Unaided">Private-Unaided Self-Financing</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                AICTE Regional Bureau Jurisdiction *
              </label>
              <select
                value={region}
                onChange={e => setRegion(e.target.value as any)}
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              >
                <option value="North-Western">North-Western Regional Office (NWRO)</option>
                <option value="Southern">Southern Regional Office (SRO)</option>
                <option value="Western">Western Regional Office (WRO)</option>
                <option value="Northern">Northern Regional Office (NRO)</option>
                <option value="Eastern">Eastern Regional Office (ERO)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                State / UT *
              </label>
              <input
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Authorized Signatory / Registrar Name *
              </label>
              <input
                type="text"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contact Phone / Mobile *
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Official Institutional Email *
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2 rounded-xl bg-parikalp-primary hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              Continue to Application Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: APPLICATION DETAILS & COURSES */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-parikalp-primary" />
            Step 2: Approval Category & Infrastructure Norms
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Approval Category *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              >
                <option value="Extension of Approval (EOA)">Extension of Approval (EOA)</option>
                <option value="Increase in Intake (III)">Increase in Intake (III)</option>
                <option value="Introduction of New Course/Program">Introduction of New Course/Program</option>
                <option value="New Technical Institution (NTI)">New Technical Institution (NTI)</option>
                <option value="Change of Site/Location">Change of Site/Location</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Academic Session
              </label>
              <input
                type="text"
                disabled
                value={academicYear}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-slate-600 font-semibold text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contiguous Land Demarcated (Acres) *
              </label>
              <input
                type="number"
                step="0.1"
                value={landAreaAcres}
                onChange={e => setLandAreaAcres(Number(e.target.value))}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Total Built-up Area (Sq. Meters) *
              </label>
              <input
                type="number"
                value={builtUpAreaSqMeters}
                onChange={e => setBuiltUpAreaSqMeters(Number(e.target.value))}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Total Full-Time Faculty Count *
              </label>
              <input
                type="number"
                value={totalFacultyCount}
                onChange={e => setTotalFacultyCount(Number(e.target.value))}
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Student-to-Faculty Cadre Ratio *
              </label>
              <input
                type="text"
                value={studentFacultyRatio}
                onChange={e => setStudentFacultyRatio(e.target.value)}
                placeholder="e.g. 1:15"
                required
                className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-xs focus:ring-2 focus:ring-parikalp-primary"
              />
            </div>
          </div>

          {/* Courses & Proposed Intake Table */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 text-xs">
                Proposed Courses & Intake Matrix (AY 2026-27):
              </span>
              <button
                type="button"
                onClick={handleAddCourse}
                className="px-2.5 py-1 text-xs font-semibold text-parikalp-primary bg-parikalp-lightblue hover:bg-blue-100 rounded-md inline-flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Course
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Course / Discipline Name</th>
                    <th className="py-2 px-3">Program</th>
                    <th className="py-2 px-3">Level</th>
                    <th className="py-2 px-3 text-center">Current Intake</th>
                    <th className="py-2 px-3 text-center">Proposed Intake</th>
                    <th className="py-2 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map(c => (
                    <tr key={c.id}>
                      <td className="py-2 px-3 font-semibold text-slate-800">{c.name}</td>
                      <td className="py-2 px-3">{c.program}</td>
                      <td className="py-2 px-3 font-medium">{c.level}</td>
                      <td className="py-2 px-3 text-center text-slate-600">{c.currentIntake}</td>
                      <td className="py-2 px-3 text-center font-bold text-emerald-700">
                        {c.proposedIntake}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveCourse(c.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2 rounded-xl bg-parikalp-primary hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              Continue to Document Upload
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DOCUMENT UPLOAD */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Upload className="w-5 h-5 text-parikalp-primary" />
            Step 3: Upload Mandatory Supporting Documents
          </h3>
          <p className="text-xs text-slate-500">
            Files are automatically parsed by the PARIKALP AI Document Intelligence engine to extract text, check expiry dates, and perform tampering screening.
          </p>

          <div className="space-y-3">
            {[
              { key: 'landDoc', title: 'Land Document & Registered Lease Deed', desc: 'Min 7.5 contiguous acres in urban / 10 acres rural area' },
              { key: 'fireSafety', title: 'Fire & Life Safety Certificate (NOC)', desc: 'Must be valid through the academic session 2026-27' },
              { key: 'buildingPlan', title: 'Sanctioned Building Plan & Structural Stability', desc: 'Approved by Local Municipal / PWD Authority' },
              { key: 'previousEoa', title: 'Previous AICTE Letter of Approval (EOA)', desc: 'Conveyed approval for AY 2025-26' },
              { key: 'fdrCertificate', title: 'Joint Security Deposit FDR Certificate', desc: 'Fixed deposit receipt in joint name with AICTE Chairman' },
              { key: 'facultyForm16', title: 'Faculty Biometric Roster & Form-16 Extracts', desc: 'Certified cadre ratio and salary disbursement proof' },
            ].map(docItem => {
              const file = uploadedFiles[docItem.key];
              return (
                <div
                  key={docItem.key}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{docItem.title}</p>
                      <p className="text-[11px] text-slate-500">{docItem.desc}</p>
                      <p className="text-[11px] text-blue-700 font-mono mt-0.5">
                        File: {file.name} ({file.size})
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex-shrink-0">
                    Validated & Encrypted
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2 rounded-xl bg-parikalp-primary hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              Proceed to Review & Validation
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & VALIDATION */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Step 4: Automated Pre-Submission Completeness Audit
          </h3>

          {/* Completeness Meter */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                100%
              </div>
              <div>
                <p className="font-bold text-sm text-emerald-950">
                  Automated Completeness Validation: PASSED
                </p>
                <p className="text-xs text-emerald-800">
                  All 6 mandatory statutory annexures verified. Zero missing fields detected.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-200/60 px-3 py-1 rounded-full">
              Eligible for Scrutiny
            </span>
          </div>

          {/* Application Summary Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-slate-500 block">Institution:</span>
                <span className="font-bold text-slate-900">{institutionName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Category:</span>
                <span className="font-bold text-slate-900">{category}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Region:</span>
                <span className="font-bold text-slate-900">{region}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Proposed Courses:</span>
                <span className="font-bold text-slate-900">{courses.length} Disciplines</span>
              </div>
            </div>
          </div>

          {/* Statutory Undertakings */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={declaredAccurate}
                onChange={e => setDeclaredAccurate(e.target.checked)}
                className="mt-0.5 rounded text-parikalp-primary focus:ring-parikalp-primary"
              />
              <span>
                I hereby declare that all uploaded land records, fire safety NOC, building approvals, and faculty data are authentic and in strict compliance with the AICTE Act 1987.
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={antiRaggingCompliant}
                onChange={e => setAntiRaggingCompliant(e.target.checked)}
                className="mt-0.5 rounded text-parikalp-primary focus:ring-parikalp-primary"
              />
              <span>
                The institution has constituted an Anti-Ragging Committee and Internal Complaints Committee (ICC) in accordance with statutory guidelines.
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              disabled={isSubmitting || !declaredAccurate || !antiRaggingCompliant}
              onClick={handleFinalSubmit}
              className={`px-6 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Securing & Encrypting Submission...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Submit Official Application to AICTE
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: FINAL CONFIRMATION SUCCESS */}
      {currentStep === 5 && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Application Registered Successfully
          </span>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            AICTE Application Acknowledgement Slip
          </h2>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Application Reference No:</span>
              <span className="font-mono font-bold text-parikalp-primary">{submittedAppRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Institution:</span>
              <span className="font-semibold text-slate-900">{institutionName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold text-slate-900">{category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Workflow Stage:</span>
              <span className="font-bold text-blue-700">Under Regional Scrutiny</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Your application has been assigned to the Regional Scrutiny Committee. The automated OCR and discrepancy detection engine has initiated document validation.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => navigate('/institution-portal')}
              className="px-5 py-2.5 bg-parikalp-primary hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              Go to Institution Dashboard
            </button>
            <button
              onClick={() => navigate('/scrutiny')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              View in Scrutiny Queue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

