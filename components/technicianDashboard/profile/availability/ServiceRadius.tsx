'use client';

import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function ServiceRadius() {
  return (
    <div className="flex gap-4">
      <MyLocationIcon className="text-emerald-500" />

      <div className="flex-1">
        <p className="text-sm text-slate-500">
          Service Radius
        </p>

        <p className="font-semibold">
          15 Km
        </p>

        <div className="mt-4">
          <div className="h-2 bg-slate-100 rounded-full">
            <div
              className="
                h-full
                w-[75%]
                bg-emerald-500
                rounded-full
              "
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Covering Gurgaon & Nearby Areas
          </p>
        </div>
      </div>
    </div>
  );
}