import { CommitteeReviewItem, CommitteeDecision } from '../types/committee';
import { Application, ApplicationStatus, WorkflowStage } from '../types/application';
import {
  getCommitteeReviews,
  saveCommitteeReview,
  getApplicationById,
  saveApplication,
  recordAuditLog,
  getCurrentUser,
} from './api';
import { complianceService } from './complianceService';

export const committeeService = {
  getAll(): CommitteeReviewItem[] {
    return getCommitteeReviews();
  },

  getById(id: string): CommitteeReviewItem | undefined {
    const list = getCommitteeReviews();
    return list.find(r => r.id === id || r.applicationId === id);
  },

  recordDecision(
    reviewId: string,
    decision: CommitteeDecision,
    remarks: string,
    conditionsOrGrounds: string[]
  ): CommitteeReviewItem | null {
    const reviews = getCommitteeReviews();
    const review = reviews.find(r => r.id === reviewId);
    if (!review) return null;

    const user = getCurrentUser();
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

    let orderNumber: string | undefined = undefined;
    let digitalSig: string | undefined = undefined;

    if (decision === 'APPROVED') {
      const randomCode = Math.floor(10000000 + Math.random() * 90000000);
      orderNumber = `F.No. AICTE/AB/2026/LOA-${randomCode}`;
      digitalSig = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    const updatedReview: CommitteeReviewItem = {
      ...review,
      status: decision,
      decidedBy: user.name,
      decidedAt: dateStr,
      meetingRemarks: remarks,
      finalApprovalOrderNumber: orderNumber,
      validThroughYear: '2026-2027',
      conditionsImposed: decision === 'APPROVED' ? conditionsOrGrounds : undefined,
      rejectionGrounds: decision === 'REJECTED' ? conditionsOrGrounds : undefined,
    };

    saveCommitteeReview(updatedReview);

    // Update Application Status
    const app = getApplicationById(review.applicationId);
    if (app) {
      const appStatus: ApplicationStatus =
        decision === 'APPROVED'
          ? 'APPROVED'
          : decision === 'REJECTED'
          ? 'REJECTED'
          : 'RETURNED_FOR_CLARIFICATION';

      const appStage: WorkflowStage = decision === 'APPROVED' ? 'COMPLIANCE' : 'COMMITTEE';

      const updatedApp = {
        ...app,
        status: appStatus,
        currentStage: appStage,
        approvalLetterNumber: orderNumber,
        approvalDate: decision === 'APPROVED' ? dateStr.split(' ')[0] : undefined,
        digitalSignatureHash: digitalSig,
        rejectionReason: decision === 'REJECTED' ? remarks : undefined,
        committeeRemarks: remarks,
        lastUpdated: dateStr,
      };

      saveApplication(updatedApp);

      recordAuditLog(
        'FINAL_DECISION_RECORDED',
        `Committee recorded decision: ${decision}. Order No: ${orderNumber || 'N/A'}. Remarks: ${remarks}`,
        app.referenceNumber,
        app.institutionName,
        'COMMITTEE_REVIEW',
        appStatus
      );

      // If approved, ensure Continuous Compliance Monitoring profile is initialized
      if (decision === 'APPROVED') {
        complianceService.ensureComplianceProfileForApp(app);
      }
    }

    return updatedReview;
  },
};
