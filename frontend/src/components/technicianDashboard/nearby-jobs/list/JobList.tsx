'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectNearbyJobs } from '@/redux/selectors/nearbyJobsSelectors';

import JobCard from './JobCard';



export default function JobList() {
    const jobs = useAppSelector(
        selectNearbyJobs
    );
  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
}