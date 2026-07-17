'use client';

import type { BookingFormData } from '@/types/services.types';

interface Specification {
  id: number;
  name: string;
  type: 'text' | 'number' | 'select' | 'image';
  isRequired: boolean;
  values?: string[];
}

interface BookingDetailsFormProps {
  service: string;
  servicePrice: number;
  serviceSpecificData?: BookingFormData;
  specifications?: Specification[];
  name: string;
  phone: string;
  instructions: string;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  onInstructionsChange: (instructions: string) => void;
}

export default function BookingDetailsForm({
  service,
  servicePrice,
  serviceSpecificData,
  specifications = [],
  name,
  phone,
  instructions,
  onInstructionsChange,
}: BookingDetailsFormProps) {

  // Build a map of specId -> spec.name for rendering labels
  const specLabelMap = new Map(specifications.map((s) => [s.id, s.name]));

  // Filter out image-type specs and entries with empty values
  const serviceDetails = serviceSpecificData
    ? Object.entries(serviceSpecificData).filter(([key, value]) => {
        const specId = Number(key);
        const spec = specifications.find((s) => s.id === specId);
        // Skip image fields and empty values
        if (spec?.type === 'image') return false;
        if (value === null || value === undefined || value === '') return false;
        return true;
      })
    : [];

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="border border-slate-200 pt-8 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 text-center">Book Service</h2>

          <div className="mt-6 space-y-4">
            {/* ── Full Name (read-only, from logged-in profile) ── */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="
                flex items-center gap-3 w-full rounded-xl border-2 border-slate-200
                bg-slate-50 p-4 text-slate-900
              ">
                {/* User avatar icon */}
                <svg
                  className="h-5 w-5 shrink-0 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span className="font-medium">{name || 'Loading…'}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Auto-filled from your account profile
              </p>
            </div>

            {/* ── Phone Number (read-only, from logged-in profile) ── */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <div className="
                flex items-center gap-3 w-full rounded-xl border-2 border-slate-200
                bg-slate-50 p-4 text-slate-900
              ">
                {/* Phone icon */}
                <svg
                  className="h-5 w-5 shrink-0 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <span className="font-medium">{phone || 'Loading…'}</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Auto-filled from your account profile
              </p>
            </div>

            {/* ── Selected Service Info ── */}
            <div className="mt-2 text-sm text-slate-500 text-center">
              {service && (
                <p className="text-sm text-slate-500 text-center">
                  Selected Service:{' '}
                  <span className="font-semibold text-emerald-600">{service}</span>
                  {servicePrice > 0 && (
                    <>
                      {' '}- <span className="font-semibold text-emerald-600">₹{servicePrice}</span>
                    </>
                  )}
                </p>
              )}

              {/* ── Service Details from Booking Stepper ── */}
              {serviceDetails.length > 0 && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-xl text-left border border-emerald-100">
                  <h4 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    Service Details
                  </h4>
                  <div className="space-y-2">
                    {serviceDetails.map(([key, value]) => {
                      const specId = Number(key);
                      // Use the spec label from specifications, fallback to formatted key
                      const label =
                        specLabelMap.get(specId) ??
                        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                      const displayValue = Array.isArray(value)
                        ? value.join(', ')
                        : String(value);

                      return (
                        <div
                          key={key}
                          className="flex justify-between items-center py-1.5 border-b border-emerald-100 last:border-0"
                        >
                          <span className="text-sm font-medium text-slate-600">{label}</span>
                          <span className="text-sm font-semibold text-emerald-700 text-right max-w-[55%]">
                            {displayValue}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── Special Instructions ── */}
            <div>
              <label
                htmlFor="instructions"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Special Instructions
              </label>

              <textarea
                id="instructions"
                rows={4}
                value={instructions}
                onChange={(e) => onInstructionsChange(e.target.value)}
                placeholder="Any special requirements or notes for our service?"
                className="
                  w-full rounded-xl border-2 border-slate-300 p-4 text-slate-950 outline-none 
                  transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}