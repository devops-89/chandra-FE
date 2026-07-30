'use client';

import { BookingSummaryContent } from '@/components/booking/BookingSummary';
import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';

/**
 * Dashboard booking summary — no navbar/footer.
 * Reached from /customer/booking → "Confirm Booking".
 */
export default function DashboardBookingSummaryPage() {
  return (
    <DashboardLayout>
      <BookingSummaryContent confirmationPath="/customer/booking/confirmation" />
    </DashboardLayout>
  );
}
