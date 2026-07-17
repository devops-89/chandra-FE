'use client';

import UnifiedBookingPage from '@/components/booking/UnifiedBookingPage';
import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const service   = searchParams.get('service') ?? '';

  return (
    <UnifiedBookingPage
      serviceId={serviceId ? Number(serviceId) : undefined}
      service={service}
      summaryPath="/dashboard/customer/booking/summary"
    />
  );
}

/**
 * Dashboard booking page — renders the booking form inside DashboardLayout.
 * No PublicNavbar or PublicFooter.
 * Reached from /dashboard/customer/services/[slug] via "Book Now".
 */
export default function DashboardBookingPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="flex h-32 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" /></div>}>
        <BookingContent />
      </Suspense>
    </DashboardLayout>
  );
}
