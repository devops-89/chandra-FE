import RecentBookingRow from "@/components/customerDashboard/recentBookings/RecentBookingRow";
import {
  DashboardCard,
  EmptyState,
} from "@/components/customerDashboard/shared";
import { useRecentBookings } from "@/hooks/useRecentBookings";

const RecentBookings = () => {
  const { bookings } = useRecentBookings();

  return (
    <div className="space-y-6 text-black">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Recent Bookings</h3>
        <button
          type="button"
          className="text-sm cursor-pointer font-bold text-emerald-600 hover:underline"
        >
          View All
        </button>
      </div>

      <DashboardCard className="overflow-hidden p-0">
        {bookings.length === 0 ? (
          <EmptyState
            title="No Bookings Found"
            description="Your recent bookings will appear here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-slate-200 bg-slate-100 text-emerald-600">
                <tr>
                  <th className="px-8 py-4 text-sm font-bold">
                    ID
                  </th>
                  <th className="px-8 py-4 text-sm font-bold">
                    Service
                  </th>
                  <th className="px-8 py-4 text-sm font-bold">
                    Date
                  </th>
                  <th className="px-8 py-4 text-sm font-bold">
                    Status
                  </th>
                  <th className="px-8 py-4 text-right text-sm font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {bookings.map((booking) => (
                  <RecentBookingRow key={booking.id} booking={booking} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default RecentBookings;
