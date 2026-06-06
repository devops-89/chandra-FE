'use client';

import { TIME_SLOTS } from '@/constants/booking/timeSlots';

interface TimeSlotSelectorProps {
  date: string;
  slot: string;
  onDateChange: (date: string) => void;
  onSlotSelect: (slot: string) => void;
}

export default function TimeSlotSelector({
  date,
  slot,
  onDateChange,
  onSlotSelect,
}: TimeSlotSelectorProps) {
  const handleSlotClick = (e: React.MouseEvent, selectedSlot: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSlotSelect(selectedSlot);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    onDateChange(selectedDate);
  };

  const renderSlots = (title: string, slots: string[]) => (
    <div className="mt-6">
      <h4 className="mb-3 text-sm font-semibold text-slate-700">{title}</h4>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
        {slots.map((time) => {
          const selected = slot === time;

          return (
            <button
              key={time}
              type="button"
              onClick={(e) => handleSlotClick(e, time)}
              className={`
                rounded-lg border-2 px-3 py-2 text-xs font-medium transition-all duration-200 cursor-pointer
                ${
                  selected
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50'
                }
              `}
              style={{ zIndex: 10, position: 'relative' }}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="border-t border-slate-200 pt-8 lg:border-t-0 lg:pt-0">
      <h2 className="text-xl font-semibold text-slate-900">Select Date & Time</h2>
      <p className="mt-2 text-sm text-slate-500">
        Choose your preferred service date and time slot
      </p>

      <div className="mt-6">
        <label
          htmlFor="booking-date"
          className="mb-3 block text-sm font-medium text-slate-700"
        >
          Service Date
        </label>

        <input
          id="booking-date"
          type="date"
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={handleDateChange}
          className="
            w-full rounded-xl border-2 border-slate-300 p-4 text-slate-950 outline-none 
            transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
          "
        />
      </div>

      <div className="mt-6">
        <h4 className="mb-4 text-sm font-semibold text-slate-700">Available Time Slots</h4>

        {TIME_SLOTS.morning && renderSlots('Morning', TIME_SLOTS.morning)}
        {TIME_SLOTS.afternoon && renderSlots('Afternoon', TIME_SLOTS.afternoon)}
        {TIME_SLOTS.evening && renderSlots('Evening', TIME_SLOTS.evening)}
      </div>
    </div>
  );
}