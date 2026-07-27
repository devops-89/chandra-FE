'use client';

import Grid from '@mui/material/Grid';
import { AlertCircle, Loader2, PackageOpen } from 'lucide-react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchServices } from '@/redux/slices/servicesSlice';

import { ServiceCard } from './ServiceCard';

interface ServiceGridProps {
  /**
   * Base URL prefix for service detail links.
   * Defaults to '/services' (public route).
   * Pass '/dashboard/customer/services' to link into the dashboard.
   */
  linkPrefix?: string;
  /**
   * Optional click interceptor forwarded to every ServiceCard.
   * When provided, cards render as buttons and navigation is delegated
   * to the caller (e.g. to gate access before navigating).
   */
  onCardClick?: () => void;
}

export function ServiceGrid({ linkPrefix = '/services', onCardClick }: ServiceGridProps) {
  const dispatch = useAppDispatch();
  const { items: services, isLoading, error } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
          <p className="text-lg font-medium text-slate-700">Loading services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-900">Failed to Load Services</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(fetchServices())}
            className="mt-2 rounded-xl bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Filter only active services
  const activeServices = services.filter((service) => service.isActive);

  // Empty state
  if (activeServices.length === 0) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <PackageOpen className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">No Services Available</h3>
            <p className="mt-2 text-sm text-slate-500">
              Check back soon for available services.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Map backend AdminService to customer-facing Service format
  const mappedServices = activeServices.map((service) => ({
    id: String(service.id),
    title: service.name,
    description: service.description,
    image: service.image || '/images/service-placeholder.png',
    slug: service.name.toLowerCase().replace(/\s+/g, '-'),
    badge: 'Popular', // Default badge
    price: service.price,
    gridSize: { md: 6 }, // Default grid size
    overview: service.description,
    includes: [],
    ctaTitle: `Book ${service.name}`,
    ctaDescription: `Professional ${service.name.toLowerCase()} service`,
    bookingForm: [],
    formConfig: {
      showPriceSummary: true,
      pricingEngine: 'fixed',
    },
  }));

  return (
    <Grid container spacing={3}>
      {mappedServices.map((service) => (
        <Grid
          key={service.id}
          size={{
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
        }}
        >
          <ServiceCard service={service} linkPrefix={linkPrefix} onCardClick={onCardClick} />
        </Grid>
      ))}
    </Grid>
  );
}