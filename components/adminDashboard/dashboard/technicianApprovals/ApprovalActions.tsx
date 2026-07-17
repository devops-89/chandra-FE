'use client';

import ActionButton from '../shared/ActionButton';

interface ApprovalActionsProps {
  onApprove?: () => void;
  onReject?: () => void;
  onView?: () => void;
}

export default function ApprovalActions({
  onApprove,
  onReject,
  onView,
}: ApprovalActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-5">
      <ActionButton
        label="Approve"
        variant="approve"
        onClick={onApprove}
      />

      <ActionButton
        label="Reject"
        variant="reject"
        onClick={onReject}
      />

      <div className="ml-auto">
        <ActionButton
          label="View Details"
          variant="view"
          onClick={onView}
        />
      </div>
    </div>
  );
}