'use client';

import { stats } from "@/constants/technicianDashboard/profile/stats.constants";

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-slate-500">
            {stat.label}
          </p>

          <h3
            className="
              mt-3
              text-3xl
              font-bold
              text-slate-900
            "
          >
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}