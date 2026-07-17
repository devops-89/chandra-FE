const BookingInfo = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Booking Information
      </h3>

      <div className="space-y-3">
        <p>Booking ID: HC1001</p>
        <p>Service: AC Repair</p>
        <p>Date: 12 Aug 2025</p>
        <p>Amount: ₹499</p>
      </div>
    </div>
  );
};

export default BookingInfo;