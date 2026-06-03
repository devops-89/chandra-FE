'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useBookingStore } from '@/store/bookingStore';
import type { BookingFormProps } from '@/types/booking.types';

export default function BookingForm({
  service,
}: BookingFormProps) {
  const router = useRouter();
  const { name: savedName, phone: savedPhone, setBooking } = useBookingStore();

  const [name, setName] = useState(savedName || '');
  const [phone, setPhone] = useState(savedPhone || '');
  const [date, setDate] = useState('');
  const [instructions, setInstructions] =
    useState('');

  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');

    if (!name.trim()) {
      return setError('Name is required');
    }

    if (!phone.trim()) {
      return setError('Phone number is required');
    }

    if (!/^\d{10}$/.test(phone)) {
      return setError(
        'Enter valid 10 digit phone number'
      );
    }

    if (!date) {
      return setError(
        'Please select preferred date'
      );
    }

    // Save data to Zustand store
    setBooking({
      service,
      name: name.trim(),
      phone: phone.trim(),
    });

    router.push('/booking/address');
  };

  return (
    <section className="py-20">
      <div
        className="
          mx-auto
          max-w-3xl
          rounded-[32px]
          bg-white
          p-8
          shadow-xl
        "
      >
        <h1
          className="
            text-4xl
            font-bold
            text-slate-900
          "
        >
          Book Service
        </h1>

        <p className="mt-3 text-slate-500">
          Selected Service:
          <span className="ml-2 font-semibold">
            {service}
          </span>
        </p>

        <div className="mt-8 flex flex-col gap-5">
          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Full Name"
            className="
              rounded-xl
              border
              p-4
            "
          />

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="Phone Number"
            className="
              rounded-xl
              border
              p-4
            "
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="
              rounded-xl
              border
              p-4
            "
          />

          <textarea
            rows={4}
            value={instructions}
            onChange={(e) =>
              setInstructions(
                e.target.value
              )
            }
            placeholder="Special Instructions"
            className="
              rounded-xl
              border
              p-4
            "
          />

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleContinue}
            className="
              rounded-full
              bg-emerald-600
              px-8
              py-4
              font-semibold
              text-white
            "
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}