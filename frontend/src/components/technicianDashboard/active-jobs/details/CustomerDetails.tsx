'use client';

import {
  AccessTime,
  LocationOn,
  Person,
  Star,
} from '@mui/icons-material';

export default function CustomerDetails() {
  return (
    <div
      className="
        mt-8
        bg-slate-50
        rounded-3xl
        p-6
        grid
        md:grid-cols-2
        gap-6
      "
    >
      <div className="space-y-6">
        <div className="flex gap-3">
          <Person className="text-emerald-500" />

          <div>
            <h4 className="font-semibold text-lg">
              Robert Harrison
            </h4>

            <div className="flex items-center gap-1 text-slate-500">
              <Star
                sx={{
                  fontSize: 18,
                  color: '#FACC15',
                }}
              />

              <span>
                4.9 (12 reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <AccessTime className="text-emerald-500" />

          <div>
            <h4 className="font-semibold">
              Tomorrow, 10:00 AM
            </h4>

            <p className="text-slate-500">
              Estimated 2 Hours
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-3">
          <LocationOn className="text-emerald-500" />

          <div>
            <h4 className="font-semibold">
              Sector 52, Gurgaon
            </h4>

            <p className="text-slate-500">
              Apartment 402
            </p>
          </div>
        </div>

        <div>
          <p className="text-slate-500">
            Service Address
          </p>

          <p className="font-medium">
            Tower A, Green Valley Apartments,
            Sector 52, Gurgaon
          </p>
        </div>
      </div>
    </div>
  );
}