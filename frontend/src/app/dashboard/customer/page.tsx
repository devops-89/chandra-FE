import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import AddressPreview from '@/components/customerDashboard/overview/AddressPreview';
import HeroBookingCard from '@/components/customerDashboard/overview/HeroBookingCard';
import HistoryPreview from '@/components/customerDashboard/overview/HistoryPreview';
import QuickActions from '@/components/customerDashboard/overview/QuickActions';
import ServiceProgress from '@/components/customerDashboard/overview/ServiceProgress';
import StatsCards from '@/components/customerDashboard/overview/StatsCards';
import UpcomingServices from '@/components/customerDashboard/overview/UpcomingServices';

export default function CustomerDashboardPage() {
  return (
    <DashboardLayout>
      <div
        className="
          rounded-2xl
          sm:rounded-3xl
          border
          border-dashed
          border-slate-300
          bg-white
          p-4
          sm:p-6
          lg:p-10
          text-center
          space-y-6
          lg:space-y-8
        "
      >
        <HeroBookingCard />
        <ServiceProgress />
        <StatsCards />
        <QuickActions />
        <UpcomingServices />
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <AddressPreview />
          <HistoryPreview />
        </div>
      </div>
    </DashboardLayout>
  );
}
