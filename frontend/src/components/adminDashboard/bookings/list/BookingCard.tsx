'use client';

import { useState } from 'react';

import type { Booking } from '@/constants/admin/bookingData';

import AssignTechnicianModal from '../actions/AssignTechnicianModal';
import BookingDetailsDrawer from '../details/BookingDetailsDrawer';

interface Props {
  booking: Booking;
}

const BookingCard = ({ booking: initialBooking }: Props) => {
  const [booking, setBooking] = useState<Booking>(initialBooking);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Assigned: 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-emerald-100 text-emerald-700',
    Completed: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  const handleAssign = (technicianName: string) => {
    setBooking((prev) => ({ ...prev, technician: technicianName, status: 'Assigned' }));
    setAssignOpen(false);
  };

  return (
    <>
      <div className="border border-slate-200 rounded-2xl bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Booking ID: {booking.id}
              </span>
              <h4 className="mt-1 font-semibold text-slate-900 text-lg leading-snug">
                {booking.customer}
              </h4>
            </div>

            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                statusColors[booking.status] || 'bg-slate-100 text-slate-700'
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Service</p>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">{booking.service}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Technician</p>
              {booking.technician && booking.technician !== '-' ? (
                <p className="text-xs font-semibold text-slate-800 mt-0.5">{booking.technician}</p>
              ) : (
                <button
                  onClick={() => setAssignOpen(true)}
                  className="mt-0.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer transition-colors flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Assign
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-slate-700">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Date</span>
            <span className="text-xs text-slate-700 font-semibold">{booking.date}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-slate-900">₹{booking.amount}</span>

            <button
              onClick={() => setDrawerOpen(true)}
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline cursor-pointer transition-colors"
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* Details Drawer */}
      <BookingDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        booking={booking}
      />

      {/* Quick-assign modal (from card shortcut) */}
      <AssignTechnicianModal
        open={assignOpen}
        booking={booking}
        onClose={() => setAssignOpen(false)}
        onAssign={handleAssign}
      />
    </>
  );
};

export default BookingCard;
