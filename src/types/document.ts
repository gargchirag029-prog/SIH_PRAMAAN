export type DocumentCategory =
  | 'Land Document & Lease Deed'
  | 'Previous AICTE EOA Letter'
  | 'Fire & Life Safety Certificate'
  | 'Building Approval & Structural Stability'
  | 'Occupancy / Completion Certificate'
  | 'Faculty Cadre Ratio & Form 16'
  | 'Endowment Fund / FDR Certificate'
  | 'Trust / Society Registration'
  | 'Affidavit / Institutional Undertaking'
  | 'Financial Audit & Balance Sheet';

export type ValidityStatus = 'VALID' | 'EXPIRING_SOON' | 'EXPIRED';
export type DocVerificationStatus = 'PENDING' | 'AI_FLAGGED' | 'OFFICER_APPROVED' | 'DISCREPANCY_FOUND';

export interface DocumentRecord {
  id: string;
  applicationId: string;
  applicationRef: string;
  institutionId: string;
  institutionName: string;
  category: DocumentCategory;
  fileName: string;
  fileSize: string; // e.g. "4.2 MB"
  fileType: string; // e.g. "application/pdf"
  uploadedAt: string;
  issueDate: string;
  expiryDate?: string;
  daysRemaining?: number;
  validityStatus: ValidityStatus;
  verificationStatus: DocVerificationStatus;
  version: number;
  checksum: string; // SHA-256 simulation
  isPrivate: boolean;
  tamperingConfidenceScore?: number; // 0-100% confidence of authenticity
  extractedMetadata?: {
    issuingAuthority?: string;
    surveyNumber?: string;
    landAreaDeclared?: string;
    validThrough?: string;
    certificateNumber?: string;
    signatoryName?: string;
    ocrMatchScore?: number;
  };
  discrepancyNote?: string;
  url?: string;
}

