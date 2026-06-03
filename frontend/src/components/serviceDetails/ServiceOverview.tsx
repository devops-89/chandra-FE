import type { ServiceDetail } from '@/types/serviceDetails.types';

interface ServiceOverviewProps {
  service: ServiceDetail;
}

export default function ServiceOverview({
  service,
}: ServiceOverviewProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto flex flex-col gap-8 max-w-5xl px-4">
        <h2
          className="
            text-5xl
            font-bold
            text-slate-900
            text-center
          "
        >
          Service Overview
        </h2>

        <p
          className="
            text-lg
            leading-relaxed
            text-slate-600
            max-w-3xl
            mx-auto
            text-center
            tracking-wide
          "
        >
          {service.description}
        </p>
      </div>
    </section>
  );
}