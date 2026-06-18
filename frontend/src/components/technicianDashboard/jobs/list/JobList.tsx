'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectNearbyJobs, selectNearbyJobsFilters } from '@/redux/selectors/nearbyJobsSelectors';
import { setCurrentJob } from '@/redux/slices/activeJobsSlice';
import { setJobs } from '@/redux/slices/nearbyJobsSlice';
import type { NearbyJob } from '@/types/technicianDashboard/nearbyJobs.types';

import JobCard from './JobCard';

export default function JobList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const jobs = useAppSelector(selectNearbyJobs);
  const filters = useAppSelector(selectNearbyJobsFilters);
  const [selectedDetailsJob, setSelectedDetailsJob] = useState<NearbyJob | null>(null);

  const handleAccept = (job: NearbyJob) => {
    const activeJob = {
      id: `JOB-${job.id}`,
      serviceType: job.serviceType,
      title: job.title || `${job.serviceType} Service`,
      customerName: job.customerName,
      customerRating: job.rating || 4.8,
      address: job.location || 'Sector 52, Gurgaon',
      payout: typeof job.payout === 'string' ? parseFloat(job.payout.replace(/[^0-9.]/g, '')) || 2500 : 2500,
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

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    // serviceType filter (search query)
    if (
      filters.serviceType &&
      !job.serviceType.toLowerCase().includes(filters.serviceType.toLowerCase()) &&
      !job.title.toLowerCase().includes(filters.serviceType.toLowerCase())
    ) {
      return false;
    }
    // distance filter
    if (filters.distance) {
      const distanceLimit = parseFloat(filters.distance);
      const km = parseFloat(job.distance.replace(/[^0-9.]/g, ''));
      if (!isNaN(km) && km > distanceLimit) {
        return false;
      }
    }
    // payout filter
    if (filters.payout) {
      const payoutLimit = parseFloat(filters.payout);
      const val = parseFloat(job.payout.replace(/[^0-9.]/g, ''));
      if (!isNaN(val) && val < payoutLimit) {
        return false;
      }
    }
    // schedule filter
    if (filters.schedule) {
      if (filters.schedule.toLowerCase() === 'today' && !job.schedule.toLowerCase().includes('today')) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <span className="material-symbols-outlined text-slate-300 text-5xl mb-3">search_off</span>
          <p className="text-slate-500 font-medium">No nearby jobs match your active filters.</p>
        </div>
      ) : (
        filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onAccept={() => handleAccept(job)}
            onReject={() => handleReject(job.id)}
            onViewDetails={() => setSelectedDetailsJob(job)}
          />
        ))
      )}

      {/* View Details Modal */}
      {selectedDetailsJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-150 relative">
            <button
              onClick={() => setSelectedDetailsJob(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                {selectedDetailsJob.serviceType}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                selectedDetailsJob.urgency === 'Urgent' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {selectedDetailsJob.urgency}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{selectedDetailsJob.title}</h3>
            
            <div className="space-y-4 text-sm text-slate-600 mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500">person</span>
                <div>
                  <span className="font-semibold text-slate-900">{selectedDetailsJob.customerName}</span>
                  <span className="ml-2 text-yellow-500 font-medium">★ {selectedDetailsJob.rating} ({selectedDetailsJob.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500">location_on</span>
                <span>{selectedDetailsJob.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500">schedule</span>
                <span>Scheduled for: {selectedDetailsJob.schedule} ({selectedDetailsJob.duration})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-500">payments</span>
                <span className="font-bold text-emerald-600 text-base">{selectedDetailsJob.payout}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-slate-900 mb-2">Job Description</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Provide high-quality cleaning and complete support. Make sure to inspect the equipment beforehand, perform deep cleansing processes, and verify functionality post-job completion. Ensure client satisfaction.
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  handleAccept(selectedDetailsJob);
                  setSelectedDetailsJob(null);
                }}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors cursor-pointer text-sm"
              >
                Accept Job
              </button>
              <button
                onClick={() => {
                  handleReject(selectedDetailsJob.id);
                  setSelectedDetailsJob(null);
                }}
                className="py-3 px-5 border border-slate-200 rounded-xl text-red-500 font-semibold hover:bg-red-50 transition-colors cursor-pointer text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}