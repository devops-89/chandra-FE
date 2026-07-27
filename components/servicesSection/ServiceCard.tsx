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
  /**
   * Optional click interceptor. When provided, the card renders as a button
   * instead of a Link so the caller can handle navigation/gating.
   */
  onCardClick?: () => void;
}

export function ServiceCard({
  service,
  alignRight,
  linkPrefix = '/services',
  onCardClick,
}: ServiceCardExtendedProps) {
  const inner = (
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

        <p className="text-sm text-muted-foreground line-clamp-2">
          {service.description}
        </p>
      </div>
    </div>
  );

  if (onCardClick) {
    return (
      <button
        type="button"
        onClick={onCardClick}
        className="block h-full w-full text-left"
      >
        {inner}
      </button>
    );
  }

  return (
    <Link href={`${linkPrefix}/${service.slug}`} className="block h-full">
      {inner}
    </Link>
  );
}
