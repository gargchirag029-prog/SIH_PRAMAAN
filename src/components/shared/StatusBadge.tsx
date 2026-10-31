import React from 'react';
import { ApplicationStatus, WorkflowStage } from '../../types/application';
import { ValidityStatus, DocVerificationStatus } from '../../types/document';
import { AIVerificationStatus } from '../../types/verification';
import { AlertPriority } from '../../types/alerts';

interface StatusBadgeProps {
  status:
    | ApplicationStatus
    | WorkflowStage
    | ValidityStatus
    | DocVerificationStatus
    | AIVerificationStatus
    | AlertPriority
    | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true,
}) => {
  let bgColor = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';
  let label: string = status;

  switch (status) {
    // Application Statuses
    case 'APPROVED':
    case 'COMPLETED':
    case 'VERIFIED_OK':
    case 'VALID':
    case 'GREEN':
    case 'COMPLIANT':
    case 'OFFICER_APPROVED':
      bgColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      dotColor = 'bg-emerald-500';
      if (status === 'GREEN') label = 'Passed Validation';
      break;

    case 'UNDER_SCRUTINY':
    case 'SCRUTINY':
      bgColor = 'bg-blue-50 text-blue-700 border-blue-200';
      dotColor = 'bg-blue-500';
      label = 'Under Scrutiny';
      break;

    case 'SUBMITTED':
    case 'SUBMISSION':
      bgColor = 'bg-sky-50 text-sky-700 border-sky-200';
      dotColor = 'bg-sky-500';
      label = 'Submitted';
      break;

    case 'DISCREPANCY_RAISED':
    case 'DISCREPANCY_FOUND':
    case 'AI_FLAGGED':
    case 'RE_SCRUTINY_PENDING':
    case 'AMBER':
    case 'DUE_SOON':
    case 'EXPIRING_SOON':
    case 'HIGH':
      bgColor = 'bg-amber-50 text-amber-700 border-amber-200';
      dotColor = 'bg-amber-500';
      if (status === 'AMBER') label = 'Review Required';
      if (status === 'DISCREPANCY_RAISED') label = 'Discrepancy Raised';
      if (status === 'RE_SCRUTINY_PENDING') label = 'Awaiting Re-scrutiny';
      if (status === 'EXPIRING_SOON') label = 'Expiring Soon';
      break;

    case 'REJECTED':
    case 'EXPIRED':
    case 'CRITICAL':
    case 'CRITICAL_OVERDUE':
    case 'OVERDUE':
    case 'RED':
      bgColor = 'bg-rose-50 text-rose-700 border-rose-200';
      dotColor = 'bg-rose-500';
      if (status === 'RED') label = 'Discrepancy Detected';
      break;

    case 'EVC_SCHEDULED':
    case 'EVC':
      bgColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
      dotColor = 'bg-indigo-500';
      label = 'EVC Scheduled';
      break;

    case 'EVC_COMPLETED':
      bgColor = 'bg-teal-50 text-teal-700 border-teal-200';
      dotColor = 'bg-teal-500';
      label = 'EVC Completed';
      break;

    case 'COMMITTEE_REVIEW':
    case 'COMMITTEE':
      bgColor = 'bg-purple-50 text-purple-700 border-purple-200';
      dotColor = 'bg-purple-500';
      label = 'Committee Review';
      break;

    case 'SCRUTINY_PASSED':
      bgColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
      dotColor = 'bg-emerald-600';
      label = 'Scrutiny Passed';
      break;

    default:
      label = status.replace(/_/g, ' ');
      break;
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-full ${bgColor} ${sizeClasses[size]}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0 ${dotColor}`}
        />
      )}
      <span className="truncate">{label}</span>
    </span>
  );
};

