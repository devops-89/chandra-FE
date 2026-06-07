import type { BookingTechnician } from "@/types/dashboardTypes/customerDashboard/customerDashboard.types";

type BookingTechnicianCardProps = {
  technician: BookingTechnician;
};

const BookingTechnicianCard = ({ technician }: BookingTechnicianCardProps) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <img
        alt={technician.name}
        className="h-12 w-12 rounded-full object-cover"
        src={technician.avatar}
      />
      <div>
        <p className="text-sm text-slate-600">Technician</p>
        <p className="text-sm font-bold">{technician.name}</p>
        <p className="inline-block rounded-full bg-emerald-100 px-2 text-xs font-bold text-emerald-700">
          ETA: {technician.eta}
        </p>
      </div>
    </div>
  );
};

export default BookingTechnicianCard;
