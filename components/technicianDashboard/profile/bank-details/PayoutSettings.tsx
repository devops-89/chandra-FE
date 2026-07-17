'use client';

import SettingsIcon from '@mui/icons-material/Settings';

export default function PayoutSettings() {
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
        <SettingsIcon className="text-emerald-500" />

        <h3 className="text-xl font-bold">
          Payout Settings
        </h3>
      </div>

      <div className="space-y-4">
        <div
          className="
            flex
            justify-between
            items-center
          "
        >
          <span>Auto Withdrawal</span>

          <span
            className="
              px-3
              py-1
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-sm
            "
          >
            Enabled
          </span>
        </div>

        <div
          className="
            flex
            justify-between
            items-center
          "
        >
          <span>Payout Frequency</span>

          <span className="font-medium">
            Weekly
          </span>
        </div>
      </div>
    </div>
  );
}