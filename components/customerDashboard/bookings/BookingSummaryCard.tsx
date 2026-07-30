import type { CustomerBooking } from '@/types/customerBooking.types';

interface Props {
  booking: CustomerBooking;
}

export default function BookingSummaryCard({ booking }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">Booking Summary</h3>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span>Service</span>
          <span className="font-medium text-slate-900">
            {booking.service?.name ?? 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span>Status</span>
          <span className="font-medium text-slate-900">{booking.status}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span>Payment Status</span>
          <span className="font-medium text-slate-900">
            {booking.paymentStatus || booking.bookingPaymentStatus || 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span>Emergency</span>
          <span className="font-medium text-slate-900">
            {booking.isEmergency ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Booked On</span>
          <span className="font-medium text-slate-900">
            {booking.createdAt
              ? new Date(booking.createdAt).toLocaleDateString('en-IN')
              : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
