'use client';

import { LocationOn } from '@mui/icons-material';

export default function AddressInfo() {
  return (
    <div>
      <div className="flex gap-4">
        <LocationOn className="text-emerald-500" />

        <div>
          <p className="text-sm text-slate-500">
            Service Address
          </p>

          <p className="font-semibold text-slate-900">
            Sector 52, Gurgaon,
            Haryana, India
          </p>

          <p className="mt-2 text-slate-500">
            Tower A, Green Valley Apartments
          </p>
        </div>
      </div>
    </div>
  );
}