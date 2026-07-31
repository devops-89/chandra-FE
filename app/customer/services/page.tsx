import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import { ServiceGrid } from '@/components/servicesSection/ServiceGrid';

/**
 * Customer Dashboard → Services
 *
 * Renders the same service grid used on the public /services page,
 * wrapped inside the dashboard layout (no navbar/footer duplication).
 * Clicking a card navigates to /customer/services/[slug].
 */
export default function DashboardServicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Services</h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse and book available services
          </p>
        </div>
        <ServiceGrid linkPrefix="/customer/services" />
      </div>
    </DashboardLayout>
  );
}
