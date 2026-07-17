import { CalendarClock, CheckCircle2, ClipboardList, UserCheck } from 'lucide-react';

import BookingStatusCards from "./BookingStatusCards";

const BookingStats = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4 xl:gap-6">
      <BookingStatusCards
        title="Pending"
        value={23}
        color="text-slate-950"
        icon={<ClipboardList size={22} />}
        iconClassName="bg-amber-100 text-amber-700"
      />
      <BookingStatusCards
        title="Assigned"
        value={48}
        color="text-slate-950"
        icon={<UserCheck size={22} />}
        iconClassName="bg-sky-100 text-sky-700"
      />
      <BookingStatusCards
        title="In Progress"
        value={18}
        color="text-emerald-600"
        icon={<CalendarClock size={22} />}
        iconClassName="bg-emerald-100 text-emerald-700"
      />
      <BookingStatusCards
        title="Completed"
        value={542}
        color="text-slate-950"
        icon={<CheckCircle2 size={22} />}
        iconClassName="bg-emerald-100 text-emerald-700"
      />
    </div>
  );
};

export default BookingStats;
