import { DocumentRecord, DocumentCategory } from '../types/document';
import {
  getDocuments,
  getDocumentsByAppId,
  saveDocument,
  recordAuditLog,
} from './api';
import { verificationService } from './verificationService';

export const documentService = {
  getAll(): DocumentRecord[] {
    return getDocuments();
  },

  getByAppId(appId: string): DocumentRecord[] {
    return getDocumentsByAppId(appId);
  },

  upload(
    applicationId: string,
    applicationRef: string,
    institutionId: string,
    institutionName: string,
    category: DocumentCategory,
    fileName: string,
    fileSize: string = '3.5 MB',
    issueDate: string = new Date().toISOString().split('T')[0],
    expiryDate?: string
  ): DocumentRecord {
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;
    const hash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    // Compute validity
    let daysRemaining: number | undefined = undefined;
    let validityStatus: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED' = 'VALID';
    if (expiryDate) {
      const exp = new Date(expiryDate).getTime();
      const diff = Math.ceil((exp - now.getTime()) / (1000 * 60 * 60 * 24));
      daysRemaining = diff;
      if (diff < 0) validityStatus = 'EXPIRED';
      else if (diff <= 90) validityStatus = 'EXPIRING_SOON';
    }

    const newDoc: DocumentRecord = {
      id: `doc-${Date.now()}`,
      applicationId,
      applicationRef,
      institutionId,
      institutionName,
      category,
      fileName,
      fileSize,
      fileType: 'application/pdf',
      uploadedAt: dateStr,
      issueDate,
      expiryDate,
      daysRemaining,
      validityStatus,
      verificationStatus: 'PENDING',
      version: 1,
      checksum: hash,
      isPrivate: true,
      tamperingConfidenceScore: 98,
    };

    saveDocument(newDoc);
    recordAuditLog(
      'DOCUMENT_UPLOAD',
      `Uploaded document ${fileName} under category ${category}`,
      applicationRef,
      institutionName
    );

    // Automatically trigger AI verification pipeline
    verificationService.analyzeDocument(newDoc);

    return newDoc;
  },

  replaceDocument(
    existingDocId: string,
    newFileName: string,
    newIssueDate: string,
    newExpiryDate: string
  ): DocumentRecord | null {
    const docs = getDocuments();
    const doc = docs.find(d => d.id === existingDocId);
    if (!doc) return null;

    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;
    const exp = new Date(newExpiryDate).getTime();
    const diff = Math.ceil((exp - now.getTime()) / (1000 * 60 * 60 * 24));

    const updated: DocumentRecord = {
      ...doc,
      fileName: newFileName,
      version: doc.version + 1,
      uploadedAt: dateStr,
      issueDate: newIssueDate,
      expiryDate: newExpiryDate,
      daysRemaining: diff,
      validityStatus: diff < 0 ? 'EXPIRED' : diff <= 90 ? 'EXPIRING_SOON' : 'VALID',
      verificationStatus: 'PENDING',
      tamperingConfidenceScore: 99,
      discrepancyNote: undefined,
    };

    saveDocument(updated);
    recordAuditLog(
      'DOCUMENT_REPLACEMENT',
      `Replaced document with Version ${updated.version}: ${newFileName}`,
      doc.applicationRef,
      doc.institutionName
    );

    // Re-run AI analysis on replaced document
    verificationService.analyzeDocument(updated);

    return updated;
  },
};

