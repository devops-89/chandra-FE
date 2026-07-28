'use client';

import {
  AttachMoney,
  CleaningServices,
  DirectionsCar,
  Schedule,
} from '@mui/icons-material';
import { useJobContext } from '../JobContext';

export default function ActiveJobInfo() {
  const currentJob = useJobContext();

  if (!currentJob) return null;

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
            {currentJob.serviceType}
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
            ₹{currentJob.payout}
          </p>
        </div>
      </div>

      {currentJob.duration ? (
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
              {currentJob.duration}
            </p>
          </div>
        </div>
      ) : null}

      {currentJob.distance ? (
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
              {currentJob.distance}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}