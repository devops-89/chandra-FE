'use client';

import FilterListIcon from '@mui/icons-material/FilterList';

export default function TransactionFilters() {
  return (
    <button
      className="
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        border
        border-slate-200
        text-slate-600
        hover:border-emerald-500
        hover:text-emerald-600
        transition-all
      "
    >
      <FilterListIcon fontSize="small" />
      Filter
    </button>
  );
}