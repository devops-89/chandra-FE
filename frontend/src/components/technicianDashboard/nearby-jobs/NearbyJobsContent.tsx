'use client';

import FilterPills from './filters/FilterPills';
import SearchFilterBar from './header/SearchFilterBar';
import JobList from './list/JobList';
import SummaryPanel from './sidebar/SummaryPanel';

export default function NearbyJobsContent() {
  return (
    <div className="space-y-6">
      <SearchFilterBar />

      <FilterPills />

      <div className="grid grid-cols-12 gap-6">
        {/* Jobs */}
        <div className="col-span-12 xl:col-span-8">
          <JobList />
        </div>

        {/* Sidebar */}
        <div className="col-span-12 xl:col-span-4">
          <SummaryPanel />
        </div>
      </div>
    </div>
  );
}