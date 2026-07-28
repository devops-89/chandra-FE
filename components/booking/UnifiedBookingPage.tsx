'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
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
import { fetchCustomerAddresses } from '@/redux/slices/customerProfileSlice';
import { fetchServiceById, fetchServices } from '@/redux/slices/servicesSlice';
import type { UnifiedBookingPageProps } from '@/types/bookingTypes/bookingForm.types';
import type { Address } from '@/types/customer/profile.types';
import type { BookingFormData } from '@/types/services.types';

// ─── Step indices ─────────────────────────────────────────────────────────────
const STEP_DYNAMIC_FORM = 0;
const STEP_ADDRESS = 1;
const STEP_DATETIME = 2;
const STEP_DETAILS = 3;

export default function UnifiedBookingPage({
  service,
  serviceId,
  summaryPath = '/booking/summary',
  variant = 'public',
}: UnifiedBookingPageProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // ── Booking store ─────────────────────────────────────────────────────────
  const {
    service: savedService,
    serviceId: savedServiceId,
    serviceSlug: savedServiceSlug,
    servicePrice: savedServicePrice,
    serviceSpecificData: savedServiceSpecificData,
    customerAddressId: savedCustomerAddressId,
    date: savedDate,
    slot: savedSlot,
    setBooking,
  } = useBookingStore();

  const currentService = savedService || service;

  // ── Redux: service specs ──────────────────────────────────────────────────
  // Reuse already loaded service if available; fetch only when missing.
  const { items: allServices, selectedService } = useAppSelector((s) => s.services);
  const rawProfile = useAppSelector((s) => s.customerProfile.profile);
  const authUser = useAppSelector((s) => s.auth.user);
  const profile =
    rawProfile && (!authUser?.id || rawProfile.id === authUser.id)
      ? rawProfile
      : null;

  // Slugify helper to match url/prop slug to backend service name
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const matchedService = allServices.find(
    (s) => slugify(s.name) === slugify(currentService)
  );

  const currentServiceId = savedServiceId ?? serviceId ?? matchedService?.id ?? null;

  const serviceFromItems = currentServiceId
    ? allServices.find((s) => s.id === currentServiceId) ?? null
    : null;

  const resolvedService = selectedService?.id === currentServiceId
    ? selectedService
    : serviceFromItems;
  const specifications = resolvedService?.specifications ?? [];
  const currentServicePrice = savedServicePrice || resolvedService?.price || 0;

  // Fetch all services on mount if list is empty to resolve currentServiceId via name/slug
  useEffect(() => {
    if (allServices.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, allServices.length]);

  useEffect(() => {
    if (!currentServiceId) return;
    // Only fetch if the service is not yet available
    if (!resolvedService || resolvedService.id !== currentServiceId) {
      dispatch(fetchServiceById(currentServiceId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentServiceId, resolvedService]);

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
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
    : `${authUser?.firstName ?? ''} ${authUser?.lastName ?? ''}`.trim();
  const profilePhone = profile?.phone ?? authUser?.phone ?? '';

  const name = profileFullName;
  const phone = profilePhone;
  const [instructions, setInstructions] = useState('');

  // ── Global error ──────────────────────────────────────────────────────────
  const [error, setError] = useState('');

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
      if ((spec.type === 'text') && typeof value === 'string' && !value.trim()) {
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
        : null,
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
      const selectedAddress = profile?.addresses.find(
        (address) => address.id === selectedAddressId
      );

      if (!selectedAddress) {
        setError('Please select a valid address for this customer.');
        return;
      }

      setBooking({
        customerAddressId: selectedAddressId,
        customerAddress: buildAddressSnapshot(selectedAddress),
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
    const selectedAddress = profile?.addresses.find(
      (address) => address.id === selectedAddressId
    );

    if (!selectedAddressId || !selectedAddress) {
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
      service: currentService,
      serviceId: currentServiceId,
      serviceSlug: savedServiceSlug,
      servicePrice: currentServicePrice,
      serviceSpecificData: specFormData as BookingFormData,
      name: name.trim(),
      phone: phone.trim(),
      customerAddressId: selectedAddressId,
      customerAddress: buildAddressSnapshot(selectedAddress),
      serviceSpecifications,
      date,
      slot,
      instructions: instructions.trim(),
    });
    router.push(summaryPath);
  };

  const isLastStep = currentStep === STEP_DETAILS;
  const useDashboardBookingLayout = variant === 'dashboard';
  const activeStepLabel = BOOKING_STEPS[currentStep] ?? '';

  if (useDashboardBookingLayout) {
    return (
      <section className="w-full py-4 md:py-2">
        <div className="w-full">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Complete Your Booking
              </h1>
              {currentService && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-500">
                    Selected Service:
                  </span>
                  <span className="text-sm font-semibold text-slate-900 capitalize">
                    {currentService.replace(/-/g, ' ')}
                  </span>
                </div>
              )}
            </div>

            <div className="mx-auto inline-flex h-10 w-fit items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-900 shadow-xs sm:mx-0">
              {activeStepLabel}
            </div>
          </div>

          <div className="mt-8 w-full">
            {currentStep === STEP_DYNAMIC_FORM && (
              <DynamicForm
                specifications={specifications}
                formData={specFormData}
                onChange={handleSpecChange}
                errors={specErrors}
                layout="dashboard"
              />
            )}

            {currentStep === STEP_ADDRESS && (
              <AddressSelector
                selectedAddressId={selectedAddressId}
                onAddressSelect={handleAddressSelect}
                layout="dashboard"
              />
            )}

            {currentStep === STEP_DATETIME && (
              <TimeSlotSelector
                date={date}
                slot={slot}
                onDateChange={setDate}
                onSlotSelect={setSlot}
                layout="dashboard"
              />
            )}

            {currentStep === STEP_DETAILS && (
              <BookingDetailsForm
                service={currentService}
                servicePrice={currentServicePrice}
                serviceSpecificData={specFormData as BookingFormData}
                specifications={specifications}
                name={name}
                phone={phone}
                instructions={instructions}
                onInstructionsChange={setInstructions}
                layout="dashboard"
              />
            )}

            <ErrorMessage message={error} />

            <div className={`mt-10 flex items-center ${currentStep > 0 ? 'justify-between' : 'justify-end'}`}>
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-300 px-6 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-emerald-500 hover:text-emerald-700 cursor-pointer active:scale-95"
                >
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  Back
                </button>
              )}

              {isLastStep ? (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="inline-flex h-12 min-w-32 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 text-base font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg cursor-pointer active:scale-95"
                >
                  Confirm Booking
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex h-12 min-w-32 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 text-base font-semibold text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg cursor-pointer active:scale-95"
                >
                  Next
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 md:py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="sticky top-0 z-30 bg-white py-4">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Complete Your Booking</h1>
            {currentService && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">Selected Service:</span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-0.5 text-xs sm:text-sm font-semibold text-emerald-750 capitalize border border-emerald-100/80">
                  {currentService.replace(/-/g, ' ')}
                </span>
              </div>
            )}
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
    </section>
  );
}

