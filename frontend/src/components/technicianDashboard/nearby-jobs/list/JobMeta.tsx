'use client';

import {
  AccessTime,
  LocationOn,
  Payments,
  Person,
  Star,
} from '@mui/icons-material';

interface Props {
  job: {
    customerName: string;
    rating: number;
    reviews: number;
    location: string;
    distance: string;
    schedule: string;
    duration: string;
    payout: string;
  };
}

export default function JobMeta({ job }: Props) {
  return (
    <div
      className="
        bg-slate-50
        rounded-2xl
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
            <h4 className="font-semibold">
              {job.customerName}
            </h4>

            <div className="flex items-center gap-1 text-slate-500">
              <Star
                sx={{
                  fontSize: 18,
                  color: '#FACC15',
                }}
              />

              {job.rating} ({job.reviews} reviews)
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <AccessTime className="text-emerald-500" />

          <div>
            <h4 className="font-semibold">
              {job.schedule}
            </h4>

            <p className="text-slate-500">
              {job.duration}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-3">
          <LocationOn className="text-emerald-500" />

          <div>
            <h4 className="font-semibold">
              {job.location}
            </h4>

            <p className="text-slate-500">
              {job.distance}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Payments className="text-emerald-500" />

          <div>
            <h4
              className="
                text-3xl
                font-bold
                text-emerald-700
              "
            >
              {job.payout}
            </h4>

            <p className="text-slate-500">
              Fixed Payout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}