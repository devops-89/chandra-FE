'use client';

import { AlertCircle, Loader2, PackageOpen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import DynamicBookingForm from '@/components/booking/DynamicBookingForm';
import DynamicServiceCTA from '@/components/serviceDetails/DynamicServiceCTA';
import DynamicServiceFeatures from '@/components/serviceDetails/DynamicServiceFeatures';
import DynamicServiceHero from '@/components/serviceDetails/DynamicServiceHero';
import DynamicServiceOverview from '@/components/serviceDetails/DynamicServiceOverview';
import DynamicServicePricing from '@/components/serviceDetails/DynamicServicePricing';
import { useBookingStore } from '@/redux/legacy/bookingStore';
import type { AdminService } from '@/types/admin/service.types';
import type { BookingFormData, Service } from '@/types/services.types';

interface DynamicServiceDetailPageProps {
  service: AdminService | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function DynamicServiceDetailPage({
  service,
  isLoading,
  error,
  onRetry,
}: DynamicServiceDetailPageProps) {
  const router = useRouter();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const setBooking = useBookingStore(state => state.setBooking);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-gradient-to-b from-[#FFF8ED] to-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-600" />
          <p className="text-lg font-medium text-slate-700">Loading service details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-gradient-to-b from-[#FFF8ED] to-white px-4">
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

  // Empty state (service not found or inactive)
  if (!service) {
    return (
      <div className="flex min-h-[600px] items-center justify-center bg-gradient-to-b from-[#FFF8ED] to-white px-4">
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

  // Map AdminService to Service format for existing UI components
  const mappedService: Service = {
    id: String(service.id),
    title: service.name,
    description: service.description,
    image: service.image || '/images/service-placeholder.png',
    slug: service.name.toLowerCase().replace(/\s+/g, '-'),
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
    ctaDescription: `Get professional service at your doorstep. Book now to secure your slot.`,
    bookingForm: [],
    formConfig: {
      showPriceSummary: true,
      pricingEngine: 'fixed',
    },
  };

  const handleBookingClick = () => {
    // Redirect to booking with service ID
    router.push(`/booking?serviceId=${service.id}`);
  };

  const handleBookingSubmit = async (formData: BookingFormData) => {
    setIsBookingLoading(true);

    try {
      // Store the service-specific form data
      const bookingData = {
        service: mappedService.title,
        serviceSlug: mappedService.slug,
        servicePrice: mappedService.price,
        serviceSpecificData: formData,
        // These will be filled in the unified booking flow
        name: '',
        phone: '',
        address: '',
        date: '',
        slot: '',
        instructions: '',
      };

      setBooking(bookingData);

      // Redirect to the unified booking page with service ID
      router.push(`/booking?serviceId=${service.id}`);
    } catch (err) {
      console.error('Error processing booking:', err);
    } finally {
      setIsBookingLoading(false);
    }
  };

  if (showBookingForm) {
    return (
      <div className="min-h-screen bg-[#F7F2E8] py-16">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-8 text-center">
              <button
                type="button"
                onClick={() => setShowBookingForm(false)}
                className="mb-4 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Service Details
              </button>

              <h1 className="text-3xl font-bold text-slate-900">
                Book {mappedService.title}
              </h1>
              <p className="mt-2 text-slate-600">
                Fill out the service-specific information below
              </p>
            </div>

            <DynamicBookingForm
              fields={mappedService.bookingForm}
              service={mappedService}
              onSubmit={handleBookingSubmit}
              isLoading={isBookingLoading}
            />
          </div>
        </div>
      </div>
    );
  }

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