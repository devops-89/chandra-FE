import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import HeroBookingCard from '@/components/customerDashboard/overview/HeroBookingCard';
import ServiceProgress from '@/components/customerDashboard/overview/ServiceProgress';

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
      </div>
    </DashboardLayout>
  );
}
