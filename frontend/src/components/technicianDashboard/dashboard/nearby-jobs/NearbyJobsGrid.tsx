'use client';

import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectNearbyJobs } from '@/redux/selectors/nearbyJobsSelectors';
import { setCurrentJob } from '@/redux/slices/activeJobsSlice';
import { setJobs } from '@/redux/slices/nearbyJobsSlice';
import type { NearbyJob } from '@/types/technicianDashboard/nearbyJobs.types';

import JobCard from './JobCard';

export default function NearbyJobsGrid() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(selectNearbyJobs);

  
  const handleAccept = (job: NearbyJob) => {
    const activeJob = {
      id: `JOB-${job.id}`,
      serviceType: job.serviceType,
      title: job.title || `${job.serviceType} Service`,
      customerName: job.customerName,
      customerRating: job.rating || 4.8,
      address: job.location || 'Sector 52, Gurgaon',
      payout: typeof job.payout === 'string' ? parseFloat(job.payout.replace(/[^0-9.]/g, '')) || 850 : 850,
      duration: job.duration || '2 Hours',
      distance: job.distance || '2.4 Km',
      status: 'accepted' as const,
      eta: '12 Min',
    };
    dispatch(setCurrentJob(activeJob));
    dispatch(setJobs(jobs.filter((j) => j.id !== job.id)));
    router.push('/dashboard/technician/active-jobs');
  };

  const handleReject = (jobId: number) => {
    dispatch(setJobs(jobs.filter((j) => j.id !== jobId)));
  };

  const displayJobs = jobs.slice(0, 2);

  if (displayJobs.length === 0) {
    return (
      <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
        <p className="text-slate-500 text-sm">No nearby jobs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {displayJobs.map((job, idx) => (
        <JobCard
          key={job.id}
          serviceType={job.serviceType}
          customerName={job.customerName}
          distance={job.distance}
          payout={job.payout}
          time={job.schedule || 'Today, 2:30 PM'}
          variant={idx % 2 === 0 ? 'green' : 'blue'}
          onAccept={() => handleAccept(job)}
          onReject={() => handleReject(job.id)}
        />
      ))}
    </div>
  );
}