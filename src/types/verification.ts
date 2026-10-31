export type AIVerificationStatus = 'GREEN' | 'AMBER' | 'RED';

export interface FieldExtractionResult {
  fieldName: string;
  expectedValue?: string;
  extractedValue: string;
  confidence: number; // 0 to 100
  matchStatus: 'MATCH' | 'MISMATCH' | 'PARTIAL' | 'NOT_FOUND';
}

export interface TamperingIndicator {
  indicator: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  detectedRegion?: string;
}

export interface DocumentVerificationReport {
  id: string;
  documentId: string;
  documentName: string;
  applicationRef: string;
  institutionName: string;
  category: string;
  analysisTimestamp: string;
  overallStatus: AIVerificationStatus; // GREEN, AMBER, RED
  aiConfidenceScore: number; // 0 - 100
  ocrWordCount: number;
  classificationMatch: boolean;
  classifiedCategory: string;
  extractedFields: FieldExtractionResult[];
  completenessCheckPassed: boolean;
  missingFields: string[];
  tamperingDetected: boolean;
  tamperingConfidence: number; // 0 - 100
  tamperingIndicators: TamperingIndicator[];
  layoutAnomalies: string[];
  officerDecision: 'PENDING_OFFICER_REVIEW' | 'VERIFIED_OK' | 'DISCREPANCY_RAISED' | 'REJECTED';
  officerRemarks?: string;
  reviewedByOfficer?: string;
  reviewedAt?: string;
}

