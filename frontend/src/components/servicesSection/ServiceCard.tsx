import Link from 'next/link';

import { ServiceImage } from '@/components/servicesSection/ServiceImage';
import type { ServiceCardProps } from '@/types/services.types';

export function ServiceCard({
  service,
  alignRight,
}: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <div className="flex border border-slate-300 hover:shadow-lg bg-white border border-[#E8E2D6] transition-all duration-300 h-full flex-col overflow-hidden justify-between rounded-2xl cursor-pointer">
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
    </Link>
  );
}