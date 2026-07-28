'use client';

import { AlertCircle, Loader2, PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import DynamicServiceCTA from '@/components/serviceDetails/DynamicServiceCTA';
import DynamicServiceFeatures from '@/components/serviceDetails/DynamicServiceFeatures';
import DynamicServiceHero from '@/components/serviceDetails/DynamicServiceHero';
import DynamicServiceOverview from '@/components/serviceDetails/DynamicServiceOverview';
import DynamicServicePricing from '@/components/serviceDetails/DynamicServicePricing';
import { useBookingStore } from '@/redux/legacy/bookingStore';
import type { AdminService } from '@/types/admin/service.types';
import type { Service } from '@/types/services.types';

export interface DynamicServiceDetailPageProps {
  service: AdminService | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  /**
   * Base path for the booking route.
   * Defaults to '/booking' (public flow with navbar/footer).
   * Pass '/dashboard/customer/booking' to keep the entire booking flow
   * (booking → summary → confirmation) inside DashboardLayout.
   */
  bookingBasePath?: string;
}

export default function DynamicServiceDetailPage({
  service,
  isLoading,
  error,
  onRetry,
  bookingBasePath = '/booking',
}: DynamicServiceDetailPageProps) {
  const router = useRouter();
  const setBooking = useBookingStore((state) => state.setBooking);

  // ── Loading ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex min-h-150 items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-600" />
          <p className="text-lg font-medium text-slate-700">Loading service details...</p>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex min-h-150 items-center justify-center bg-white px-4">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-red-100 bg-red-50 p-8 text-center max-w-md">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-900">Failed to Load Service</h2>
            <p className="mt-3 text-sm text-red-700">{error}</p>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 rounded-xl bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────────────────────
  if (!service) {
    return (
      <div className="flex min-h-150 items-center justify-center bg-white px-4">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <PackageOpen className="h-10 w-10 text-slate-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Service Not Found</h2>
            <p className="mt-3 text-sm text-slate-500">
              This service may have been removed or is currently unavailable.
            </p>
          </div>
          <Link
            href="/services"
            className="mt-2 rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Browse All Services
          </Link>
        </div>
      </div>
    );
  }

  // ── Map AdminService → Service (for existing child components) ────────
  const slug = service.name.toLowerCase().replace(/\s+/g, '-');

  const mappedService: Service = {
    id: String(service.id),
    title: service.name,
    description: service.description,
    image: service.image || '/images/service-placeholder.png',
    slug,
    badge: service.isActive ? 'Available Now' : 'Unavailable',
    price: service.price,
    gridSize: { md: 6 },
    overview: service.description,
    includes: [
      'Professional certified technicians',
      'All tools and equipment included',
      'Quality materials and parts',
      '100% satisfaction guarantee',
      'Post-service support',
      'Transparent pricing',
    ],
    ctaTitle: `Ready to book ${service.name}?`,
    ctaDescription: 'Get professional service at your doorstep. Book now and secure your slot.',
    bookingForm: [],
    formConfig: { showPriceSummary: true, pricingEngine: 'fixed' },
  };

  // ── Booking handler (runs only when user IS authenticated) ────────────
  // useBookingAuth (inside Hero/CTA) handles the guest redirect.
  // This callback fires only after authentication is confirmed.
  const handleBookingClick = () => {
    // Pre-seed the booking store so UnifiedBookingPage has service context.
    setBooking({
      service: mappedService.title,
      serviceId: service.id,
      serviceSlug: mappedService.slug,
      servicePrice: mappedService.price,
    });
    router.push(`${bookingBasePath}?service=${encodeURIComponent(mappedService.slug)}`);
  };

  return (
    <main>
      <DynamicServiceHero service={mappedService} onBookingClick={handleBookingClick} />
      <DynamicServiceOverview service={mappedService} />
      <DynamicServiceFeatures service={mappedService} />
      <DynamicServicePricing service={mappedService} />
      <DynamicServiceCTA service={mappedService} onBookingClick={handleBookingClick} />
    </main>
  );
}
