import { bookingsData } from "@/constants/admin/bookingData";

import BookingCard from "./BookingCard";

const BookingsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-emerald-600">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {bookingsData.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingsTable;
