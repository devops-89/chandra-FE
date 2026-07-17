'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAdminComplaints } from '@/redux/slices/adminComplaintSlice';

import ComplaintCard from './ComplaintCard';

const ComplaintsTable = () => {
  const dispatch = useAppDispatch();

  const {
    complaints,
    isLoading,
    error,
  } = useAppSelector((state) => state.adminComplaint);

  useEffect(() => {
    dispatch(fetchAdminComplaints());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        Loading complaints...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        No complaints found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {complaints.map((complaint) => (
          <ComplaintCard
            key={complaint.id}
            complaint={complaint}
          />
        ))}
      </div>
    </div>
  );
};

export default ComplaintsTable;