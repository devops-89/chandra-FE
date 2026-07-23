'use client';

import { useEffect, useState } from 'react';
import { AdminControllers } from '@/api/adminControllers';

import JobRow from './JobRow';

export default function ActiveJobsTable() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveBookings = async () => {
      try {
        setLoading(true);
        // Fetch recent active bookings (e.g. ACCEPTED or PENDING, here we fetch a few of ACCEPTED)
        const res = await AdminControllers.getAdminBookings(1, 5, 'ACCEPTED');
        
        const mappedJobs = res.bookings.map((b: any) => ({
          id: `#${b.id}`,
          customer: `${b.customer?.firstName || ''} ${b.customer?.lastName || ''}`.trim() || 'Unknown',
          technician: b.technician ? `${b.technician.firstName || ''} ${b.technician.lastName || ''}`.trim() || 'Unassigned' : 'Unassigned',
          category: b.service?.name || 'Unknown',
          status: b.status,
        }));
        setJobs(mappedJobs);
      } catch (err) {
        console.error('Failed to fetch active bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveBookings();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
              Booking ID
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
              Customer
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
              Technician
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
              Category
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-sm text-slate-500">
                Loading active bookings...
              </td>
            </tr>
          ) : jobs.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-sm text-slate-500">
                No active bookings found.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}