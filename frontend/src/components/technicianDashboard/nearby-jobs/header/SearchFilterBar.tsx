'use client';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectNearbyJobsFilters } from '@/redux/selectors/nearbyJobsSelectors';
import { setServiceTypeFilter } from '@/redux/slices/nearbyJobsSlice';

export default function SearchFilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectNearbyJobsFilters);

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
          value={filters.serviceType}
          onChange={(e) => dispatch(setServiceTypeFilter(e.target.value))}
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