import type { CustomerBooking } from '@/types/customerBooking.types';

interface Props {
  booking: CustomerBooking;
  formattedDate: string;
  formattedAmount: string;
  onCancelClick: () => void;
  onRescheduleClick: () => void;
  onRaiseTicketClick: () => void;
  onCompletePaymentClick?: () => void;
  isPaymentLoading?: boolean;
}

import RescheduleButton from './RescheduleButton';
import StatusBadge from './StatusBadge';

export default function BookingDetailHero({
  booking,
  formattedDate,
  formattedAmount,
  onCancelClick,
  onRescheduleClick,
  onRaiseTicketClick,
  onCompletePaymentClick,
  isPaymentLoading = false,
}: Props) {
  const isActive =
    booking.status !== 'CANCELLED' &&
    booking.status !== 'COMPLETED' &&
    booking.status !== 'REJECTED';

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
            Booking Details
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {booking.service?.name ?? 'Service'}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Scheduled on {formattedDate}
          </p>
          <RescheduleButton onClick={onRescheduleClick} />
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <StatusBadge status={booking.status} />
          <p className="text-xl font-semibold text-slate-950">
            {formattedAmount}
          </p>

          <div className="flex items-center gap-2 flex-wrap justify-end mt-2">
            {(booking.paymentStatus || booking.bookingPaymentStatus) !== 'SUCCESS' && 
             (booking.paymentStatus || booking.bookingPaymentStatus) !== 'PAID' && (
              <button
                type="button"
                onClick={onCompletePaymentClick}
                disabled={isPaymentLoading}
                className="flex items-center mt-2 gap-1.5 rounded-xl border border-emerald-200 bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {isPaymentLoading ? 'Processing...' : 'Complete Payment'}
              </button>
            )}
            
            <button
              type="button"
              onClick={onRaiseTicketClick}
              className="flex items-center mt-2 gap-1.5 rounded-xl border border-red-200 bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors cursor-pointer"
            >
              Raise Ticket
            </button>
            
            {isActive && (
              <button
                onClick={onCancelClick}
                className="p-2 rounded-xl bg-slate-800 text-white mt-2 hover:cursor-pointer hover:bg-slate-900 transition-colors text-sm font-medium"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
