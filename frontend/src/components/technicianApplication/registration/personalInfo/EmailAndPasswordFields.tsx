'use client';

import { motion } from 'framer-motion';

interface EmailAndPasswordFieldsProps {
  password: string;
  passwordError?: string;
  onPasswordChange: (value: string) => void;
  onPasswordBlur: () => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export default function EmailAndPasswordFields({
  password,
  passwordError,
  onPasswordChange,
  onPasswordBlur,
  showPassword,
  onTogglePassword,
}: EmailAndPasswordFieldsProps) {
  return (
    <div>
      <label className="block mb-2 text-xs md:text-sm font-medium">
        Create Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="********"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          onBlur={onPasswordBlur}
          className={`w-full h-12 border rounded-lg md:rounded-xl px-4 pr-14 text-sm md:text-base focus:outline-none focus:ring-2 focus:border-transparent transition ${
            passwordError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 focus:ring-emerald-500'
          }`}
        />

        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-xs md:text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      {passwordError && (
        <p className="text-xs text-red-500 mt-1">{passwordError}</p>
      )}

      <motion.div>
        <p className="text-xs mt-2 text-gray-500">
          Minimum 8 characters with a number and symbol.
        </p>
      </motion.div>
    </div>
  );
}
