'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  clearAdminComplaint,
  fetchAdminComplaint,
} from '@/redux/slices/adminComplaintSlice';

export default function ComplaintDetailsPage() {
  const dispatch = useAppDispatch();

  const params = useParams();

  const complaintId = Number(params.id);

  const {
    complaint,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.adminComplaint
  );

  useEffect(() => {
    if (!Number.isNaN(complaintId)) {
      dispatch(fetchAdminComplaint(complaintId));
    }

    return () => {
      dispatch(clearAdminComplaint());
    };
  }, [dispatch, complaintId]);

  if (isLoading) {
    return (
      <div className="p-8">
        Loading complaint...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-600">
        {error}
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="p-8">
        Complaint not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl bg-white p-8 shadow">

      <h1 className="text-2xl font-bold">
        Complaint #{complaint.id}
      </h1>

      <div>
        <p className="text-sm text-slate-500">
          Title
        </p>

        <p className="font-medium">
          {complaint.title}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">
          Description
        </p>

        <p>
          {complaint.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-slate-500">
            Status
          </p>

          <p>{complaint.status}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Booking ID
          </p>

          <p>{complaint.bookingId}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Service ID
          </p>

          <p>{complaint.serviceId}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Created By
          </p>

          <p>{complaint.createdByRole}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Resolution Remark
          </p>

          <p>
            {complaint.resolutionRemark ?? '-'}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Created At
          </p>

          <p>
            {new Date(
              complaint.createdAt,
            ).toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  );
}