'use client';

import { useState } from 'react';

import type { AvailabilityFormData } from '@/types/serviceAvailability.types';

interface AvailabilityFormProps {
  onSubmit: (data: AvailabilityFormData) => void;
}

export function AvailabilityForm({ onSubmit }: AvailabilityFormProps) {
  const [formData, setFormData] = useState<AvailabilityFormData>({
    fullName: '',
    phone: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<Partial<AvailabilityFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<AvailabilityFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof AvailabilityFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputClasses = `
    w-full rounded-xl border-2 border-slate-200 bg-white
    px-4 py-3 text-slate-900 placeholder-slate-400
    outline-none transition-colors
    focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100
  `;

  const errorClasses = 'mt-1 text-xs text-red-500';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Full Name */}
      <div>
        <label htmlFor="av-fullName" className="mb-1.5 block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <input
          id="av-fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="e.g. Ravi Kumar"
          className={`${inputClasses} ${errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
        />
        {errors.fullName && <p className={errorClasses}>{errors.fullName}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="av-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
          Phone Number
        </label>
        <input
          id="av-phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
          placeholder="10-digit mobile number"
          className={`${inputClasses} ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
        />
        {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
      </div>

      {/* Pincode */}
      <div>
        <label htmlFor="av-pincode" className="mb-1.5 block text-sm font-medium text-slate-700">
          Pincode
        </label>
        <input
          id="av-pincode"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={formData.pincode}
          onChange={(e) => handleChange('pincode', e.target.value.replace(/\D/g, ''))}
          placeholder="6-digit pincode"
          className={`${inputClasses} ${errors.pincode ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
        />
        {errors.pincode && <p className={errorClasses}>{errors.pincode}</p>}
      </div>

      <button
        type="submit"
        className="
          mt-2 w-full rounded-full
          bg-emerald-600 px-6 py-3.5
          text-base font-semibold text-white
          transition-all duration-300
          hover:bg-emerald-700 active:scale-[0.98]
          cursor-pointer
        "
      >
        Check Availability
      </button>
    </form>
  );
}
