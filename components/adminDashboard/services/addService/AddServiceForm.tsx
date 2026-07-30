'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  DollarSign,
  Info,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { createService } from '@/redux/slices/servicesSlice';

import BasicInfoStep from './BasicInfoStep';
import PricingStep from './PricingStep';
import SpecificationsStep from './SpecificationsStep';

/* â”€â”€â”€ Step Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const STEPS = [
  { id: 0, label: 'Service Info', icon: Info },
  { id: 1, label: 'Specifications', icon: ClipboardList },
  { id: 2, label: 'Pricing', icon: DollarSign },
];

const STEP_SUBTITLES = [
  'Service name, description, icon and active toggle are required.',
  'Configure booking specifications for customers.',
  'Configure all fare components for this service.',
];

export type SpecFieldType =
  | 'text'
  | 'number'
  | 'select'
  | 'image';

export interface Specification {
  id: string | number;
  name: string;
  type: SpecFieldType;
  isRequired: boolean;
  values: string[];
}

/* â”€â”€â”€ Master form state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export type FormData = {
  // Step 1 â€” Service Info
  // Step 1 — Service Info
  name: string;
  description: string;
  icon: File | null;
  isActive: boolean;
  specifications: Specification[];

  // Step 2 — Pricing
  serviceBasePrice: string;
  isServiceBasePriceApplied: boolean;
  platformFee: string;
  isPlatformFeeApplied: boolean;
  gst: string;
  isGstApplied: boolean;
};

export type FormErrors = Partial<Record<string, string>>;

const INITIAL: FormData = {
  name: '',
  description: '',
  icon: null,
  isActive: true,
  specifications: [],
  serviceBasePrice: '',
  isServiceBasePriceApplied: true,
  platformFee: '',
  isPlatformFeeApplied: false,
  gst: '',
  isGstApplied: false,
};

/* ────────────────────────────────────────────────────────────────────────── */
function validateStep(step: number, data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (step === 0) {
    if (!data.name.trim())
      errors.name = 'Service name is required.';
    else if (data.name.trim().length < 3)
      errors.name = 'Service name must be at least 3 characters.';

    if (!data.description.trim())
      errors.description = 'Description is required.';
    else if (data.description.trim().length < 20)
      errors.description = 'Description must be at least 20 characters.';
  }

  if (step === 1) {
    data.specifications.forEach((spec, index) => {
      if (!spec.name?.trim()) {
        errors[`spec_name_${index}`] =
          'Specification name is required';
      }

      if (
        spec.type === 'select' &&
        (!spec.values || spec.values.length < 2)
      ) {
        errors[`spec_values_${index}`] =
          'Select fields require at least 2 options';
      }
    });
  }

  if (step === 2) {
    if (!data.serviceBasePrice)
      errors.serviceBasePrice = 'Service base price is required.';
    else if (isNaN(Number(data.serviceBasePrice)) || Number(data.serviceBasePrice) < 0)
      errors.serviceBasePrice = 'Enter a valid amount.';

    const numericFields: Array<[keyof FormData, string]> = [
      ['platformFee', 'Platform fee'],
      ['gst', 'GST %'],
    ];
    for (const [field, label] of numericFields) {
      const val = data[field] as string;
      if (val && (isNaN(Number(val)) || Number(val) < 0))
        errors[field] = `${label} must be a valid non-negative number.`;
    }
  }

  return errors;
}

