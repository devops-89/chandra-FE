import BookingStatusCards from "./BookingStatusCards";

const BookingStats = () => {
  return (
    <div className="grid gap-4  md:grid-cols-4">
      <BookingStatusCards
        title="Pending"
        value={23}
        color="text-slate-950"
      />

      <BookingStatusCards
        title="Assigned"
        value={48}
        color="text-slate-950"
      />

      <BookingStatusCards
        title="In Progress"
        value={18}
        color="text-emerald-600"
      />

      <BookingStatusCards
        title="Completed"
        value={542}
        color="text-slate-950"
      />
    </div>
  );
};

export default BookingStats;