'use client';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

export default function SearchFilterBar() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div
        className="
          flex-1
          flex
          items-center
          gap-3
          bg-white
          border
          border-slate-200
          rounded-2xl
          px-5
          py-4
          shadow-sm
        "
      >
        <SearchIcon className="text-slate-400" />

        <input
          type="text"
          placeholder="Search service type..."
          className="
            w-full
            outline-none
            text-slate-700
            placeholder:text-slate-400
          "
        />
      </div>

      {/* Filter Button */}
      <button
        className="
          flex
          items-center
          justify-center
          gap-2
          px-6
          py-4
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-sm
          hover:border-emerald-500
          transition-all
        "
      >
        <TuneIcon />

        <span className="font-medium">
          Filter
        </span>
      </button>
    </div>
  );
}