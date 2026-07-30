import Image from 'next/image';

import type { BookingTechnician } from "@/types/dashboardTypes/customerDashboard/customerDashboard.types";

type BookingTechnicianCardProps = {
  technician: BookingTechnician;
};
//
const BookingTechnicianCard = ({ technician }: BookingTechnicianCardProps) => {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <Image
        alt={technician.name}
        className="h-12 w-12 rounded-full object-cover"
        src={technician.avatar}
        width={48}
        height={48}
      />
      <div>
        <p className="text-sm text-left text-slate-600">Technician</p>
        <p className="text-sm text-left font-bold">{technician.name}</p>
        <p className="inline-block rounded-full bg-emerald-100 px-2 text-xs font-bold text-emerald-700">
          ETA: {technician.eta}
        </p>
      </div>
    </div>
  );
};

export default BookingTechnicianCard;
