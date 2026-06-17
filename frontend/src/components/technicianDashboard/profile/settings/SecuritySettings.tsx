'use client';

import SecurityIcon from '@mui/icons-material/Security';

export default function SecuritySettings() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <SecurityIcon className="text-emerald-500" />

        <h3 className="text-xl font-bold">
          Security
        </h3>
      </div>

      <div className="space-y-4">
        <button
          className="
            w-full
            py-3
            rounded-2xl
            border
            border-slate-200
            hover:border-emerald-500
          "
        >
          Change Password
        </button>

        <button
          className="
            w-full
            py-3
            rounded-2xl
            border
            border-slate-200
            hover:border-emerald-500
          "
        >
          Enable Two-Factor Auth
        </button>
      </div>
    </div>
  );
}