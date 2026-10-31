export type CommitteeType = 'SAC' | 'SHC' | 'EXECUTIVE_COMMITTEE' | 'REGIONAL_COMMITTEE';

export type CommitteeDecision =
  | 'PENDING_DECISION'
  | 'APPROVED'
  | 'REJECTED'
  | 'RETURNED_FOR_CLARIFICATION'
  | 'ADDITIONAL_REVIEW_REQUIRED';

export interface CommitteeReviewItem {
  id: string;
  applicationId: string;
  applicationRef: string;
  institutionName: string;
  category: string;
  committeeType: CommitteeType;
  assignedMeetingDate: string;
  meetingReference: string; // e.g. SAC-2026-M4-ITEM-12
  status: CommitteeDecision;
  
  // Synthesized evaluation inputs
  scrutinyScore: number;
  evcScore?: number;
  evcRecommendation?: string;
  complianceHealthScore: number;
  
  committeeMembers: string[];
  meetingRemarks?: string;
  decidedBy?: string;
  decidedAt?: string;
  finalApprovalOrderNumber?: string;
  validThroughYear?: string;
  conditionsImposed?: string[];
  rejectionGrounds?: string[];
}

