'use client';

import ServiceRadius from './ServiceRadius';
import WorkingHours from './WorkingHours';

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

      <WorkingHours />

      <div className="my-6 border-t border-slate-200" />

      <ServiceRadius />
    </div>
  );
}