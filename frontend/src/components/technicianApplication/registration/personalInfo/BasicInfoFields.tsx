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

export default function BasicInfoFields({
  fullName,
  phoneNumber,
  fullNameError,
  phoneNumberError,
  onFullNameChange,
  onPhoneNumberChange,
  onFullNameBlur,
  onPhoneNumberBlur,
}: BasicInfoFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block mb-2 text-xs md:text-sm font-medium">Full Name</label>

          <input
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            onBlur={onFullNameBlur}
            className={`w-full h-12 border rounded-lg md:rounded-xl px-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:border-transparent transition ${
              fullNameError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-emerald-500'
            }`}
          />

          {fullNameError && (
            <p className="text-xs text-red-500 mt-1">{fullNameError}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-xs md:text-sm font-medium">Phone Number</label>

          <input
            type="tel"
            placeholder="+91 9876543210"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            onBlur={onPhoneNumberBlur}
            className={`w-full h-12 border rounded-lg md:rounded-xl px-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:border-transparent transition ${
              phoneNumberError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-emerald-500'
            }`}
          />

          {phoneNumberError && (
            <p className="text-xs text-red-500 mt-1">{phoneNumberError}</p>
          )}
        </div>
      </div>
    </>
  );
}
