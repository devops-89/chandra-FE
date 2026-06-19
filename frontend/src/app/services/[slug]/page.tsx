'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import DynamicServiceDetailPage from '@/components/serviceDetails/DynamicServiceDetailPage';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearSelectedService, fetchServiceById, fetchServices } from '@/redux/slices/servicesSlice';

export default function ServiceDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  
  const { items: services, selectedService, isLoading, error } = useAppSelector((state) => state.services);

  useEffect(() => {
    // First, ensure we have the services list to look up the ID
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [services.length, dispatch]);

  useEffect(() => {
    const slug = params.slug as string;
    
    if (slug && services.length > 0) {
      // Find the service ID by matching the slug
      const normalizedSlug = slug.toLowerCase();
      const service = services.find((s) => {
        const serviceSlug = s.name.toLowerCase().replace(/\s+/g, '-');
        return serviceSlug === normalizedSlug;
      });

      if (service) {
        dispatch(fetchServiceById(service.id));
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
      const service = services.find((s) => {
        const serviceSlug = s.name.toLowerCase().replace(/\s+/g, '-');
        return serviceSlug === normalizedSlug;
      });
      if (service) {
        dispatch(fetchServiceById(service.id));
      }
    } else {
      // If services list is empty, fetch it first
      dispatch(fetchServices());
    }
  };

  return (
    <>
      <PublicNavbar />
      <DynamicServiceDetailPage
        service={selectedService}
        isLoading={isLoading}
        error={error}
        onRetry={handleRetry}
      />
      <PublicFooter />
    </>
  );
}
