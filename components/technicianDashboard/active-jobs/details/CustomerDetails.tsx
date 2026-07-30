'use client';

import {
  AccessTime,
  LocationOn,
  Person,
  Star,
} from '@mui/icons-material';
import { useJobContext } from '../JobContext';

export default function CustomerDetails() {
  const currentJob = useJobContext();

  if (!currentJob) return null;

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
              {currentJob.customerName}
            </h4>

            <div className="flex items-center gap-1 text-slate-500">
              <Star
                sx={{
                  fontSize: 18,
                  color: '#FACC15',
                }}
              />

              <span>
                {currentJob.customerRating} (reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <AccessTime className="text-emerald-500" />

          <div>
            <h4 className="font-semibold">
              {currentJob.eta}
            </h4>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-3">
          <LocationOn className="text-emerald-500 mt-0.5" />

          <div>
            <span className="font-semibold mr-2">
              Service Address:
            </span>
            <span className="font-medium text-slate-700">
              {currentJob.address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}