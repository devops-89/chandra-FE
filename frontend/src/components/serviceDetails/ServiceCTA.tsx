import Link from 'next/link';

import type { ServiceDetail } from '@/types/serviceDetails.types';

interface ServiceCTAProps {
  service: ServiceDetail;
}

export default function ServiceCTA({
  service,
}: ServiceCTAProps) {
  return (
    <section className="py-24">
      <div
        className="
          mx-auto
          max-w-4xl
          rounded-[40px]
          bg-emerald-600
          px-8
          py-16
          text-center
          text-white
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            md:text-5xl
          "
        >
          Ready To Book?
        </h2>

        <p
          className="
            mt-4
            text-lg
            text-emerald-50
          "
        >
          Schedule your service today and
          get professional assistance at
          your doorstep.
        </p>

        <Link
          href={`/booking?service=${service.slug}`}
          className="
            mt-8
            inline-flex
            rounded-full
            bg-white
            px-8
            py-4
            text-lg
            font-semibold
            text-emerald-700
            transition-all
            hover:-translate-y-1
          "
        >
          {service.ctaText}
        </Link>
      </div>
    </section>
  );
}