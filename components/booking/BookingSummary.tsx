'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useBookingStore } from '@/redux/legacy/bookingStore';
import { createBooking } from '@/redux/slices/bookingSlice';
import { fetchServiceById, fetchServices } from '@/redux/slices/servicesSlice';

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
    setBooking,
  } = useBookingStore();

  const rawProfile = useAppSelector(
    (state) => state.customerProfile.profile
  );
  const authUser = useAppSelector((state) => state.auth.user);
  const profile =
    rawProfile && (!authUser?.id || rawProfile.id === authUser.id)
      ? rawProfile
      : null;

  const isLoading = useAppSelector(
    (state) => state.booking.isLoading
  );

  const { items: allServices, selectedService } = useAppSelector(
    (state) => state.services
  );

  useEffect(() => {
    if (allServices.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, allServices.length]);

  useEffect(() => {
    if (serviceId && (!selectedService || selectedService.id !== serviceId)) {
      dispatch(fetchServiceById(serviceId));
    }
  }, [dispatch, serviceId, selectedService]);

  const [bookingError, setBookingError] = useState<string | null>(null);

  const selectedAddress = profile
    ? profile.addresses.find((address) => address.id === customerAddressId)
    : customerAddress?.id === customerAddressId
      ? customerAddress
      : null;

  const currentCustomerName = profile
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
    : `${authUser?.firstName ?? ''} ${authUser?.lastName ?? ''}`.trim() || name;
  const currentCustomerPhone = profile?.phone ?? authUser?.phone ?? phone;

  const currentServiceObj =
    (selectedService?.id === serviceId ? selectedService : null) ||
    allServices.find((s) => s.id === serviceId) ||
    selectedService;

  const pricingRule = currentServiceObj?.pricingRule;

  const parsePrice = (val?: string | number | null): number => {
    if (val == null || val === '') return 0;
    const num = typeof val === 'number' ? val : parseFloat(String(val));
    return isNaN(num) ? 0 : num;
  };

  const formatCurrency = (val: number): string => {
    return `₹${val.toFixed(2)}`;
  };

  // Base price (always displayed)
  const basePriceValue = parsePrice(pricingRule?.serviceBasePrice ?? servicePrice);

  const priceRows: { label: string; amount: number }[] = [
    { label: 'Service Base Price', amount: basePriceValue },
  ];

  if (pricingRule?.isPlatformFeeApplied && parsePrice(pricingRule.platformFee) > 0) {
    priceRows.push({
      label: 'Platform Fee',
      amount: parsePrice(pricingRule.platformFee),
    });
  }

  if (pricingRule?.isGstApplied && parsePrice(pricingRule.gst) > 0) {
    priceRows.push({
      label: 'GST',
      amount: parsePrice(pricingRule.gst),
    });
  }

  if (pricingRule?.isEmergencyApplied && parsePrice(pricingRule.emergencyCharge) > 0) {
    priceRows.push({
      label: 'Emergency Charge',
      amount: parsePrice(pricingRule.emergencyCharge),
    });
  }

  if (
    pricingRule?.isDistanceKmApplied &&
    parsePrice(pricingRule.distanceChargePerKm ?? pricingRule.perKmRate) > 0
  ) {
    priceRows.push({
      label: 'Distance Charge',
      amount: parsePrice(pricingRule.distanceChargePerKm ?? pricingRule.perKmRate),
    });
  }

  if (pricingRule?.isPerHourRateApplied && parsePrice(pricingRule.perHourRate) > 0) {
    priceRows.push({
      label: 'Per Hour Charge',
      amount: parsePrice(pricingRule.perHourRate),
    });
  }

  if (pricingRule?.isWeekendApplied && parsePrice(pricingRule.weekendMultiplier) > 0) {
    priceRows.push({
      label: 'Weekend Charge',
      amount: parsePrice(pricingRule.weekendMultiplier),
    });
  }

  if (pricingRule?.isPeakHourApplied && parsePrice(pricingRule.peakHourMultiplier) > 0) {
    priceRows.push({
      label: 'Peak Hour Charge',
      amount: parsePrice(pricingRule.peakHourMultiplier),
    });
  }

  const total = priceRows.reduce((sum, row) => sum + row.amount, 0);

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

      // Explicitly re-persist all fields so localStorage is definitely up-to-date
      // before the confirmation page mounts and reads from the store.
      setBooking({
        service,
        serviceId,
        servicePrice,
        name: currentCustomerName,
        phone: currentCustomerPhone,
        date,
        slot,
        instructions,
      });

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
                value={currentCustomerName}
              />

              <SummaryItem
                label="Phone"
                value={currentCustomerPhone}
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
                {priceRows.map((row) => (
                  <PriceRow
                    key={row.label}
                    label={row.label}
                    value={formatCurrency(row.amount)}
                  />
                ))}

                <div className="border-t border-slate-200 pt-4">
                  <PriceRow
                    label="Total"
                    value={formatCurrency(total)}
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
                  cursor-pointer
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

