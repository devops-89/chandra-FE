import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';

type BookingDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookingDetailsPage({
  params,
}: BookingDetailsPageProps) {
  const { id } = await params;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Booking Details
          </h1>

          <p className="text-slate-500">
            View details for booking {id}.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
