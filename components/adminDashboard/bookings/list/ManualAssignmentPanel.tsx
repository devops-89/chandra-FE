'use client';

import { useState } from 'react';

import type { AdminBooking } from '@/types/admin/bookings.types';

// import AssignTechnicianModal from '../actions/AssignTechnicianModal';

interface Props {
  bookings: AdminBooking[];
}

const ManualAssignmentPanel = ({ bookings }: Props) => {
  const [_assignTarget, _setAssignTarget] =
    useState<AdminBooking | null>(null);

  const unassigned = bookings.filter(
    (booking) => booking.technician === null,
  );

  if (unassigned.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          All caught up!
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          No unassigned bookings require manual assignment.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100">
          <svg
            className="h-5 w-5 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <div>
          <p className="text-sm font-semibold text-yellow-800">
            {unassigned.length} booking
            {unassigned.length !== 1 ? 's' : ''} awaiting
            technician assignment
          </p>

          <p className="mt-0.5 text-xs text-yellow-600">
            Assign technicians manually to ensure timely
            service delivery.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="hidden grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 border-b border-slate-100 bg-emerald-600 px-6 py-4 sm:grid">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
            Booking
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
            Customer
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
            Service
          </span>

          <span className="w-32 text-[11px] font-semibold uppercase tracking-wider text-white">
            Amount
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
            Action
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {unassigned.map((booking) => (
            <div
              key={booking.bookingId}
              className="grid grid-cols-1 items-center gap-3 px-6 py-4 transition-colors hover:bg-slate-50 sm:grid-cols-[1fr_1fr_1fr_auto_auto] sm:gap-4"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  B-{booking.bookingId}
                </span>

                <p className="mt-0.5 text-xs text-slate-400">
                  {booking.scheduledAtIst}
                </p>
              </div>

              <div>
                <span className="text-sm font-medium text-slate-800">
                  {booking.customer.name}
                </span>
              </div>

              <div>
                <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  {booking.service?.name ?? 'N/A'}
                </span>
              </div>

              <div className="text-sm font-bold text-slate-900">
                ₹{booking.totalAmount ?? 0}
              </div>

              <button
                onClick={() => _setAssignTarget(booking)}
                className="cursor-pointer rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Assign Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* {assignTarget && (
        <AssignTechnicianModal
          open
          booking={assignTarget}
          onClose={() => setAssignTarget(null)}
        />
      )} */}
    </>
  );
};

export default ManualAssignmentPanel;