import { Star } from "lucide-react";
import Image from "next/image";

import type { FavoriteTechnician } from "@/types/dashboardTypes/customerDashboard/customerDashboard.types";

type TechnicianCardProps = {
  technician: FavoriteTechnician;
};

const TechnicianCard = ({ technician }: TechnicianCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-6 ambient-shadow">
      <div className="flex items-center gap-4">
        <Image
          alt={technician.name}
          className="h-12 w-12 rounded-full object-cover"
          src={technician.avatar}
          width={48}
          height={48}
        />
        <div>
          <p className="text-sm font-bold">{technician.name}</p>
          <div className="flex items-center gap-1 text-emerald-600">
            <Star className="h-4 w-4 fill-emerald-600" />
            <span className="text-sm font-bold">{technician.rating}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="rounded-lg bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 transition-all hover:brightness-95 cursor-pointer"
      >
        Book Again
      </button>
    </div>
  );
};

export default TechnicianCard;
