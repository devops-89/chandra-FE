import type { ServiceDetail } from '@/types/serviceDetails.types';

import ServiceCTA from '@/components/serviceDetails/ServiceCTA';
import ServiceFeatures from '@/components/serviceDetails/ServiceFeatures';
import ServiceHero from '@/components/serviceDetails/ServiceHero';
import ServiceOverview from '@/components/serviceDetails/ServiceOverview';

interface Props {
  service: ServiceDetail;
}

export default function ServiceDetailPage({
  service,
}: Props) {
  return (
    <main>
      <ServiceHero service={service} />

      <ServiceOverview service={service} />

      <ServiceFeatures features={service.features} />

      <ServiceCTA service={service} />
    </main>
  );
}