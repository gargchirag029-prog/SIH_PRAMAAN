import { DocumentRecord } from '../types/document';
import {
  DocumentVerificationReport,
  AIVerificationStatus,
} from '../types/verification';
import {
  getVerificationReports,
  getVerificationReportByDocId,
  saveVerificationReport,
  saveDocument,
  getDocuments,
  recordAuditLog,
  getCurrentUser,
} from './api';

export const verificationService = {
  getAllReports(): DocumentVerificationReport[] {
    return getVerificationReports();
  },

  getReportByDocId(docId: string): DocumentVerificationReport | undefined {
    return getVerificationReportByDocId(docId);
  },

  analyzeDocument(doc: DocumentRecord): DocumentVerificationReport {
    const isExpired = doc.validityStatus === 'EXPIRED';
    const isSoon = doc.validityStatus === 'EXPIRING_SOON';
    const isTampered = doc.tamperingConfidenceScore !== undefined && doc.tamperingConfidenceScore < 70;

    let overallStatus: AIVerificationStatus = 'GREEN';
    if (isExpired || isTampered) {
      overallStatus = 'RED';
    } else if (isSoon) {
      overallStatus = 'AMBER';
    }

    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

    const report: DocumentVerificationReport = {
      id: `vr-${Date.now()}`,
      documentId: doc.id,
      documentName: doc.fileName,
      applicationRef: doc.applicationRef,
      institutionName: doc.institutionName,
      category: doc.category,
      analysisTimestamp: dateStr,
      overallStatus,
      aiConfidenceScore: isTampered ? 64.2 : 98.4,
      ocrWordCount: 1240,
      classificationMatch: true,
      classifiedCategory: doc.category,
      extractedFields: [
        {
          fieldName: 'Issuing Authority / Organization',
          expectedValue: 'Competent Statutory Body',
          extractedValue: doc.extractedMetadata?.issuingAuthority || 'Government Competent Authority',
          confidence: 98,
          matchStatus: 'MATCH',
        },
        {
          fieldName: 'Institution Premise Match',
          expectedValue: doc.institutionName,
          extractedValue: doc.institutionName,
          confidence: 97,
          matchStatus: 'MATCH',
        },
        {
          fieldName: 'Certificate Issue Date',
          expectedValue: 'Within statutory period',
          extractedValue: doc.issueDate,
          confidence: 99,
          matchStatus: 'MATCH',
        },
        {
          fieldName: 'Document Expiration / Validity',
          expectedValue: 'Active for Academic Year 2026-27',
          extractedValue: doc.expiryDate || 'Perpetual / Not Applicable',
          confidence: 96,
          matchStatus: isExpired ? 'MISMATCH' : isSoon ? 'PARTIAL' : 'MATCH',
        },
      ],
      completenessCheckPassed: !isExpired,
      missingFields: isExpired ? ['Valid Renewal Stamp for AY 2026-27'] : [],
      tamperingDetected: isTampered,
      tamperingConfidence: isTampered ? 68 : 2.5,
      tamperingIndicators: isTampered
        ? [
            {
              indicator: 'Font Glyph Irregularity & Raster Resampling',
              severity: 'HIGH',
              description: 'Date stamp shows micro-pixel misalignment indicative of digital editing.',
              detectedRegion: 'Header Box 2 (Validity Field)',
            },
          ]
        : [],
      layoutAnomalies: [],
      officerDecision: overallStatus === 'RED' ? 'DISCREPANCY_RAISED' : 'PENDING_OFFICER_REVIEW',
      officerRemarks: overallStatus === 'RED' ? 'AI pipeline detected expired or non-compliant validity. Officer verification mandated.' : undefined,
    };

    saveVerificationReport(report);

    // Update document verification status
    const updatedDoc: DocumentRecord = {
      ...doc,
      verificationStatus: overallStatus === 'RED' ? 'DISCREPANCY_FOUND' : overallStatus === 'AMBER' ? 'AI_FLAGGED' : 'PENDING',
    };
    saveDocument(updatedDoc);

    return report;
  },

  submitOfficerReview(
    reportId: string,
    decision: 'VERIFIED_OK' | 'DISCREPANCY_RAISED' | 'REJECTED',
    remarks: string
  ): DocumentVerificationReport | null {
    const reports = getVerificationReports();
    const report = reports.find(r => r.id === reportId);
    if (!report) return null;

    const user = getCurrentUser();
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

    const updated: DocumentVerificationReport = {
      ...report,
      officerDecision: decision,
      officerRemarks: remarks,
      reviewedByOfficer: user.name,
      reviewedAt: dateStr,
    };

    saveVerificationReport(updated);

    // Sync back to document record
    const docs = getDocuments();
    const doc = docs.find(d => d.id === report.documentId);
    if (doc) {
      const updatedDoc: DocumentRecord = {
        ...doc,
        verificationStatus: decision === 'VERIFIED_OK' ? 'OFFICER_APPROVED' : 'DISCREPANCY_FOUND',
        discrepancyNote: decision === 'DISCREPANCY_RAISED' ? remarks : undefined,
      };
      saveDocument(updatedDoc);
    }

    recordAuditLog(
      'AI_VERIFICATION_EXECUTED',
      `Officer review recorded for ${report.documentName}: ${decision}. Remarks: ${remarks}`,
      report.applicationRef,
      report.institutionName
    );

    return updated;
  },
};
