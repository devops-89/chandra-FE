import HeroDecorations from '@/components/heroSection/HeroDecorations';

import { ServiceGrid } from './ServiceGrid';
import { ServiceHeading } from './ServiceHeading';


export function ServiceSection() {
  return (
    <section
      id="services"
      className="py-8 bg-[#FFF8ED]"
    > <HeroDecorations />
      <div className="mx-auto flex flex-col gap-5 max-w-7xl px-4 py-4">
        <ServiceHeading />
        <ServiceGrid useSwiper={true} />
      </div>
    </section>
  );
}