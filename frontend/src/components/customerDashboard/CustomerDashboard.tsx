import ActiveBookingCard from "@/components/customerDashboard/activeBooking/ActiveBookingCard";
import FavoriteTechnicians from "@/components/customerDashboard/favoriteTechnicians/FavoriteTechnicians";
import RecentInvoices from "@/components/customerDashboard/invoices/RecentInvoices";
import QuickRebook from "@/components/customerDashboard/quickRebook/QuickRebook";
import RecentBookings from "@/components/customerDashboard/recentBookings/RecentBookings";
import LatestReview from "@/components/customerDashboard/reviews/LatestReview";

export default function CustomerDashboard() {
  return (
    <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
      {/* Left Column: Active Booking & Recent History */}
      <div className="space-y-12 lg:col-span-2">
        <ActiveBookingCard />
        <RecentBookings />
      </div>

      {/* Right Column: Sidebar Widgets */}
      <div className="space-y-12">
        <FavoriteTechnicians />
        <QuickRebook />
        <RecentInvoices />
        <LatestReview />
      </div>
    </div>
  );
}