/* â”€â”€â”€ Slide animation variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const variants = {
  enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
};

/* â”€â”€â”€ Inline field error â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
    >
      <AlertCircle size={12} className="shrink-0" />
      {message}
    </motion.p>
  );
}

/* â”€â”€â”€ Main form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function AddServiceForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  /* Update a single field */
  const update = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
    }
  };

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setTouched(false);
    setErrors({});
    setStep(next);
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setTouched(true);
      return;
    }
    goTo(step + 1);
  };

  const handleSubmit = async () => {
    const submitErrors = validateStep(2, data);
    if (Object.keys(submitErrors).length > 0) {
      setErrors(submitErrors);
      setTouched(true);
      return;
    }

    setIsPublishing(true);
    setApiError(null);

    const result = await dispatch(
      createService({
        name: data.name,
        description: data.description,
        icon: data.icon,
        isActive: data.isActive,
        specifications: data.specifications,
        serviceBasePrice: Number(data.serviceBasePrice),
        isServiceBasePriceApplied: data.isServiceBasePriceApplied,
        platformFee: data.platformFee ? Number(data.platformFee) : undefined,
        isPlatformFeeApplied: data.isPlatformFeeApplied,
        gst: data.gst ? Number(data.gst) : undefined,
        isGstApplied: data.isGstApplied,
        isSurgeEnabled: false,
        isDistanceKmApplied: false,
        isWeekendApplied: false,
        isPeakHourApplied: false,
        isEmergencyApplied: false,
        isPerHourRateApplied: false,
      })
    );

    setIsPublishing(false);

    if (createService.rejected.match(result)) {
      setApiError(result.payload ?? 'Something went wrong. Please try again.');
      return;
    }

    // Show success toast, then redirect
    setShowToast(true);
    setSubmitted(true);

    await new Promise((resolve) => setTimeout(resolve, 2500));
    router.push('/admin/services');
  };

  const hasErrors = touched && Object.keys(errors).length > 0;

  /* â”€â”€ Success screen â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center"
      >
        {/* Success toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-lg"
            >
              <Check size={16} strokeWidth={2.5} />
              Service created successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-10 w-10 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Service Published!</h2>
          <p className="mt-2 text-slate-500">
            <span className="font-semibold text-slate-700">{data.name}</span> has
            been added to the services catalogue.
          </p>
          <p className="mt-2 text-slate-500">Redirecting to Servicesâ€¦</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setShowToast(false);
              setData(INITIAL);
              setStep(0);
              setErrors({});
              setTouched(false);
            }}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Add Another
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/services')}
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            View Services
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Create New Service</h1>
          <p className="text-slate-500">Fill in the details to publish a service to the catalogue</p>
        </div>
        <button
          type="button"
          onClick={() => router.push('/admin/services')}
          className="flex items-center gap-2 self-start sm:self-auto rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Services
        </button>
      </div>

      {/* Step indicator */}
      <div className="flex justify-center px-4 py-2">
        <div className="flex min-w-max items-center gap-0">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <div key={s.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => i < step && goTo(i)}
                  disabled={i >= step}
                  className="flex flex-col items-center gap-1.5 px-1 disabled:cursor-default"
                >
                  <motion.div
                    animate={{ scale: active ? 1.08 : 1 }}
                    transition={{ duration: 0.2 }}
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200
                      ${done
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                        : active
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 ring-4 ring-emerald-100'
                          : 'bg-slate-100 text-slate-400'}
                    `}
                  >
                    {done ? <Check size={16} strokeWidth={2.5} /> : <Icon size={16} />}
                  </motion.div>
                  <span className={`text-xs font-medium whitespace-nowrap ${active ? 'text-emerald-700' : done ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                    {s.label}
                  </span>
                </button>

                {i < STEPS.length - 1 && (
                  <div className="mx-1 mb-5 h-0.5 w-8 sm:w-12 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${i < step ? 'w-full bg-emerald-600' : 'w-0'
                      }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

        {/* Card header */}
        <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/60">
          <div className="flex items-start gap-3">
            {(() => {
              const Icon = STEPS[step].icon;
              return (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon size={18} />
                </div>
              );
            })()}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-slate-900">
                Step {step + 1} of {STEPS.length} â€” {STEPS[step].label}
              </h2>
              <p className="text-xs text-slate-500">{STEP_SUBTITLES[step]}</p>
            </div>
          </div>
        </div>

        {/* Step-level validation error banner */}
        <AnimatePresence>
          {hasErrors && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-b border-red-100 bg-red-50 px-6 py-3"
            >
              <p className="flex items-center gap-2 text-sm font-medium text-red-700">
                <AlertCircle size={15} className="shrink-0" />
                Please fill in all required fields before continuing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* API error banner */}
        <AnimatePresence>
          {apiError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-b border-red-100 bg-red-50 px-6 py-3"
            >
              <p className="flex items-center gap-2 text-sm font-medium text-red-700">
                <AlertCircle size={15} className="shrink-0" />
                {apiError}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated step content */}
        <div className="p-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeInOut' as any }} // eslint-disable-line @typescript-eslint/no-explicit-any
            >
              {step === 0 && (
                <BasicInfoStep
                  data={{
                    name: data.name,
                    description: data.description,
                    icon: data.icon,
                    isActive: data.isActive,
                  }}
                  errors={errors}
                  onChange={update}
                />
              )}

              {step === 1 && (
                <SpecificationsStep
                  specifications={data.specifications}
                  onChange={(specifications) =>
                    update('specifications', specifications)
                  }
                  errors={errors}
                />
              )}

              {step === 2 && (
                <PricingStep
                  data={{
                    serviceBasePrice: data.serviceBasePrice,
                    isServiceBasePriceApplied: data.isServiceBasePriceApplied,
                    platformFee: data.platformFee,
                    isPlatformFeeApplied: data.isPlatformFeeApplied,
                    gst: data.gst,
                    isGstApplied: data.isGstApplied,
                  }}
                  errors={errors}
                  onChange={update}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-6 py-4">
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          {/* Progress dots */}
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-5 bg-emerald-600' : i < step ? 'w-1.5 bg-emerald-300' : 'w-1.5 bg-slate-200'
                  }`}
              />
            ))}
          </div>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPublishing}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              <ClipboardList size={16} />
              {isPublishing ? 'Publishingâ€¦' : 'Publish Service'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
