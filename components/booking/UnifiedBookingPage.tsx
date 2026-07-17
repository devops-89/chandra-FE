'use client';

import { CreditCard, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import AddressSelector from '@/components/booking/AddressSelector';
import BookingDetailsForm from '@/components/booking/BookingDetailsForm';
import BookingStepper from '@/components/booking/BookingStepper';
import type { SpecFormValue } from '@/components/booking/DynamicForm';
// ConfirmButton is kept for backward compat elsewhere; nav uses inline button on last step
import DynamicForm from '@/components/booking/DynamicForm';
import ErrorMessage from '@/components/booking/ErrorMessage';
import TimeSlotSelector from '@/components/booking/TimeSlotSelector';
import { BOOKING_STEPS } from '@/constants/booking/timeSlots';
import { validateBookingForm, validateDateTime } from '@/lib/validation/bookingValidation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useBookingStore } from '@/redux/legacy/bookingStore';
import {  fetchCustomerAddresses } from '@/redux/slices/customerProfileSlice';
import { createTokenPaymentLink } from '@/redux/slices/customerTokenPaymentSlice';
import { fetchServiceById } from '@/redux/slices/servicesSlice';
import type { UnifiedBookingPageProps } from '@/types/bookingTypes/bookingForm.types';
import type { Address } from '@/types/customer/profile.types';
import type { BookingFormData } from '@/types/services.types';

// ─── Step indices ─────────────────────────────────────────────────────────────
const STEP_DYNAMIC_FORM  = 0;
const STEP_ADDRESS       = 1;
const STEP_DATETIME      = 2;
const STEP_DETAILS       = 3;

export default function UnifiedBookingPage({ service, serviceId, summaryPath = '/booking/summary' }: UnifiedBookingPageProps) {
  const router   = useRouter();
  const dispatch = useAppDispatch();

  // ── Booking store ─────────────────────────────────────────────────────────
  const {
    service: savedService,
    serviceId: savedServiceId,
    serviceSlug: savedServiceSlug,
    servicePrice: savedServicePrice,
    serviceSpecificData: savedServiceSpecificData,
    customerAddressId: savedCustomerAddressId,
    customerAddress: savedCustomerAddress,
    name: savedName,
    phone: savedPhone,
    date: savedDate,
    slot: savedSlot,
    setBooking,
  } = useBookingStore();

  const currentService      = savedService    || service;
  const currentServiceId    = savedServiceId  ?? serviceId ?? null;
  // ── Redux: service specs ──────────────────────────────────────────────────
  // Reuse already loaded service if available; fetch only when missing.
  const { items: allServices, selectedService } = useAppSelector((s) => s.services);
  const profile = useAppSelector((s) => s.customerProfile.profile);

  const serviceFromItems = currentServiceId
    ? allServices.find((s) => s.id === currentServiceId) ?? null
    : null;

  const resolvedService = selectedService?.id === currentServiceId
    ? selectedService
    : serviceFromItems;
  const specifications  = resolvedService?.specifications ?? [];
  const currentServicePrice = savedServicePrice || resolvedService?.price || 0;

  useEffect(() => {
    if (!currentServiceId) return;
    // Only fetch if the service is not yet available
    if (!resolvedService || resolvedService.id !== currentServiceId) {
      dispatch(fetchServiceById(currentServiceId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentServiceId]);

  // ── Fetch customer profile (needed for address list in step 1) ────────────
  useEffect(() => {
  dispatch(fetchCustomerAddresses());
  }, [dispatch]);

  // ── Step state ────────────────────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState(STEP_DYNAMIC_FORM);

  // ── Step 0: Dynamic form data ─────────────────────────────────────────────
  const [specFormData, setSpecFormData] = useState<Record<number, SpecFormValue>>(
    savedServiceSpecificData as Record<number, SpecFormValue>
  );
  const [specErrors, setSpecErrors] = useState<Record<string, string>>({});

  const handleSpecChange = (specificationId: number, value: SpecFormValue) => {
    setSpecFormData((prev) => ({ ...prev, [specificationId]: value }));
    // Clear error on change
    setSpecErrors((prev) => {
      const key = specificationId.toString();

      if (!prev[key]) return prev;

      const next = { ...prev };

      delete next[key];

      return next;
    });
  };

  // ── Step 1: Address ───────────────────────────────────────────────────────
  const [selectedAddressId, setSelectedAddressId] =
  useState<number | null>(savedCustomerAddressId);

  // ── Step 2: Date & time ───────────────────────────────────────────────────
  const [date, setDate] = useState(savedDate || '');
  const [slot, setSlot] = useState(savedSlot || '');

  // ── Step 3: Personal details (auto-filled from logged-in profile) ──────────
  const profileFullName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim()
    : '';
  const profilePhone = profile?.phone ?? '';

  const [name, setName]                 = useState(savedName || profileFullName);
  const [phone, setPhone]               = useState(savedPhone || profilePhone);
  const [instructions, setInstructions] = useState('');

  // Keep name/phone in sync when profile arrives (first load)
  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!name) setName(`${profile.firstName} ${profile.lastName}`.trim());
      if (!phone) setPhone(profile.phone);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  // ── Global error ──────────────────────────────────────────────────────────
  const [error, setError] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // ── Validation helpers ────────────────────────────────────────────────────
  const validateSpecifications = (): boolean => {
    const newErrors: Record<string, string> = {};

    for (const spec of specifications) {
      const value = specFormData[spec.id];

      if (spec.type === 'image') continue;

      if (!spec.isRequired) continue;

      if (value === undefined || value === null || value === '') {
        newErrors[spec.name] = `${spec.name} is required`;
        continue;
      }

      // Validate select: selected value must exist in spec.values
      if (spec.type === 'select') {
        if (!spec.values?.includes(value as string)) {
          newErrors[spec.name] = `Please select a valid option for ${spec.name}`;
        }
      }

      // Validate number: must be a valid positive number
      if (spec.type === 'number') {
        const num = Number(value);
        if (isNaN(num) || num <= 0) {
          newErrors[spec.name] = `${spec.name} must be a positive number`;
        }
      }

      // Validate text / textarea: must not be blank
      if ((spec.type === 'text' ) && typeof value === 'string' && !value.trim()) {
        newErrors[spec.name] = `${spec.name} is required`;
      }
    }

    setSpecErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Navigation handlers ───────────────────────────────────────────────────
  const buildAddressSnapshot = (address: Address) => ({
    id: address.id,
    fullAddress: address.fullAddress,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    label: address.label,
  });

  const handleAddressSelect = (addressId: number) => {
    const selectedAddress = profile?.addresses.find(
      (address) => address.id === addressId
    );

    setSelectedAddressId(addressId);
    setBooking({
      customerAddressId: addressId,
      customerAddress: selectedAddress
        ? buildAddressSnapshot(selectedAddress)
        : savedCustomerAddress,
    });
  };

  const handleNext = () => {
    setError('');

    if (currentStep === STEP_DYNAMIC_FORM) {
      if (!validateSpecifications()) {
        setError('Please fill in all required fields before continuing.');
        return;
      }
      // Persist spec data to store
      setBooking({ serviceSpecificData: specFormData as BookingFormData });
      setCurrentStep(STEP_ADDRESS);
      return;
    }

    if (currentStep === STEP_ADDRESS) {
      if (!selectedAddressId) {
        setError('Please select an address.');
        return;
      }
      const addressBelongsToCustomer =
        profile?.addresses.some(
          (address) => address.id === selectedAddressId
        ) || savedCustomerAddress?.id === selectedAddressId;

      if (!addressBelongsToCustomer) {
        setError('Please select a valid address for this customer.');
        return;
      }
      const selectedAddress = profile?.addresses.find(
        (address) => address.id === selectedAddressId
      );

      setBooking({
        customerAddressId: selectedAddressId,
        customerAddress: selectedAddress
          ? buildAddressSnapshot(selectedAddress)
          : savedCustomerAddress,
      });
      setCurrentStep(STEP_DATETIME);
      return;
    }

    if (currentStep === STEP_DATETIME) {
      const result = validateDateTime(date, slot);
      if (!result.isValid) { setError(result.error ?? 'Please complete the date & time step.'); return; }
      setCurrentStep(STEP_DETAILS);
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > STEP_DYNAMIC_FORM) setCurrentStep((s) => s - 1);
  };

  const handleConfirm = () => {
    setError('');

    const validation = validateBookingForm(
      name,
      phone,
      date,
      slot
    );
    if (!validation.isValid) {
      setError(validation.error || 'Please check all fields');
      return;
    }
    const addressBelongsToCustomer =
      profile?.addresses.some(
        (address) => address.id === selectedAddressId
      ) || savedCustomerAddress?.id === selectedAddressId;

    if (!selectedAddressId || !addressBelongsToCustomer) {
      setError('Please select a valid address for this customer.');
      return;
    }

    const serviceSpecifications = specifications
      .filter((spec) => spec.type !== 'image')
      .flatMap((spec) => {
        const value = specFormData[spec.id];

        if (
          value === null ||
          value === undefined ||
          value instanceof File ||
          value === ''
        ) {
          return [];
        }

        return [{
          specificationId: spec.id,
          value: value as string | number,
        }];
      });
    setBooking({
      service:             currentService,
      serviceId:           currentServiceId,
      serviceSlug:         savedServiceSlug,
      servicePrice:        currentServicePrice,
      serviceSpecificData: specFormData as BookingFormData,
      name:                name.trim(),
      phone:               phone.trim(),
      customerAddressId:   selectedAddressId,
      customerAddress:     savedCustomerAddress,
      serviceSpecifications,
      date,
      slot,
      instructions:        instructions.trim(),
    });
    setIsPaymentModalOpen(true);
  };

  const isLastStep = currentStep === STEP_DETAILS;

  return (
    <section className="bg-white py-4 md:py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="sticky top-0 z-30 bg-white py-4">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Complete Your Booking</h1>
          </div>

          <BookingStepper steps={BOOKING_STEPS} activeStep={currentStep} />

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl md:p-8 lg:p-10">

            {/* ── Step 0: Dynamic Form ───────────────────────────────── */}
            {currentStep === STEP_DYNAMIC_FORM && (
              <DynamicForm
                specifications={specifications}
                formData={specFormData}
                onChange={handleSpecChange}
                errors={specErrors}
              />
            )}

            {/* ── Step 1: Address ────────────────────────────────────── */}
            {currentStep === STEP_ADDRESS && (
              <AddressSelector
                selectedAddressId={selectedAddressId}
                onAddressSelect={handleAddressSelect}
              />
            )}

            {/* ── Step 2: Date & Time ────────────────────────────────── */}
            {currentStep === STEP_DATETIME && (
              <TimeSlotSelector
                date={date}
                slot={slot}
                onDateChange={setDate}
                onSlotSelect={setSlot}
              />
            )}

            {/* ── Step 3: Details ────────────────────────────────────── */}
            {currentStep === STEP_DETAILS && (
              <BookingDetailsForm
                service={currentService}
                servicePrice={currentServicePrice}
                serviceSpecificData={specFormData as BookingFormData}
                specifications={specifications}
                name={name}
                phone={phone}
                instructions={instructions}
                onNameChange={setName}
                onPhoneChange={setPhone}
                onInstructionsChange={setInstructions}
              />
            )}

            {/* ── Error Message ──────────────────────────────────────── */}
            <ErrorMessage message={error} />

            {/* ── Step Navigation ────────────────────────────────────── */}
            <div className={`mt-10 flex items-center ${currentStep > 0 ? 'justify-between' : 'justify-end'}`}>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-full border-2 border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 transition-all duration-300 hover:border-emerald-500 hover:text-emerald-700 cursor-pointer active:scale-95"
                >
                  Back
                </button>
              )}

              {isLastStep ? (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Confirm Booking
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  Next
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <TokenPaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={() => {
          setIsPaymentModalOpen(false);
          router.push(summaryPath);
        }}
        service={currentService}
        date={date}
        slot={slot}
      />
    </section>
  );
}

interface TokenPaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  service: string;
  date: string;
  slot: string;
}

function TokenPaymentModal({
  open,
  onClose,
  onSuccess,
  service,
  date,
  slot,
}: TokenPaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentSimulated, setPaymentSimulated] = useState(false);
  const dispatch = useAppDispatch();

  if (!open) return null;

  const handleGeneratePaymentLink = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dispatch(
        createTokenPaymentLink(),
      ).unwrap();

      if (!data.paymentLink) {
        throw new Error('Payment link not received from the server.');
      }

      window.location.href = data.paymentLink;
    } catch (err: unknown) {
      console.error('Backend payment API failed:', err);
      const errMsg = err instanceof Error ? err.message : 'Failed to generate payment link. Please try again.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 scale-100 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Secure Token Payment
              </h2>
              <p className="text-xs text-slate-500">
                Amount: ₹200.00
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          <p className="text-sm text-slate-600">
            A token payment of ₹200 is required to secure your booking slot for <strong>{service || 'this service'}</strong> on <strong>{date}</strong> at <strong>{slot}</strong>.
          </p>

          {!paymentLink ? (
            <button
              type="button"
              onClick={handleGeneratePaymentLink}
              disabled={isLoading}
              className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? 'Generating Link...' : 'Generate Payment Link'}
            </button>
          ) : (
            <div className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 text-center">
              <p className="text-xs font-medium text-emerald-800">
                Payment Link generated successfully!
              </p>
              <div className="flex gap-2">
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPaymentSimulated(true)}
                  className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-center text-xs font-semibold text-white transition-all hover:bg-emerald-700"
                >
                  Open Link
                </a>
                <button
                  type="button"
                  onClick={() => setPaymentSimulated(true)}
                  className="flex-1 rounded-lg border border-emerald-300 bg-white py-2.5 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-50 cursor-pointer"
                >
                  Simulate Success
                </button>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 p-2.5 text-center text-xs font-medium text-red-600">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          {(paymentLink || paymentSimulated) && (
            <button
              type="button"
              onClick={onSuccess}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Confirm & Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


