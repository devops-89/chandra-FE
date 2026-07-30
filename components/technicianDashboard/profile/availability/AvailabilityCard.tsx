'use client';

import ServiceRadius from './ServiceRadius';

export default function AvailabilityCard() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        h-full
        p-6
        shadow-sm
      "
    >
      <h3
        className="
          text-xl
          font-bold
          text-slate-900
          mb-8
        "
      >
        Availability Settings
      </h3>

      <ServiceRadius />
    </div>
  );
}