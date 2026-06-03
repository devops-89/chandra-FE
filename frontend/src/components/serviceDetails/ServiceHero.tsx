import Image from 'next/image';

import type { ServiceDetail } from '@/types/serviceDetails.types';

interface ServiceHeroProps {
  service: ServiceDetail;
}

export default function ServiceHero({
  service,
}: ServiceHeroProps) {
  return (
    <section className="bg-[#F7F2E8] py-20">
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          gap-12
          px-4
          md:flex-row
        "
      >
        <div className="flex-1">
          <span
            className="
              inline-flex
              rounded-full
              border
              border-emerald-200
              bg-emerald-50
              px-5
              py-2
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-emerald-700
            "
          >
            Professional Service
          </span>

          <h1
            className="
              mt-6
              text-4xl
              font-bold
              leading-tight
              text-slate-900
              md:text-6xl
            "
          >
            {service.title}
          </h1>

          <p
            className="
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-slate-600
            "
          >
            {service.subtitle}
          </p>

          <div className="mt-8">
            <span className="text-slate-500">
              Starting From
            </span>

            <p
              className="
                text-4xl
                font-bold
                text-emerald-600
              "
            >
              {service.startingPrice}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <Image
            src={service.image}
            alt={service.title}
            width={700}
            height={500}
            className="
              w-full
              rounded-[32px]
              object-cover
              shadow-xl
            "
          />
        </div>
      </div>
    </section>
  );
}