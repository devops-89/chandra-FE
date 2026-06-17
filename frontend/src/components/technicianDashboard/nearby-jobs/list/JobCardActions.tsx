'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function JobCardActions() {
  return (
    <>
      <div className="border-t border-slate-200 my-6" />

      <div
        className="
          flex
          flex-col
          lg:flex-row
          gap-4
          items-center
        "
      >
        <button
          className="
            flex-1
            w-full
            py-4
            rounded-2xl
            bg-emerald-500
            text-white
            font-semibold
            hover:bg-emerald-600
            transition-all
          "
        >
          Accept Job
        </button>

        <button
          className="
            flex-1
            w-full
            py-4
            rounded-2xl
            border
            border-slate-300
            text-slate-700
            font-semibold
            hover:bg-slate-50
          "
        >
          Reject
        </button>

        <button
          className="
            flex
            items-center
            gap-2
            text-emerald-500
            font-semibold
            whitespace-nowrap
          "
        >
          View Details

          <ArrowForwardIcon />
        </button>
      </div>
    </>
  );
}