'use client';

import { useEffect, useState } from 'react';

interface TimeSlotSelectorProps {
  date: string;
  slot: string;
  onDateChange: (date: string) => void;
  onSlotSelect: (slot: string) => void;
  layout?: 'default' | 'dashboard';
}

function parseSlot(slot: string) {
  if (!slot) return { hour: '', minute: '', period: 'AM' as 'AM' | 'PM' };
  const [time, period] = slot.trim().split(/\s+/);
  const [h, m] = time.split(':');
  return {
    hour: h || '',
    minute: m || '',
    period: (period === 'PM' ? 'PM' : 'AM') as 'AM' | 'PM',
  };
}

export default function TimeSlotSelector({
  date,
  slot,
  onDateChange,
  onSlotSelect,
  layout = 'default',
}: TimeSlotSelectorProps) {
  const parsed = parseSlot(slot);
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);
  const [period, setPeriod] = useState<'AM' | 'PM'>(parsed.period);

  // Sync local state when the slot prop changes externally
  useEffect(() => {
    const p = parseSlot(slot);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHour(p.hour);
    setMinute(p.minute);
    setPeriod(p.period);
  }, [slot]);

  // Build and emit the slot string whenever inputs change
  useEffect(() => {
    if (hour === '' || minute === '') return;

    const h = Number(hour);
    const m = Number(minute);
    if (Number.isNaN(h) || Number.isNaN(m)) return;
    if (h < 1 || h > 12 || m < 0 || m > 59) return;

    const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
    if (formatted !== slot) {
      onSlotSelect(formatted);
    }
  }, [hour, minute, period, slot, onSlotSelect]);

  const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Backspace') {
    e.preventDefault();

    setHour((prev) => {
      if (!prev) return '';
      return `0${prev[0]}`;
    });

    return;
  }

  if (!/^\d$/.test(e.key)) {
    return;
  }

  e.preventDefault();

  setHour((prev) => {
    const current = (prev || '00').padStart(2, '0');
    return `${current[1]}${e.key}`;
  });
};
  const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Backspace') {
    e.preventDefault();

    setMinute((prev) => {
      if (!prev) return '';
      return `0${prev[0]}`;
    });

    return;
  }

  if (!/^\d$/.test(e.key)) {
    return;
  }

  e.preventDefault();

  setMinute((prev) => {
    const current = (prev || '00').padStart(2, '0');
    return `${current[1]}${e.key}`;
  });
};

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value);
  };

  const isDashboardLayout = layout === 'dashboard';

  return (
    <div className={isDashboardLayout ? 'w-full' : 'border-t border-slate-200 pt-8 lg:border-t-0 lg:pt-0'}>
      {!isDashboardLayout && (
        <h2 className="text-xl font-semibold text-slate-900">Select Date &amp; Time</h2>
      )}
      <p className={isDashboardLayout ? 'text-center text-sm font-medium text-slate-600' : 'mt-2 text-sm text-slate-500'}>
        Choose your preferred service date and time
      </p>

      <div className={isDashboardLayout ? 'mx-auto mt-6 grid w-full max-w-5xl grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2' : ''}>
      {/* Date picker */}
      <div className={isDashboardLayout ? '' : 'mt-6'}>
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

      {/* Time input */}
      <div className={isDashboardLayout ? '' : 'mt-6'}>
        <label className="mb-3 block text-sm font-medium text-slate-700">
          Service Time
        </label>

<div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Hour */}
          <input
            id="booking-hour"
            type="text"
            inputMode="numeric"
            value={hour}
            onKeyDown={handleHourKeyDown}
            onChange={() => {}}
            placeholder="HH"
            maxLength={2}
            className="
              w-14 rounded-xl border-2 border-slate-300 px-2 py-3 text-center text-slate-950 text-sm font-semibold
              outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />

          <span className="text-2xl font-bold text-slate-400 select-none">:</span>

          {/* Minute */}
         <input
            maxLength={2}
            id="booking-minute"
            type="text"
            inputMode="numeric"
            value={minute}
            onKeyDown={handleMinuteKeyDown}
            onChange={() => {}}
            placeholder="MM"
            className="
              w-14 rounded-xl border-2 border-slate-300 px-2 py-3 text-center text-slate-950 text-sm font-semibold
              outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
            "
          />

          {/* AM / PM toggle */}
          <div className="ml-1 sm:ml-2 flex rounded-xl border-2 border-slate-300 overflow-hidden">
            <button
              type="button"
              onClick={() => setPeriod('AM')}
              className={`
                px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold transition-colors duration-200 cursor-pointer
                ${period === 'AM'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-emerald-50'
                }
              `}
            >
              AM
            </button>
            <button
              type="button"
              onClick={() => setPeriod('PM')}
              className={`
                px-3 py-2 sm:px-4 sm:py-3 text-sm font-semibold transition-colors duration-200 cursor-pointer
                ${period === 'PM'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-emerald-50'
                }
              `}
            >
              PM
            </button>
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Enter hour (1–12) and minute (00–59)
        </p>
      </div>
      </div>
    </div>
  );
}
