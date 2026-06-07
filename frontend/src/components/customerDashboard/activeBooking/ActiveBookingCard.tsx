import { Calendar, Clock, RefreshCw } from "lucide-react";

import { DashboardCard } from "@/components/customerDashboard/shared";
import { useActiveBooking } from "@/hooks/useActiveBooking";

import BookingProgressTracker from "@/components/customerDashboard/activeBooking/BookingProgressTracker";
import BookingTechnicianCard from "./BookingTechnicianCard";

const ActiveBookingCard = () => {
  const { activeBooking } = useActiveBooking();

  if (!activeBooking) {
    return null;
  }

  return (
    <DashboardCard className="overflow-hidden p-0">
      <div className="flex items-center justify-between rounded-lg bg-emerald-600 px-8 py-4">
        <h4 className="flex items-center gap-2 text-sm font-bold text-white">
          <RefreshCw className="h-5 w-5" />
          IN PROGRESS
        </h4>
        <span className="text-sm text-white opacity-80">
          Booking ID #{activeBooking.id}
        </span>
      </div>

      <div className="p-8">
        <div className="mb-8 text-black flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <h3 className="mb-2 text-2xl font-bold">
              {activeBooking.serviceName}
            </h3>
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
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

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 rounded-xl cursor-pointer bg-emerald-600 py-4 text-sm font-bold text-white transition-all hover:bg-emerald-700"
          >
            View Booking
          </button>
          <button
            type="button"
            className="flex-1 cursor-pointer rounded-xl border-2 border-slate-300 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
          >
            Contact Technician
          </button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ActiveBookingCard;
