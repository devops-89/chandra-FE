import type { ServiceDetail } from '@/types/serviceDetails.types';

interface ServiceOverviewProps {
  service: ServiceDetail;
}

export default function ServiceOverview({
  service,
}: ServiceOverviewProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Service Overview
        </h2>

        <p
          className="
            mt-6
            text-lg
            leading-8
            text-slate-600
          "
        >
          {service.description}
        </p>
      </div>
    </section>
  );
}