'use client';

import {
  AccessTime,
  CleaningServices,
  LocationOn,
  Payments,
} from '@mui/icons-material';

export default function JobSummaryCard() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
      "
    >
      <h3
        className="
          text-lg
          font-bold
          text-slate-900
          mb-6
        "
      >
        Job Summary
      </h3>

      <div className="space-y-5">
        <div className="flex gap-3">
          <CleaningServices className="text-emerald-500" />

          <div>
            <p className="text-slate-500 text-sm">
              Service
            </p>

            <p className="font-medium">
              AC Deep Cleaning
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <LocationOn className="text-emerald-500" />

          <div>
            <p className="text-slate-500 text-sm">
              Distance
            </p>

            <p className="font-medium">
              2.4 Km
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <AccessTime className="text-emerald-500" />

          <div>
            <p className="text-slate-500 text-sm">
              Duration
            </p>

            <p className="font-medium">
              2 Hours
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Payments className="text-emerald-500" />

          <div>
            <p className="text-slate-500 text-sm">
              Payout
            </p>

            <p className="font-medium">
              ₹2,500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}