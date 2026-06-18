'use client';

import { useState } from 'react';

import type { Booking } from '@/constants/admin/bookingData';

import AssignTechnicianModal from '../actions/AssignTechnicianModal';
import ReassignTechnicianModal from '../actions/ReassignTechnicianModal';
import BookingDetails from './BookingDetails';

interface Props {
  open: boolean;
  onClose: () => void;
  booking: Booking;
}

const BookingDetailsDrawer = ({ open, onClose, booking: initialBooking }: Props) => {
  const [booking, setBooking] = useState<Booking>(initialBooking);
  const [assignOpen, setAssignOpen] = useState(false);
  const [reassignOpen, setReassignOpen] = useState(false);

  if (!open) return null;

  const isPending = booking.status === 'Pending';
  const isAssigned = booking.status === 'Assigned' || booking.status === 'In Progress';

  const handleAssign = (technicianName: string) => {
    setBooking((prev) => ({ ...prev, technician: technicianName, status: 'Assigned' }));
    setAssignOpen(false);
  };

  const handleReassign = (technicianName: string) => {
    setBooking((prev) => ({ ...prev, technician: technicianName }));
    setReassignOpen(false);
  };

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Assigned: 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-emerald-100 text-emerald-700',
    Completed: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
        <div
          className="absolute right-0 h-full w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Booking Details</h2>
              <p className="text-slate-500 mt-0.5">{booking.id}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Booking summary */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">{booking.customer}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{booking.service}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-slate-900">₹{booking.amount}</p>
                <p className="text-xs text-slate-500">{booking.date}</p>
              </div>
            </div>

            {/* Status + Technician row */}
            <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  statusColors[booking.status] || 'bg-slate-100 text-slate-700'
                }`}
              >
                {booking.status}
              </span>

              <div className="flex items-center gap-2 text-sm">
                {booking.technician && booking.technician !== '-' ? (
                  <span className="text-slate-600">
                    Technician:{' '}
                    <span className="font-semibold text-slate-900">{booking.technician}</span>
                  </span>
                ) : (
                  <span className="text-slate-400 italic text-xs">No technician assigned</span>
                )}
              </div>
            </div>
          </div>

          {/* Manual Assignment Actions */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
              Job Assignment
            </h3>

            {isPending && (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-slate-500">
                    This booking has no technician assigned yet.
                  </p>
                </div>
                <button
                  onClick={() => setAssignOpen(true)}
                  className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Assign Technician
                </button>
              </div>
            )}

            {isAssigned && (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-slate-500">
                    Currently assigned to{' '}
                    <span className="font-medium text-slate-800">{booking.technician}</span>.
                  </p>
                </div>
                <button
                  onClick={() => setReassignOpen(true)}
                  className="shrink-0 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Reassign Technician
                </button>
              </div>
            )}

            {!isPending && !isAssigned && (
              <p className="text-sm text-slate-400 italic">
                Job assignment is not available for {booking.status.toLowerCase()} bookings.
              </p>
            )}
          </div>

          <BookingDetails booking={booking} />
        </div>
      </div>

      {/* Assign Modal */}
      <AssignTechnicianModal
        open={assignOpen}
        booking={booking}
        onClose={() => setAssignOpen(false)}
        onAssign={handleAssign}
      />

      {/* Reassign Modal */}
      <ReassignTechnicianModal
        open={reassignOpen}
        booking={booking}
        onClose={() => setReassignOpen(false)}
        onConfirm={handleReassign}
      />
    </>
  );
};

export default BookingDetailsDrawer;
