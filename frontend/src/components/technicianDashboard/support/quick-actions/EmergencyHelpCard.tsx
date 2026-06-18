'use client';

import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

export default function EmergencyHelpCard() {
  return (
    <div
      className="
        bg-linear-to-br
        from-red-500
        to-red-600
        rounded-3xl
        p-6
        text-white
        shadow-lg
      "
    >
      <div
        className="
          h-14
          w-14
          rounded-2xl
          bg-white/20
          flex
          items-center
          justify-center
        "
      >
        <WarningAmberOutlinedIcon />
      </div>

      <h3 className="mt-5 text-xl font-bold">
        Emergency Help
      </h3>

      <p className="mt-2 text-white/90">
        Immediate assistance for safety or critical
        job issues.
      </p>

      <button
        className="
          mt-6
          w-full
          py-3
          rounded-2xl
          bg-white
          text-red-600
          font-semibold
        "
      >
        Get Help
      </button>
    </div>
  );
}