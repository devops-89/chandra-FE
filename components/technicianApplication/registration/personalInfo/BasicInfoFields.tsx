'use client';
import { MuiTelInput } from 'mui-tel-input';
interface BasicInfoFieldsProps {
  firstName:        string;
  lastName:         string;
  username:         string;
  phoneNumber:      string;
  email:            string;
  firstNameError?:  string;
  lastNameError?:   string;
  usernameError?:   string;
  phoneNumberError?: string;
  emailError?:      string;
  onFirstNameChange:  (v: string) => void;
  onLastNameChange:   (v: string) => void;
  onUsernameChange:   (v: string) => void;
  onPhoneNumberChange:(v: string) => void;
  onEmailChange:      (v: string) => void;
  onFirstNameBlur:  () => void;
  onLastNameBlur:   () => void;
  onUsernameBlur:   () => void;
  onPhoneNumberBlur:() => void;
  onEmailBlur:      () => void;
}

const fieldCls = (hasError?: string) =>
  `w-full h-12 border rounded-lg md:rounded-xl px-4 text-sm md:text-base
   focus:outline-none focus:ring-2 focus:border-transparent transition
   ${hasError
     ? 'border-red-500 focus:ring-red-500'
     : 'border-slate-300 focus:ring-emerald-500'
   }`;

export default function BasicInfoFields({
  firstName, lastName, username, phoneNumber, email,
  firstNameError, lastNameError, usernameError, phoneNumberError, emailError,
  onFirstNameChange, onLastNameChange, onUsernameChange, onPhoneNumberChange, onEmailChange,
  onFirstNameBlur, onLastNameBlur, onUsernameBlur, onPhoneNumberBlur, onEmailBlur,
}: BasicInfoFieldsProps) {
  return (
    <div className="space-y-4 md:space-y-6">

      {/* Row 1 — First Name + Last Name */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div>
          <label className="mb-2 block text-xs font-medium md:text-sm">First Name</label>
          <input
            type="text"
            placeholder="Rohit"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            onBlur={onFirstNameBlur}
            className={fieldCls(firstNameError)}
          />
          {firstNameError && <p className="mt-1 text-xs text-red-500">{firstNameError}</p>}
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium md:text-sm">Last Name</label>
          <input
            type="text"
            placeholder="Kumar"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            onBlur={onLastNameBlur}
            className={fieldCls(lastNameError)}
          />
          {lastNameError && <p className="mt-1 text-xs text-red-500">{lastNameError}</p>}
        </div>
      </div>

      {/* Row 2 — Username + Phone */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div>
          <label className="mb-2 block text-xs font-medium md:text-sm">Username</label>
          <input
            type="text"
            placeholder="rohit_kumar"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            onBlur={onUsernameBlur}
            className={fieldCls(usernameError)}
          />
          {usernameError && <p className="mt-1 text-xs text-red-500">{usernameError}</p>}
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium md:text-sm">Phone Number</label>
          <MuiTelInput
            defaultCountry="IN"
            forceCallingCode
            placeholder=""
            value={phoneNumber}
            onChange={(val) => onPhoneNumberChange(val)}
            onBlur={onPhoneNumberBlur}
            error={!!phoneNumberError}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                height: { xs: '3rem', md: '3rem' },
                borderRadius: { xs: '0.5rem', md: '0.75rem' },
                backgroundColor: 'transparent',
              },
            }}
          />
          {phoneNumberError && <p className="mt-1 text-xs text-red-500">{phoneNumberError}</p>}
        </div>
      </div>

      {/* Row 3 — Email (full width) */}
      <div>
        <label className="mb-2 block text-xs font-medium md:text-sm">Email Address</label>
        <input
          type="email"
          placeholder="rohit@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onBlur={onEmailBlur}
          className={fieldCls(emailError)}
        />
        {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
      </div>
    </div>
  );
}
