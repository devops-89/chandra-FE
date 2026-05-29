import { ServiceImage } from '@/components/servicesSection/ServiceImage';
import type { ServiceCardProps } from '@/types/services.types';

export function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <div className="h-full overflow-hidden bg-neutral-100 transition-all duration-300 hover:shadow-lg">
      <div className="flex bg-gray-300 h-full flex-col justify-between">
        <div className='text-black'>
          <h3 className="mb-2 text-2xl font-semibold">
            {service.title}
          </h3>

          <p className="max-w-xs text-muted-foreground">
            {service.description}
          </p>
        </div>

        <ServiceImage
          src={service.image}
          alt={service.title}
        />
      </div>
    </div>
  );
}