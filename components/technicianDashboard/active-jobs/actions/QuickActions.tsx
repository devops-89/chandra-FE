'use client';

import { useJobContext } from '../JobContext';
import AddReviewButton from './AddReviewButton';
import CallCustomerButton from './CallCustomerButton';
import RaiseTicketButton from './RaiseTicketButton';
import VerifyOTPButton from './VerifyOTPButton';

export default function QuickActions({ onStatusUpdate }: { onStatusUpdate?: (status: string) => void }) {
  const currentJob = useJobContext();
  const isArrived = currentJob?.status?.toLowerCase() === 'arrived';
  const isCompleted = currentJob?.status?.toLowerCase() === 'completed';

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-5">
        Quick Actions
      </h3>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <CallCustomerButton />
        {isArrived && (
          <VerifyOTPButton onStatusUpdate={onStatusUpdate} />
        )}
        <RaiseTicketButton />
        {isCompleted && (
          <AddReviewButton />
        )}
      </div>
    </div>
  );
}