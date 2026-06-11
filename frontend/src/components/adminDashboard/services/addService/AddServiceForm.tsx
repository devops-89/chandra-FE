'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Info,
  Send,
  Wrench,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BasicInfoStep from './BasicInfoStep';
import DescriptionStep from './DescriptionStep';
import PricingStep from './PricingStep';
import PublishStep from './PublishStep';
import RequirementsStep from './RequirementsStep';

/* ─── Step Config ────────────────────────────────────────────────── */
const STEPS = [
  { id: 0, label: 'Basic Info',    icon: Info       },
  { id: 1, label: 'Description',  icon: BookOpen   },
  { id: 2, label: 'Pricing',      icon: DollarSign },
  { id: 3, label: 'Requirements', icon: Wrench     },
  { id: 4, label: 'Publish',      icon: Send       },
];

/* ─── Types ──────────────────────────────────────────────────────── */
type FormData = {
  name: string; category: string; subcategory: string;
  description: string; image: File | null;
  pricingType: string; basePrice: string; duration: string;
  skills: string; tools: string; questions: string;
  status: string; cities: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = {
  name: '', category: '', subcategory: '',
  description: '', image: null,
  pricingType: '', basePrice: '', duration: '',
  skills: '', tools: '', questions: '',
  status: '', cities: '',
};

/* ─── Per-step validation rules ─────────────────────────────────── */
function validateStep(step: number, data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (step === 0) {
    if (!data.name.trim())
      errors.name = 'Service name is required.';
    else if (data.name.trim().length < 3)
      errors.name = 'Service name must be at least 3 characters.';

    if (!data.category)
      errors.category = 'Please select a category.';
  }

  if (step === 1) {
    if (!data.description.trim())
      errors.description = 'Description is required.';
    else if (data.description.trim().length < 20)
      errors.description = 'Description must be at least 20 characters.';
  }

  if (step === 2) {
    if (!data.pricingType)
      errors.pricingType = 'Please select a pricing type.';

    if (!data.basePrice)
      errors.basePrice = 'Base price is required.';
    else if (isNaN(Number(data.basePrice)) || Number(data.basePrice) <= 0)
      errors.basePrice = 'Enter a valid price greater than 0.';

    if (!data.duration.trim())
      errors.duration = 'Service duration is required.';
  }

  if (step === 4) {
    if (!data.status)
      errors.status = 'Please select a publish status.';
  }

  return errors;
}

/* ─── Slide animation variants ──────────────────────────────────── */
const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
};

/* ─── Inline field error component ──────────────────────────────── */
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

/* ─── Main form ──────────────────────────────────────────────────── */
export default function AddServiceForm() {
  const router = useRouter();
  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData]           = useState<FormData>(INITIAL);
  const [errors, setErrors]       = useState<FormErrors>({});
  const [touched, setTouched]     = useState(false);  // whether Next was attempted
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string | File | null) => {
    setData((prev) => ({ ...prev, [field]: value }));
    // clear the error for this field as soon as the user edits it
    if (errors[field as keyof FormData]) {
      setErrors((prev) => { const e = { ...prev }; delete e[field as keyof FormData]; return e; });
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

  const handleSubmit = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setTouched(true);
      return;
    }
    console.log('Service submitted:', data);
    setSubmitted(true);
  };

  const hasErrors = touched && Object.keys(errors).length > 0;

  /* ── Success screen ─────────────────────────────────────────── */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-10 w-10 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Service Published!</h2>
          <p className="mt-2 text-slate-500">
            <span className="font-semibold text-slate-700">{data.name}</span> has
            been added to the services catalogue.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setSubmitted(false); setData(INITIAL); setStep(0); setErrors({}); setTouched(false); }}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Add Another
          </button>
          <button
            onClick={() => router.push('/dashboard/admin/services')}
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
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Add New Service</h1>
          <p className="text-slate-500">Fill in the details to publish a service to the catalogue</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/admin/services')}
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
            const Icon  = s.icon;
            const done   = i < step;
            const active = i === step;

            return (
              <div key={s.id} className="flex items-center">
                <button
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
                        : 'bg-slate-100 text-slate-400'
                      }
                    `}
                  >
                    {done ? <Check size={16} strokeWidth={2.5} /> : <Icon size={16} />}
                  </motion.div>
                  <span className={`text-xs font-medium whitespace-nowrap ${
                    active ? 'text-emerald-700' : done ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {s.label}
                  </span>
                </button>

                {i < STEPS.length - 1 && (
                  <div className="mx-1 mb-5 h-0.5 w-8 sm:w-14 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${
                      i < step ? 'w-full bg-emerald-600' : 'w-0'
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
            {(() => { const Icon = STEPS[step].icon; return (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Icon size={18} />
              </div>
            ); })()}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-slate-900">
                Step {step + 1} of {STEPS.length} — {STEPS[step].label}
              </h2>
              <p className="text-xs text-slate-500">
                {step === 0 && 'Service name and category are required to continue.'}
                {step === 1 && 'A description of at least 20 characters is required.'}
                {step === 2 && 'Pricing type, base price, and duration are required.'}
                {step === 3 && 'Skills, tools, and questions are optional.'}
                {step === 4 && 'Select a publish status to complete.'}
              </p>
            </div>
          </div>
        </div>

        {/* Step-level error banner */}
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

        {/* Animated step content */}
        <div className="p-6 min-height:320px">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {step === 0 && (
                <BasicInfoStep
                  data={{ name: data.name, category: data.category, subcategory: data.subcategory }}
                  errors={errors}
                  onChange={update}
                />
              )}
              {step === 1 && (
                <DescriptionStep
                  data={{ description: data.description, image: data.image }}
                  errors={errors}
                  onChange={update}
                />
              )}
              {step === 2 && (
                <PricingStep
                  data={{ pricingType: data.pricingType, basePrice: data.basePrice, duration: data.duration }}
                  errors={errors}
                  onChange={update}
                />
              )}
              {step === 3 && (
                <RequirementsStep
                  data={{ skills: data.skills, tools: data.tools, questions: data.questions }}
                  onChange={update}
                />
              )}
              {step === 4 && (
                <PublishStep
                  data={{ status: data.status, cities: data.cities }}
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
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-5 bg-emerald-600' : i < step ? 'w-1.5 bg-emerald-300' : 'w-1.5 bg-slate-200'
              }`} />
            ))}
          </div>

          {step < STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              <Send size={15} />
              Publish Service
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
