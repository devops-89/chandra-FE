import {
  Headphones,
  MapPin,
  PlusCircle,
  User,
} from 'lucide-react';

import ActionCard from './ActionCard';

export default function QuickActions() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <ActionCard
          title="Book Service"
          description="Schedule a new service"
          href="/#services"
          icon={<PlusCircle />}
        />

        <ActionCard
          title="Addresses"
          description="Manage saved addresses"
          href="/dashboard/customer/addresses"
          icon={<MapPin />}
        />

        <ActionCard
          title="Profile"
          description="Update account details"
          href="/dashboard/customer/profile"
          icon={<User />}
        />

        <ActionCard
          title="Support"
          description="Need help?"
          href="/dashboard/customer/support"
          icon={<Headphones />}
        />
      </div>
    </section>
  );
}