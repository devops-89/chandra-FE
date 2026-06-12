'use client';

interface BasicInfoFieldsProps {
  fullName: string;
  phoneNumber: string;
  email: string;
  fullNameError?: string;
  phoneNumberError?: string;
  emailError?: string;
  onFullNameChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onFullNameBlur: () => void;
  onPhoneNumberBlur: () => void;
  onEmailBlur: () => void;
}

/* ─── Shared input style ─────────────────────────────────────────── */
const fieldCls = (hasError?: string) =>
  `w-full h-12 border rounded-lg md:rounded-xl px-4 text-sm md:text-base
   focus:outline-none focus:ring-2 focus:border-transparent transition
   ${hasError
     ? 'border-red-500 focus:ring-red-500'
     : 'border-slate-300 focus:ring-emerald-500'
   }`;

export default function BasicInfoFields({
  fullName,
  phoneNumber,
  email,
  fullNameError,
  phoneNumberError,
  emailError,
  onFullNameChange,
  onPhoneNumberChange,
  onEmailChange,
  onFullNameBlur,
  onPhoneNumberBlur,
  onEmailBlur,
}: BasicInfoFieldsProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Row 1 — Name + Phone */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-xs font-medium md:text-sm">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            onBlur={onFullNameBlur}
            className={fieldCls(fullNameError)}
          />
          {fullNameError && (
            <p className="mt-1 text-xs text-red-500">{fullNameError}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-2 block text-xs font-medium md:text-sm">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+91 9876543210"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            onBlur={onPhoneNumberBlur}
            className={fieldCls(phoneNumberError)}
          />
          {phoneNumberError && (
            <p className="mt-1 text-xs text-red-500">{phoneNumberError}</p>
          )}
        </div>
      </div>

      {/* Row 2 — Email (full width) */}
      <div>
        <label className="mb-2 block text-xs font-medium md:text-sm">
          Email Address
        </label>
        <input
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onBlur={onEmailBlur}
          className={fieldCls(emailError)}
        />
        {emailError && (
          <p className="mt-1 text-xs text-red-500">{emailError}</p>
        )}
      </div>
    </div>
  );
}
