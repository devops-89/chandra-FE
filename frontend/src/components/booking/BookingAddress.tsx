'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useBookingStore } from '@/store/bookingStore';

export default function BookingAddress() {
  const router = useRouter();
  const { address: savedAddress, setBooking } = useBookingStore();

  const [selectedAddress, setSelectedAddress] =
    useState(() => {
      if (savedAddress) {
        if (savedAddress === '123 Main Street, Delhi') return 'home';
        if (savedAddress === 'Sector 62, Noida') return 'office';
        return 'new';
      }
      return 'home';
    });

  const [newAddress, setNewAddress] =
    useState(() => {
      if (savedAddress && 
          savedAddress !== '123 Main Street, Delhi' && 
          savedAddress !== 'Sector 62, Noida') {
        return savedAddress;
      }
      return '';
    });

  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');

    let addressToSave = '';

    if (selectedAddress === 'home') {
      addressToSave = '123 Main Street, Delhi';
    } else if (selectedAddress === 'office') {
      addressToSave = 'Sector 62, Noida';
    } else if (selectedAddress === 'new') {
      if (!newAddress.trim()) {
        return setError('Please enter address');
      }
      addressToSave = newAddress.trim();
    }

    // Save address to Zustand store
    setBooking({
      address: addressToSave,
    });

    router.push('/booking/slot');
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
          Select Address
        </h1>

        <div className="mt-8 space-y-4">
          <label
            className="
              flex
              cursor-pointer
              text-slate-950
              items-center
              gap-3
              rounded-xl
              border
              p-4
            "
          >
            <input
              type="radio"
              name="address"
              checked={
                selectedAddress === 'home'
              }
              onChange={() =>
                setSelectedAddress('home')
              }
            />

            <span>
              Home Address
              <br />
              123 Main Street, Delhi
            </span>
          </label>

          <label
            className="
              flex
              cursor-pointer
              items-center
              text-slate-950
              gap-3
              rounded-xl
              border
              p-4
            "
          >
            <input
              type="radio"
              name="address"
              checked={
                selectedAddress === 'office'
              }
              onChange={() =>
                setSelectedAddress(
                  'office'
                )
              }
            />

            <span>
              Office Address
              <br />
              Sector 62, Noida
            </span>
          </label>

          <label
            className="
              flex
              cursor-pointer
              items-center
              text-slate-950
              gap-3
              rounded-xl
              border
              p-4
            "
          >
            <input
              type="radio"
              name="address"
              checked={
                selectedAddress === 'new'
              }
              onChange={() =>
                setSelectedAddress('new')
              }
            />

            <span>Add New Address</span>
          </label>

          {selectedAddress === 'new' && (
            <textarea
              rows={4}
              value={newAddress}
              onChange={(e) =>
                setNewAddress(
                  e.target.value
                )
              }
              placeholder="Enter Address"
              className="
                w-full
                rounded-xl
                text-slate-950
                border
                p-4
              "
            />
          )}
        </div>

        {error && (
          <p className="mt-4 text-red-500">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleContinue}
          className="
            mt-8
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
    </section>
  );
}