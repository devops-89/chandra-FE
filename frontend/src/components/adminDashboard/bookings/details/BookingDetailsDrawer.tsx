import type { Booking } from '@/constants/admin/bookingData';

import BookingDetails from './BookingDetails';

interface Props {
  open: boolean;
  onClose: () => void;
  booking: Booking;
}

const BookingDetailsDrawer = ({ open, onClose, booking }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div
        className="absolute right-0 h-full w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Booking Details</h2>
            <p className="text-slate-500">{booking.id}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">{booking.customer}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{booking.service}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-slate-900">₹{booking.amount}</p>
              <p className="text-xs text-slate-500">{booking.date}</p>
            </div>
          </div>
        </div>

        <BookingDetails />
      </div>
    </div>
  );
};

export default BookingDetailsDrawer;
