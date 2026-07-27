'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useBookingStore } from '@/redux/legacy/bookingStore';
import { createBooking } from '@/redux/slices/bookingSlice';

interface BookingSummaryContentProps {
  confirmationPath?: string;
}

function buildScheduledAt(date: string, slot: string) {
  const [year, month, day] = date.split('-').map(Number);
  const [time, modifier] = slot.trim().split(/\s+/);
  const [hourValue, minuteValue] = time.split(':').map(Number);

  let hours = hourValue;

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }

  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  // Construct date in local browser timezone and convert to ISO UTC
  const localDate = new Date(year, month - 1, day, hours, minuteValue);
  return localDate.toISOString();
}

export function BookingSummaryContent({
  confirmationPath = '/booking/confirmation',
}: BookingSummaryContentProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    service,
    serviceId,
    servicePrice,
    customerAddressId,
    customerAddress,
    serviceSpecifications,
    name,
    phone,
    date,
    slot,
    instructions,
  } = useBookingStore();

  const profile = useAppSelector(
    (state) => state.customerProfile.profile
  );

  const isLoading = useAppSelector(
    (state) => state.booking.isLoading
  );

  const [bookingError, setBookingError] = useState<string | null>(null);


  const selectedAddress = customerAddress?.id === customerAddressId
    ? customerAddress
    : profile?.addresses.find(
      (address) => address.id === customerAddressId
    );

  const basePriceFromStore = servicePrice ?? 0;
  const taxes = Math.round(basePriceFromStore * 0.18);
  const total = basePriceFromStore + taxes;

  const handleConfirm = async () => {
  try {
    if (!serviceId) {
      setBookingError('Service not found. Please go back and try again.');
      return;
    }

    if (!customerAddressId) {
      setBookingError('Please select an address before confirming.');
      return;
    }

    if (!selectedAddress) {
      setBookingError('Please select a valid address for this customer.');
      return;
    }

    setBookingError(null);

    const scheduledAt = buildScheduledAt(date, slot);
    const sanitizedSpecifications = serviceSpecifications.filter(
      (specification) =>
        Number.isInteger(specification.specificationId) &&
        specification.value !== undefined &&
        specification.value !== null &&
        specification.value !== ''
    );

    const payload = {
      serviceId,
      customerAddressId,
      isEmergency: false,
      scheduledAt: scheduledAt,
      serviceSpecifications: sanitizedSpecifications,
    };

    if (process.env.NODE_ENV !== 'production') {
      console.warn('Booking Payload:', payload);
    }

    const booking = await dispatch(createBooking(payload)).unwrap();

    if (process.env.NODE_ENV !== 'production') {
      console.warn('API Response:', booking); 
    }

    router.push(confirmationPath);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Backend Error:', error);
    }

    if (typeof error === 'string') {
      setBookingError(error);
    } else if (error instanceof Error) {
      setBookingError(error.message);
    } else {
      setBookingError('Booking failed. Please try again.');
    }
  }
};

  return (
    <section className="bg-white py-4 md:py-4">
      <div className="max-w-full">
        <div className="rounded-4xl bg-white p-6 shadow-xl md:px-10">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Booking Summary
          </h1>

          <p className="mt-3 text-slate-500">
            Please review your booking details before confirmation.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <SummaryItem label="Service" value={service} />

              <SummaryItem
                label="Customer Name"
                value={name}
              />

              <SummaryItem
                label="Phone"
                value={phone}
              />

              <SummaryItem
                label="Address"
                value={
                  selectedAddress
                    ? `${selectedAddress.fullAddress}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`
                    : '-'
                }
              />

              <SummaryItem
                label="Date"
                value={date}
              />

              <SummaryItem
                label="Time Slot"
                value={slot}
              />

              {instructions && (
                <SummaryItem
                  label="Special Instructions"
                  value={instructions}
                />
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Price Details
              </h2>

              <div className="mt-6 space-y-4">
                <PriceRow
                  label="Service Cost"
                  value={`₹${basePriceFromStore}`}
                />

                <PriceRow
                  label="Taxes & Fees"
                  value={`₹${taxes}`}
                />

                <div className="border-t pt-4">
                  <PriceRow
                    label="Total"
                    value={`₹${total}`}
                    isTotal
                  />
                </div>
              </div>

              {bookingError && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {bookingError}
                </p>
              )}

              <button
                type="button"
                disabled={isLoading}
                onClick={handleConfirm}
                className="
                  mt-8
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isLoading
                  ? 'Booking...'
                  : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BookingSummary() {
  return (
    <>
      <PublicNavbar />
      <BookingSummaryContent />
      <PublicFooter />
    </>
  );
}

interface SummaryItemProps {
  label: string;
  value: string;
}

function SummaryItem({
  label,
  value,
}: SummaryItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value || '-'}
      </p>
    </div>
  );
}

interface PriceRowProps {
  label: string;
  value: string;
  isTotal?: boolean;
}

function PriceRow({
  label,
  value,
  isTotal = false,
}: PriceRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={
          isTotal
            ? 'font-bold text-slate-900'
            : 'text-slate-600'
        }
      >
        {label}
      </span>

      <span
        className={
          isTotal
            ? 'text-xl font-bold text-emerald-600'
            : 'font-medium text-slate-900'
        }
      >
        {value}
      </span>
    </div>
  );
}

