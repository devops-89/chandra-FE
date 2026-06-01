import { availabilityContent } from '@/constants/serviceAvailability/availabilityData';

import { AvailabilityHeading } from '@/components/serviceAvailabilitySection/AvailabilityHeading';
import { ServiceAvailabilityForm } from '@/components/serviceAvailabilitySection/ServiceAvailabilityForm';
import { ServiceAvailabilityMap } from '@/components/serviceAvailabilitySection/ServiceAvailabilityMap';

export const ServiceAvailabilitySection = () => {
  return (
    <section id="service-availability" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="w-full md:w-1/2">
            <AvailabilityHeading title={availabilityContent.title} />

            <ServiceAvailabilityMap />
          </div>

          <div className="w-full md:w-1/2 md:pt-18">
            <ServiceAvailabilityForm />
          </div>
        </div>
      </div>
    </section>
  );
};
