'use client';

import type { ActiveJob } from '@/types/admin.types';

import JobRow from './JobRow';


const jobs: ActiveJob[] = [
  {
    id: '#HC-9821',
    customer: 'Rohan Mehta',
    technician: 'Vikram S.',
    category: 'Solar',
    status: 'In Progress',
  },

  {
    id: '#HC-9820',
    customer: 'Sanya Kapoor',
    technician: 'Aman R.',
    category: 'Electrical',
    status: 'Dispatched',
  },

  {
    id: '#HC-9819',
    customer: 'Daniel Choi',
    technician: 'Preet K.',
    category: 'Plumbing',
    status: 'Delayed',
  },

  {
    id: '#HC-9818',
    customer: 'John Smith',
    technician: 'Raj K.',
    category: 'AC Repair',
    status: 'Completed',
  },
];

export default function ActiveJobsTable() {
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
          {jobs.map((job) => (
            <JobRow
              key={job.id}
              job={job}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}