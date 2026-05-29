import { ServiceGrid } from './ServiceGrid';
import { ServiceHeading } from './ServiceHeading';

export function ServiceSection() {
  return (
    <section
      id="services"
      className="py-24"
    >
      <div className="mx-auto flex flex-col gap-5 max-w-7xl px-4 py-4">
        <ServiceHeading />
        <ServiceGrid />
      </div>
    </section>
  );
}