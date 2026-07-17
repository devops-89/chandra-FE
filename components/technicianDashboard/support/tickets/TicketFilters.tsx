'use client';

import FilterListIcon from '@mui/icons-material/FilterList';

export default function TicketFilters() {
  return (
    <div className="flex gap-3">
      <select
        className="
          px-4
          py-2
          rounded-xl
          border
          border-slate-200
          bg-white
          text-sm
        "
      >
        <option>All Status</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Resolved</option>
      </select>

      <button
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 hover:border-emerald-500"
      >
        <FilterListIcon fontSize="small" />
        Filter
      </button>
    </div>
  );
}