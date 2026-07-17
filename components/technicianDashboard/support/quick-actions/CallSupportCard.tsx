'use client';

import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

export default function CallSupportCard() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
        mt-4
        hover:border-emerald-500
        transition-all
      "
    >
      <div
        className="
          h-14
          w-14
          rounded-2xl
          bg-purple-100
          flex
          items-center
          justify-center
        "
      >
        <PhoneOutlinedIcon className="text-purple-600" />
      </div>

      <h3 className="mt-5 text-xl font-bold">
        Call Support
      </h3>

      <p className="mt-2 text-slate-500">
        Speak directly with our support team.
      </p>

      <button
        className="
          mt-6
          w-full
          py-3
          rounded-2xl
          border
          border-purple-500
          text-purple-600
          font-semibold
        "
      >
        Call Now
      </button>
    </div>
  );
}