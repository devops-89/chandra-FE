import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import HeroBookingCard from '@/components/customerDashboard/overview/HeroBookingCard';
import QuickActions from '@/components/customerDashboard/overview/QuickActions';
import ServiceProgress from '@/components/customerDashboard/overview/ServiceProgress';
import StatsCards from '@/components/customerDashboard/overview/StatsCards';
import UpcomingServices from '@/components/customerDashboard/overview/UpcomingServices';
import AddressPreview from '@/components/customerDashboard/overview/AddressPreview';
import HistoryPreview from '@/components/customerDashboard/overview/HistoryPreview';

export default function CustomerDashboardPage() {
  return (
    <DashboardLayout>
      <div
        className="
          rounded-3xl
          border
          border-dashed
          border-slate-300
          bg-white
          p-20
          text-center
        "
      >
        <HeroBookingCard />
        <ServiceProgress />
        <StatsCards />
        <QuickActions />
        <UpcomingServices />
        <div className="grid gap-6 lg:grid-cols-2">
          <AddressPreview />
          <HistoryPreview />
        </div>
      </div>
    </DashboardLayout>
  );
}
