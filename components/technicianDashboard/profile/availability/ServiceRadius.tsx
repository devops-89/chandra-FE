'use client';

import MyLocationIcon from '@mui/icons-material/MyLocation';

import { useAppSelector } from '@/redux/hooks';

export default function ServiceRadius() {
  const technician = useAppSelector((state) => state.technicianProfile.profile);
  const location = technician?.technicianProfile?.locations?.[0];
  const radius = location?.serviceRadiusKm || 15;
  const address = location?.fullAddress || location?.city || 'Covering Nearby Areas';

  return (
    <div className="flex gap-4">
      <MyLocationIcon className="text-emerald-500" />

      <div className="flex-1">
        <p className="text-sm text-slate-500">
          Service Radius
        </p>

        <p className="font-semibold">
          {radius} Km
        </p>

        <div className="mt-4">
          <div className="h-2 bg-slate-100 rounded-full">
            <div
              className="
                h-full
                bg-emerald-500
                rounded-full
              "
              style={{ width: `${Math.min((radius / 50) * 100, 100)}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-slate-500 line-clamp-1">
            {address}
          </p>
        </div>
      </div>
    </div>
  );
}