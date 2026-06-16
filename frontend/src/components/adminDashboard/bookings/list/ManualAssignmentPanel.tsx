'use client';

import { useState } from 'react';

import type { Booking } from '@/constants/admin/bookingData';

import AssignTechnicianModal from '../actions/AssignTechnicianModal';

interface Props {
  bookings: Booking[];
}

const ManualAssignmentPanel = ({ bookings: initialBookings }: Props) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [assignTarget, setAssignTarget] = useState<Booking | null>(null);

  const unassigned = bookings.filter(
    (b) => b.status === 'Pending' && (!b.technician || b.technician === '-'),
  );

  const handleAssign = (technicianName: string) => {
    if (!assignTarget) return;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === assignTarget.id
          ? { ...b, technician: technicianName, status: 'Assigned' }
          : b,
      ),
    );
    setAssignTarget(null);
  };

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
        <h3 className="text-lg font-semibold text-slate-900">All caught up!</h3>
        <p className="mt-1 text-sm text-slate-500">
          No unassigned bookings require manual assignment.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Header banner */}
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-4 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-100">
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
            {unassigned.length} booking{unassigned.length !== 1 ? 's' : ''} awaiting technician assignment
          </p>
          <p className="text-xs text-yellow-600 mt-0.5">
            Assign technicians manually to ensure timely service delivery.
          </p>
        </div>
      </div>

      {/* Assignment list */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 border-b border-slate-100 bg-emerald-600 px-6 py-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
            Booking
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
            Customer
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
            Service
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider w-32 text-white">
            Amount
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
            Action
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {unassigned.map((booking) => (
            <div
              key={booking.id}
              className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto_auto] gap-3 sm:gap-4 items-center px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              {/* Booking ID + date */}
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                  {booking.id}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">{booking.date}</p>
              </div>

              {/* Customer */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                  {booking.customer
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <span className="text-sm font-medium text-slate-800 truncate">
                  {booking.customer}
                </span>
              </div>

              {/* Service */}
              <div>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  {booking.service}
                </span>
              </div>

              {/* Amount */}
              <div className="font-bold text-slate-900 text-sm">
                ₹{booking.amount}
              </div>

              {/* Assign CTA */}
              <div>
                <button
                  onClick={() => setAssignTarget(booking)}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Assign Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assign Modal */}
      {assignTarget && (
        <AssignTechnicianModal
          open={!!assignTarget}
          booking={assignTarget}
          onClose={() => setAssignTarget(null)}
          onAssign={handleAssign}
        />
      )}
    </>
  );
};

export default ManualAssignmentPanel;
