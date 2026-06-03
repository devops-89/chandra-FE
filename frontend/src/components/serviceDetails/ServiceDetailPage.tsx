import type { ServiceDetail } from '@/types/serviceDetails.types';

import ServiceCTA from './ServiceCTA';
import ServiceFeatures from './ServiceFeatures';
import ServiceHero from './ServiceHero';
import ServiceOverview from './ServiceOverview';

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