'use client';

import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function SupportStatsCard() {
  return (
    <div
      className="
        bg-linear-to-br
        from-emerald-500
        to-emerald-700
        rounded-3xl
        p-6
        text-white
        shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">
            Total Tickets
          </p>

          <h2 className="text-4xl font-bold mt-2">
            24
          </h2>
        </div>

        <SupportAgentIcon sx={{ fontSize: 42 }} />
      </div>

      <div className="mt-6 border-t border-white/20 pt-4">
        <p className="text-sm text-white/80">
          3 tickets currently active
        </p>
      </div>
    </div>
  );
}