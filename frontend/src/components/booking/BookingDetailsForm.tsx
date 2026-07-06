'use client';

import type { BookingFormData } from '@/types/services.types';

interface BookingDetailsFormProps {
  service: string;
  servicePrice: number;
  serviceSpecificData?: BookingFormData;
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
  name,
  phone,
  instructions,
  onNameChange,
  onPhoneChange,
  onInstructionsChange,
}: BookingDetailsFormProps) {
  return (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-lg">
        <div className="border border-slate-200 pt-8 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 text-center">Book Service</h2>

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

            {serviceSpecificData && Object.keys(serviceSpecificData).length > 0 && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-left">
                <h4 className="font-semibold text-emerald-700 mb-2">Service Details:</h4>
                <div className="space-y-1 text-xs">
                  {Object.entries(serviceSpecificData).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span>{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>

              <input
                id="name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter your full name"
                className="
                  w-full rounded-xl border-2 border-slate-300 p-4 text-slate-950 outline-none 
                  transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
                "
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                placeholder="Enter phone number"
                className="
                  w-full rounded-xl border-2 border-slate-300 p-4 text-slate-950 outline-none 
                  transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200
                "
              />
            </div>

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