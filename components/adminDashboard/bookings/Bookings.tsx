'use client';



import BookingsTable from './list/BookingsTable';

const Bookings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Bookings</h1>
        <p className="text-slate-500">Manage all service bookings</p>
      </div>

      <BookingsTable />
    </div>
  );
};

export default Bookings;
