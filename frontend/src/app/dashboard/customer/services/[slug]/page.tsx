'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import DynamicServiceDetailPage from '@/components/serviceDetails/DynamicServiceDetailPage';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearSelectedService, fetchServiceById, fetchServices } from '@/redux/slices/servicesSlice';

/**
 * Customer Dashboard → Services → [slug]
 *
 * Reuses DynamicServiceDetailPage (same component as the public route).
 * Wrapped in DashboardLayout — no navbar/footer duplication.
 */
export default function DashboardServiceDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { items: services, selectedService, isLoading, error } =
    useAppSelector((state) => state.services);

  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [services.length, dispatch]);

  useEffect(() => {
    const slug = params.slug as string;

    if (slug && services.length > 0) {
      const normalizedSlug = slug.toLowerCase();
      const match = services.find(
        (s) => s.name.toLowerCase().replace(/\s+/g, '-') === normalizedSlug,
      );
      if (match) {
        dispatch(fetchServiceById(match.id));
      }
    }

    return () => {
      dispatch(clearSelectedService());
    };
  }, [params.slug, services, dispatch]);

  const handleRetry = () => {
    const slug = params.slug as string;
    if (slug && services.length > 0) {
      const normalizedSlug = slug.toLowerCase();
      const match = services.find(
        (s) => s.name.toLowerCase().replace(/\s+/g, '-') === normalizedSlug,
      );
      if (match) {
        dispatch(fetchServiceById(match.id));
        return;
      }
    }
    dispatch(fetchServices());
  };

  return (
    <DashboardLayout>
      <DynamicServiceDetailPage
        service={selectedService}
        isLoading={isLoading}
        error={error}
        onRetry={handleRetry}
        bookingBasePath="/dashboard/customer/booking"
      />
    </DashboardLayout>
  );
}
