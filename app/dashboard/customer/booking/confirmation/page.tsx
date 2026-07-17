'use client';

import { BookingConfirmationContent } from '@/components/booking/BookingConfirmation';
import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';

/**
 * Dashboard booking confirmation — no navbar/footer.
 * Reached from /dashboard/customer/booking/summary → "Confirm Booking".
 */
export default function DashboardBookingConfirmationPage() {
  return (
    <DashboardLayout>
      <BookingConfirmationContent />
    </DashboardLayout>
  );
}
