import { Star } from 'lucide-react';
import Image from 'next/image';

import type { FavouriteTechnician } from '@/types/customer/favouriteTechnician.types';

interface TechnicianCardProps {
  technician: FavouriteTechnician;
}

const TechnicianCard = ({ technician }: TechnicianCardProps) => {
  const fullName = `${technician.firstName} ${technician.lastName}`;

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-8 ambient-shadow">
      <div className="flex items-center gap-4">
        <Image
          src={technician.profileImage ?? '/images/default-avatar.png'}
          alt={fullName}
          width={48}
          height={48}
          unoptimized
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-bold">{fullName}</p>

          <p className="mt-1 text-xs text-slate-500">
            {technician.phone}
          </p>

          <div className="mt-1 flex items-center gap-1 text-emerald-600">
            <Star className="h-4 w-4 fill-emerald-600" />

            <span className="text-sm font-bold">
              {technician.technicianProfile.status}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="rounded-lg bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 transition-all hover:brightness-95 cursor-pointer"
      >
        Book Again
      </button>
    </div>
  );
};

export default TechnicianCard;