'use client';

import { useMemo, useState } from 'react';

import { INITIAL_FILTERS, PRIORITY_COLORS, SERVICE_BADGE_COLORS } from '../constants/filters';
import { MOCK_JOBS } from '../constants/jobs';
import type { JobFilter, ServiceOutlook } from '../types/nearby-job.types';

export function useNearbyJobs() {
  const [filters, setFilters] = useState<JobFilter[]>(INITIAL_FILTERS);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter jobs based on active filters and search term
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      // Search filter
      if (searchTerm && !job.serviceType.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Active filters
      const activeFilters = filters.filter((f) => f.active);

      if (activeFilters.length === 0) return true;

      return activeFilters.some((filter) => {
        switch (filter.type) {
          case 'distance':
            return job.distance < 5;
          case 'payout':
            return job.payout >= 50;
          case 'schedule':
            return job.scheduledTime.includes('Today');
          case 'all':
            return true;
          default:
            return true;
        }
      });
    });
  }, [filters, searchTerm]);

  // Calculate service outlook
  const serviceOutlook = useMemo<ServiceOutlook>(() => {
    const availableJobs = MOCK_JOBS.length;
    const totalPayout = MOCK_JOBS.reduce((sum, job) => sum + job.payout, 0);
    const averagePayout = Math.round(totalPayout / availableJobs);

    return {
      availableJobs,
      averagePayout,
      potentialEarnings: totalPayout,
    };
  }, []);

  // Toggle filter
  const toggleFilter = (filterId: string) => {
    setFilters((prev) =>
      prev.map((filter) => ({
        ...filter,
        active: filter.id === filterId ? !filter.active : filter.active,
      })),
    );
  };

  // Reset filters
  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSearchTerm('');
  };

  return {
    jobs: filteredJobs,
    filters,
    toggleFilter,
    resetFilters,
    searchTerm,
    setSearchTerm,
    serviceOutlook,
    priorityColors: PRIORITY_COLORS,
    serviceBadgeColors: SERVICE_BADGE_COLORS,
  };
}
