import BookingFilters from "./list/BookingFilters";
import BookingsTable from "./list/BookingsTable";
import BookingStats from "./stats/BookingStats";

const Bookings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Bookings
        </h1>

        <p className="text-slate-500">
          Manage all service bookings
        </p>
      </div>

      <BookingStats />

      <BookingFilters />

      <BookingsTable />
    </div>
  );
};

export default Bookings;