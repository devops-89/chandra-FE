import { addresses } from '@/constants/dashboard/addresses';

import AddressCard from './AddressCard';

export default function AddressList() {
  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
      "
    >
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
        />
      ))}
    </div>
  );
}