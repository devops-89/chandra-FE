'use client';

import { Calendar, Clock, Hourglass, UserCheck } from 'lucide-react';
import Link from 'next/link';

import { DashboardCard } from '@/components/customerDashboard/shared';
import type { ActiveBooking } from '@/types/dashboardTypes/customerDashboard/customerDashboard.types';

type PendingBookingCardProps = {
  booking: ActiveBooking;
};

export default function PendingBookingCard({ booking }: PendingBookingCardProps) {
  return (
    <DashboardCard className="overflow-hidden p-0">
      {/* Header Badge */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-amber-500 px-4 sm:px-6 lg:px-8 py-3.5">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
          <Hourglass className="h-4 w-4 animate-spin" />
          Pending Assignment
        </h4>
        <span className="text-xs text-white opacity-90 font-medium">
          Booking ID #{booking.id}
        </span>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Booking Info */}
          <div className="min-w-0 flex-1">
            <h3 className="mb-2 text-xl sm:text-2xl font-bold text-slate-900">
              {booking.serviceName}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-600" />
                <span>{booking.bookingDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-600" />
                <span>{booking.bookingTime}</span>
              </div>
            </div>
          </div>

          {/* Waiting Status Box */}
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-amber-900 shrink-0 max-w-sm">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold">Assigning Specialist</p>
              <p className="text-xs text-amber-800/90 mt-0.5">
                We are matching the best available technician for your location. Est. 5-10 mins.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/customer/bookings"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 cursor-pointer"
          >
            View Booking Details
          </Link>
        </div>
      </div>
    </DashboardCard>
  );
}
