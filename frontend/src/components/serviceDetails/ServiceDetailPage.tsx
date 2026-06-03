import { ServiceDetail } from '@/types/serviceDetails.types';

import ServiceHero from './ServiceHero';
import ServiceOverview from './ServiceOverview';
import ServiceFeatures from './ServiceFeatures';
import ServiceCTA from './ServiceCTA';

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