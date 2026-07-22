'use client';

import { Calendar, Clock, RefreshCw } from "lucide-react";

import BookingProgressTracker from "@/components/customerDashboard/activeBooking/BookingProgressTracker";
import { DashboardCard } from "@/components/customerDashboard/shared";
import { useActiveBooking } from "@/hooks/useActiveBooking";

import BookingTechnicianCard from "./BookingTechnicianCard";
import EmptyBookingState from "./EmptyBookingState";
import PendingBookingCard from "./PendingBookingCard";

const ActiveBookingCard = () => {
  const { activeBooking } = useActiveBooking();

  // STATE 1: No active/pending booking (null or completed/cancelled)
  if (!activeBooking || activeBooking.status === 'completed') {
    return <EmptyBookingState />;
  }

  // STATE 2: Pending booking (Booked, but technician not assigned yet)
  const isPending =
    activeBooking.status === 'booked' ||
    !activeBooking.technician ||
    !activeBooking.technician.name;

  if (isPending) {
    return <PendingBookingCard booking={activeBooking} />;
  }

  // STATE 3: Active booking (assigned, on-way, started)
  return (
    <DashboardCard className="overflow-hidden p-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-emerald-600 px-4 sm:px-6 lg:px-8 py-4">
        <h4 className="flex items-center gap-2 text-sm font-bold text-white">
          <RefreshCw className="h-5 w-5" />
          IN PROGRESS
        </h4>
        <span className="text-sm text-left text-white opacity-80">
          Booking ID #{activeBooking.id}
        </span>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="mb-2 text-left sm:text-2xl lg:text-3xl font-bold wrap-break-words">
              {activeBooking.serviceName}
            </h3>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-600" />
                {activeBooking.bookingDate}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600" />
                {activeBooking.bookingTime}
              </div>
            </div>
          </div>

          <BookingTechnicianCard technician={activeBooking.technician} />
        </div>

        <BookingProgressTracker status={activeBooking.status} />

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            className="flex-1 rounded-xl cursor-pointer bg-emerald-600 py-4 text-sm font-bold text-white transition-all hover:bg-emerald-700"
          >
            View Booking
          </button>
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-xl border-2 border-slate-300 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-100"
          >
            Contact Technician
          </button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ActiveBookingCard;

