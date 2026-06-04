import {
  CalendarClock,
  BadgeCheck,
  MapPin,
  Wallet,
} from 'lucide-react';

import StatCard from './StatCard';

export default function StatsCards() {
  return (
    <section
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <StatCard
        title="Upcoming"
        value="03"
        icon={<CalendarClock />}
      />

      <StatCard
        title="Completed"
        value="12"
        icon={<BadgeCheck />}
      />

      <StatCard
        title="Addresses"
        value="02"
        icon={<MapPin />}
      />

      <StatCard
        title="$ Spent"
        value="$1,240"
        icon={<Wallet />}
      />
    </section>
  );
}