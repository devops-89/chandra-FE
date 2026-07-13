'use client';

import { useEffect, useState } from 'react';

interface TimeSlotSelectorProps {
  date: string;
  slot: string;
  onDateChange: (date: string) => void;
  onSlotSelect: (slot: string) => void;
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
}: TimeSlotSelectorProps) {
  const parsed = parseSlot(slot);
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);
  const [period, setPeriod] = useState<'AM' | 'PM'>(parsed.period);

  // Sync local state when the slot prop changes externally
  useEffect(() => {
    const p = parseSlot(slot);
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
  }, [hour, minute, period]);

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    setHour(raw);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMinute(raw);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value);
  };

  return (
    <div className="border-t border-slate-200 pt-8 lg:border-t-0 lg:pt-0">
      <h2 className="text-xl font-semibold text-slate-900">Select Date &amp; Time</h2>
      <p className="mt-2 text-sm text-slate-500">
        Choose your preferred service date and time
      </p>

      {/* Date picker */}
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

      {/* Time input */}
      <div className="mt-6">
        <label className="mb-3 block text-sm font-medium text-slate-700">
          Service Time <span className="text-slate-400 font-normal">(IST)</span>
        </label>

<div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Hour */}
          <input
            id="booking-hour"
            type="text"
            inputMode="numeric"
            value={hour}
            onChange={handleHourChange}
            placeholder="HH"
            maxLength={2}
            className="
              w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-slate-300 p-2 text-center text-slate-950 text-lg font-semibold outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />

          <span className="text-2xl font-bold text-slate-400 select-none">:</span>

          {/* Minute */}
         <input
            maxLength={2}
            id="booking-minute"
            type="text"
            inputMode="numeric"
            value={minute}
            onChange={handleMinuteChange}
            placeholder="MM"
            className="
              w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-slate-300 p-2 text-center text-slate-950 text-lg font-semibold
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
  );
}