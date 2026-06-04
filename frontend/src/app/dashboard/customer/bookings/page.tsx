import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';

import BookingTable from '@/components/customerDashboard/bookings/BookingTable';

export default function BookingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            My Bookings
          </h1>

          <p className="text-slate-500">
            Manage all your service bookings.
          </p>
        </div>

        <BookingTable />
      </div>
    </DashboardLayout>
  );
}