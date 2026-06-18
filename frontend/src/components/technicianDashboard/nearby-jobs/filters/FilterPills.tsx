'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectNearbyJobsFilters } from '@/redux/selectors/nearbyJobsSelectors';
import {
  setDistanceFilter,
  setPayoutFilter,
  setScheduleFilter,
  setServiceTypeFilter,
} from '@/redux/slices/nearbyJobsSlice';

const pills = [
  'All Services',
  'Distance < 5km',
  'Payout: ₹500+',
  'Schedule: Today',
];

export default function FilterPills() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectNearbyJobsFilters);

  const handlePillClick = (index: number) => {
    // Reset all filters first
    dispatch(setServiceTypeFilter(''));
    dispatch(setDistanceFilter(''));
    dispatch(setPayoutFilter(''));
    dispatch(setScheduleFilter(''));

    if (index === 1) {
      dispatch(setDistanceFilter('5'));
    } else if (index === 2) {
      dispatch(setPayoutFilter('500'));
    } else if (index === 3) {
      dispatch(setScheduleFilter('today'));
    }
  };

  const getActiveIndex = () => {
    if (!filters.distance && !filters.payout && !filters.schedule) return 0;
    if (filters.distance === '5') return 1;
    if (filters.payout === '500') return 2;
    if (filters.schedule === 'today') return 3;
    return -1;
  };

  const activeIndex = getActiveIndex();

  return (
    <div className="flex flex-wrap gap-3">
      {pills.map((pill, index) => (
        <button
          key={pill}
          onClick={() => handlePillClick(index)}
          className={`
            px-5
            py-3
            rounded-full
            border
            text-sm
            font-medium
            transition-all
            cursor-pointer

            ${
              index === activeIndex
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500'
            }
          `}
        >
          {pill}
        </button>
      ))}
    </div>
  );
}