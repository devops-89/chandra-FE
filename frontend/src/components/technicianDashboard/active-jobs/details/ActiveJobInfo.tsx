'use client';

import {
  AttachMoney,
  CleaningServices,
  DirectionsCar,
  Schedule,
} from '@mui/icons-material';

export default function ActiveJobInfo() {
  return (
    <div
      className="
        mt-8
        grid
        md:grid-cols-2
        gap-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-4
          p-5
          rounded-2xl
          border
          border-slate-200
        "
      >
        <CleaningServices className="text-emerald-500" />

        <div>
          <p className="text-slate-500 text-sm">
            Service Type
          </p>

          <p className="font-semibold">
            AC Deep Cleaning
          </p>
        </div>
      </div>

      <div
        className="
          flex
          items-center
          gap-4
          p-5
          rounded-2xl
          border
          border-slate-200
        "
      >
        <AttachMoney className="text-emerald-500" />

        <div>
          <p className="text-slate-500 text-sm">
            Earnings
          </p>

          <p className="font-semibold">
            ₹2,500
          </p>
        </div>
      </div>

      <div
        className="
          flex
          items-center
          gap-4
          p-5
          rounded-2xl
          border
          border-slate-200
        "
      >
        <Schedule className="text-emerald-500" />

        <div>
          <p className="text-slate-500 text-sm">
            Duration
          </p>

          <p className="font-semibold">
            2 Hours
          </p>
        </div>
      </div>

      <div
        className="
          flex
          items-center
          gap-4
          p-5
          rounded-2xl
          border
          border-slate-200
        "
      >
        <DirectionsCar className="text-emerald-500" />

        <div>
          <p className="text-slate-500 text-sm">
            Distance
          </p>

          <p className="font-semibold">
            2.4 Km Away
          </p>
        </div>
      </div>
    </div>
  );
}