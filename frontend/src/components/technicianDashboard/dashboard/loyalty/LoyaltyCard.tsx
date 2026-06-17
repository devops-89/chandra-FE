'use client';

import LoyaltyProgress from './LoyaltyProgress';

export default function LoyaltyCard() {
  return (
    <div
      className="
        bg-linear-to-br
        from-emerald-600
        to-emerald-800
        rounded-xl
        p-6
        text-white
        relative
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          -right-4
          -bottom-4
          w-24
          h-24
          bg-white/10
          rounded-full
          blur-xl
        "
      />

      <div className="relative z-10">
        <h4 className="text-lg font-bold mb-1">
          HiChandra Star
        </h4>

        <p className="text-white/80 text-sm mb-4">
          Complete 5 more jobs to reach Gold level.
        </p>

        <LoyaltyProgress />
      </div>
    </div>
  );
}