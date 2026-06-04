import ServiceCard from '@/components/customerDashboard/overview/ServiceCard';

export default function UpcomingServices() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">
        Upcoming Services
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <ServiceCard
          service="Solar Panel Maintenance"
          date="24 June 2026"
          time="09:00 AM"
          status="Assigned"
        />

        <ServiceCard
          service="Solar Inspection"
          date="28 June 2026"
          time="11:00 AM"
          status="Confirmed"
        />
      </div>
    </section>
  );
}
