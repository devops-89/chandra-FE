'use client';

import { LocationOn } from '@mui/icons-material';

import { useAppSelector } from '@/redux/hooks';

export default function AddressInfo() {
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  const location = technician?.technicianProfile?.locations?.[0];

  return (
    <div>
      <div className="flex gap-4">
        <LocationOn className="text-emerald-500" />

        <div>
          <p className="text-sm text-slate-500">
            Service Address
          </p>

          <p className="font-semibold text-slate-900">
            {location 
              ? `${location.city}, ${location.state}, India`
              : 'N/A'
            }
          </p>

          <p className="mt-2 text-slate-500">
            {location?.fullAddress ?? 'No address provided'}
          </p>
        </div>
      </div>
    </div>
  );
}