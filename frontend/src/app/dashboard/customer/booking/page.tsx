'use client';

import { useSearchParams } from 'next/navigation';

import UnifiedBookingPage from '@/components/booking/UnifiedBookingPage';
import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';

/**
 * Dashboard booking page — renders the booking form inside DashboardLayout.
 * No PublicNavbar or PublicFooter.
 * Reached from /dashboard/customer/services/[slug] via "Book Now".
 */
export default function DashboardBookingPage() {
  const searchParams = useSearchParams();

  const serviceId = searchParams.get('serviceId');
  const service   = searchParams.get('service') ?? '';

  return (
    <DashboardLayout>
      <UnifiedBookingPage
        serviceId={serviceId ? Number(serviceId) : undefined}
        service={service}
        summaryPath="/dashboard/customer/booking/summary"
      />
    </DashboardLayout>
  );
}
