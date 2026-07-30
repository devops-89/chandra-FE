'use client';

import { BookingConfirmationContent } from '@/components/booking/BookingConfirmation';
import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';

/**
 * Dashboard booking confirmation — no navbar/footer.
 * Reached from /customer/booking/summary → "Confirm Booking".
 */
export default function DashboardBookingConfirmationPage() {
  return (
    <DashboardLayout>
      <BookingConfirmationContent layout="dashboard" />
    </DashboardLayout>
  );
}
