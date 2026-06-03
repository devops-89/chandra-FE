'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useBookingStore } from '@/store/bookingStore';

const TIME_SLOTS = {
  morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
  afternoon: ['01:00 PM', '02:00 PM', '03:00 PM'],
  evening: ['05:00 PM', '06:00 PM', '07:00 PM'],
};

export default function SlotSelection() {
  const router = useRouter();

  const {
    date: savedDate,
    slot: savedSlot,
    setBooking,
  } = useBookingStore();

  const [date, setDate] = useState(savedDate || '');
  const [slot, setSlot] = useState(savedSlot || '');
  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');

    if (!date) {
      return setError('Please select a date');
    }

    if (!slot) {
      return setError('Please select a time slot');
    }

    setBooking({
      date,
      slot,
    });

    router.push('/booking/summary');
  };

  const renderSlots = (
    title: string,
    slots: string[]
  ) => (
    <div className="mt-8">
      <h3 className="mb-4 text-xl font-semibold text-slate-800">
        {title}
      </h3>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 ">
        {slots.map((time) => {
          const selected = slot === time;

          return (
            <button
              key={time}
              type="button"
              onClick={() => setSlot(time)}
              className={`
                rounded-2xl
                border
                px-4
                py-4
                text-sm
                font-medium
                transition-all
                duration-300

                ${
                  selected
                    ? `
                      border-emerald-600
                      bg-emerald-600
                      text-white
                    `
                    : `
                      border-slate-200
                      bg-white
                      text-slate-700
                      hover:border-emerald-400
                    `
                }
              `}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="bg-[#F7F2E8] py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div
          className="
            rounded-[32px]
            bg-white
            p-6
            shadow-xl
            md:p-10
          "
        >
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Select Date & Time
          </h1>

          <p className="mt-3 text-slate-500">
            Choose your preferred service date and time slot.
          </p>

          <div className="mt-8">
            <label
              htmlFor="booking-date"
              className="mb-3 block font-medium text-slate-700"
            >
              Service Date
            </label>

            <input
              id="booking-date"
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                text-slate-950
                border-slate-300
                p-4
                outline-none
                focus:border-emerald-500
              "
            />
          </div>

          {renderSlots(
            'Morning',
            TIME_SLOTS.morning
          )}

          {renderSlots(
            'Afternoon',
            TIME_SLOTS.afternoon
          )}

          {renderSlots(
            'Evening',
            TIME_SLOTS.evening
          )}

          {error && (
            <p className="mt-6 text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleContinue}
            className="
              mt-10
              w-full
              rounded-full
              bg-emerald-600
              px-8
              py-4
              text-lg
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-emerald-700
            "
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}