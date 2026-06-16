'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AddressSelector from '@/components/booking/AddressSelector';
import BookingDetailsForm from '@/components/booking/BookingDetailsForm';
import BookingStepper from '@/components/booking/BookingStepper';
import ConfirmButton from '@/components/booking/ConfirmButton';
import ErrorMessage from '@/components/booking/ErrorMessage';
import TimeSlotSelector from '@/components/booking/TimeSlotSelector';
import { BOOKING_STEPS } from '@/constants/booking/timeSlots';
import { getAddressFromSelection, getAddressSelectionFromSaved } from '@/lib/utils/addressUtils';
import { validateBookingForm } from '@/lib/validation/bookingValidation';
import { useBookingStore } from '@/redux/legacy/bookingStore';
import type { UnifiedBookingPageProps } from '@/types/bookingTypes/bookingForm.types';

export default function UnifiedBookingPage({ service }: UnifiedBookingPageProps) {
  const router = useRouter();

  // Get saved data from store including service-specific data
  const {
    service: savedService,
    serviceSlug: savedServiceSlug,
    servicePrice: savedServicePrice,
    serviceSpecificData,
    name: savedName,
    phone: savedPhone,
    address: savedAddress,
    date: savedDate,
    slot: savedSlot,
    setBooking,
  } = useBookingStore();

  // Use service from store if available, fallback to prop
  const currentService = savedService || service;
  const currentServicePrice = savedServicePrice || 699; // fallback price

  // Initialize address selection from saved data
  const { selectedAddress: initialAddress, newAddress: initialNewAddress } =
    savedAddress ? getAddressSelectionFromSaved(savedAddress) : { selectedAddress: 'home' as const, newAddress: '' };

  // Form state
  const [name, setName] = useState(savedName || '');
  const [phone, setPhone] = useState(savedPhone || '');
  const [instructions, setInstructions] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<'home' | 'office' | 'new'>(initialAddress);
  const [newAddress, setNewAddress] = useState(initialNewAddress);
  const [date, setDate] = useState(savedDate || '');
  const [slot, setSlot] = useState(savedSlot || '');
  const [error, setError] = useState('');

  // Calculate active step
  const activeStep = selectedAddress && date && slot ? 2 : selectedAddress ? 1 : 0;

  const handleConfirm = () => {
    setError('');

    // Validate all fields
    const validation = validateBookingForm(name, phone, selectedAddress, newAddress, date, slot);

    if (!validation.isValid) {
      setError(validation.error || 'Please check all fields');
      return;
    }

    const addressToSave = getAddressFromSelection(selectedAddress, newAddress);

    // Save all data to Zustand store
    setBooking({
      service: currentService,
      serviceSlug: savedServiceSlug,
      servicePrice: currentServicePrice,
      serviceSpecificData,
      name: name.trim(),
      phone: phone.trim(),
      address: addressToSave,
      date,
      slot,
      instructions: instructions.trim(),
    });
    router.push('/booking/summary');
  };

  return (
    <section className="bg-[#F7F2E8] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="py-4">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Complete Your Booking</h1>
          </div>

          <BookingStepper steps={BOOKING_STEPS} activeStep={activeStep} />

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
              {/* Step 1: Select Address */}
              <AddressSelector
                selectedAddress={selectedAddress}
                newAddress={newAddress}
                onAddressSelect={setSelectedAddress}
                onNewAddressChange={setNewAddress}
              />

              {/* Step 2: Select Date & Time */}
              <div className="space-y-8">
                <TimeSlotSelector
                  date={date}
                  slot={slot}
                  onDateChange={setDate}
                  onSlotSelect={setSlot}
                />
              </div>
            </div>

            {/* Step 3: Book Service */}
            <BookingDetailsForm
              service={currentService}
              servicePrice={currentServicePrice}
              serviceSpecificData={serviceSpecificData}
              name={name}
              phone={phone}
              instructions={instructions}
              onNameChange={setName}
              onPhoneChange={setPhone}
              onInstructionsChange={setInstructions}
            />

            {/* Error Message */}
            <ErrorMessage message={error} />

            {/* Confirm Button */}
            <ConfirmButton onClick={handleConfirm} />
          </div>
        </div>
      </div>
    </section>
  );
}
