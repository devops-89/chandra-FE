import Link from 'next/link';

import { ServiceImage } from '@/components/servicesSection/ServiceImage';
import type { ServiceCardProps } from '@/types/services.types';

interface ServiceCardExtendedProps extends ServiceCardProps {
  /**
   * Base URL prefix for the service detail link.
   * Defaults to '/services' (public route).
   * Pass '/dashboard/customer/services' for the dashboard context.
   */
  linkPrefix?: string;
}

export function ServiceCard({
  service,
  alignRight,
  linkPrefix = '/services',
}: ServiceCardExtendedProps) {
  return (
    <Link href={`${linkPrefix}/${service.slug}`} className="block h-full">
      <div className="flex hover:shadow-lg bg-white border border-[#E8E2D6] transition-all duration-300 h-full flex-col overflow-hidden justify-between rounded-2xl cursor-pointer">
        <ServiceImage
          src={service.image}
          alt={service.title}
          alignRight={alignRight}
        />
        <div className="flex flex-1 flex-col p-5 text-black">
          <h3 className="mb-1 text-2xl font-semibold">
            {service.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {service.description}
          </p>
        </div>

        
      </div>
    </Link>
  );
}
