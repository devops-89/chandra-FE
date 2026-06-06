'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import DynamicBookingForm from '@/components/booking/DynamicBookingForm';
import DynamicServiceCTA from '@/components/serviceDetails/DynamicServiceCTA';
import DynamicServiceFeatures from '@/components/serviceDetails/DynamicServiceFeatures';
import DynamicServiceHero from '@/components/serviceDetails/DynamicServiceHero';
import DynamicServiceOverview from '@/components/serviceDetails/DynamicServiceOverview';
import DynamicServicePricing from '@/components/serviceDetails/DynamicServicePricing';
import { useBookingStore } from '@/store/bookingStore';
import type { BookingFormData,Service } from '@/types/services.types';

interface DynamicServiceDetailPageProps {
  service: Service;
}

export default function DynamicServiceDetailPage({
  service,
}: DynamicServiceDetailPageProps) {
  const router = useRouter();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setBooking = useBookingStore(state => state.setBooking);

  const handleBookingClick = () => {
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (formData: BookingFormData) => {
    setIsLoading(true);
    
    try {
      // Store the service-specific form data
      const bookingData = {
        service: service.title,
        serviceSlug: service.slug,
        servicePrice: service.price,
        serviceSpecificData: formData,
        // These will be filled in the unified booking flow
        name: '',
        phone: '',
        address: '',
        date: '',
        slot: '',
        instructions: '',
      };

      setBooking(bookingData as any);
      
      // Redirect to the unified booking page with service slug
      router.push(`/booking?service=${encodeURIComponent(service.slug)}`);
    } catch (error) {
      console.error('Error processing booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showBookingForm) {
    return (
      <div className="min-h-screen bg-[#F7F2E8] py-16">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-8 text-center">
              <button
                onClick={() => setShowBookingForm(false)}
                className="mb-4 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Service Details
              </button>
              
              <h1 className="text-3xl font-bold text-slate-900">
                Book {service.title}
              </h1>
              <p className="mt-2 text-slate-600">
                Fill out the service-specific information below
              </p>
            </div>

            <DynamicBookingForm
              fields={service.bookingForm}
              service={service}
              onSubmit={handleBookingSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <DynamicServiceHero service={service} onBookingClick={handleBookingClick} />
      <DynamicServiceOverview service={service} />
      <DynamicServiceFeatures service={service} />
      <DynamicServicePricing service={service} />
      <DynamicServiceCTA service={service} onBookingClick={handleBookingClick} />
    </main>
  );
}