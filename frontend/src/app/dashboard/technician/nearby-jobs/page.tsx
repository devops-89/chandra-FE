'use client';

import { TechnicianDashboardLayout } from '@/components/dashboard/technician';

import NearbyJobsContent from './components/NearbyJobsContent';
import { useNearbyJobs } from './hooks/useNearbyJobs';

export default function NearbyJobsPage() {
  const { jobs, filters, toggleFilter, searchTerm, setSearchTerm, serviceOutlook } =
    useNearbyJobs();

  return (
    <TechnicianDashboardLayout
      headerProps={{
        userName: 'Vikram',
        isOnline: true,
        unreadNotifications: 0,
      }}
    >
      <NearbyJobsContent
        jobs={jobs}
        filters={filters}
        serviceOutlook={serviceOutlook}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterToggle={toggleFilter}
      />
    </TechnicianDashboardLayout>
  );
}
