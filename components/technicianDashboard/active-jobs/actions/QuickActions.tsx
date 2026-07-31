'use client';

import { useJobContext } from '../JobContext';
import CallCustomerButton from './CallCustomerButton';
import VerifyOTPButton from './VerifyOTPButton';
import RaiseTicketButton from './RaiseTicketButton';
export default function QuickActions({ onStatusUpdate }: { onStatusUpdate?: (status: string) => void }) {
  const currentJob = useJobContext();
  const isArrived = currentJob?.status?.toLowerCase() === 'arrived';

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
      </div>
    </div>
  );
}