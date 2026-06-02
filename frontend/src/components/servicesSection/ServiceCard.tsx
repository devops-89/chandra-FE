import { ServiceImage } from '@/components/servicesSection/ServiceImage';
import type { ServiceCardProps } from '@/types/services.types';

export function ServiceCard({
  service,
  alignRight,
}: ServiceCardProps) {
  return (
      <div className="flex hover:shadow-lg bg-[#FEF7EC] transition-all duration-300 h-full flex-col overflow-hidden justify-between rounded-2xl">
        <div className='text-black p-5'>
          <h3 className="mb-1 text-2xl font-semibold">
            {service.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {service.description}
          </p>
        </div>

        <ServiceImage
          src={service.image}
          alt={service.title}
          alignRight={alignRight}
        />
      </div>
  );
}