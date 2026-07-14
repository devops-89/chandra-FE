import type { CustomerBooking } from '@/types/customerBooking.types';

interface Props {
  booking: CustomerBooking;
}

export default function ReviewFeedbackCard({ booking }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        Review &amp; Feedback
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">Your Rating</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {booking.myRating ?? 'Not rated'}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {booking.myReview ?? 'No review submitted yet.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">
            Technician Rating
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {booking.technicianRating ?? 'Not rated'}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {booking.technicianReview ?? 'No technician feedback yet.'}
          </p>
        </div>
      </div>
    </div>
  );
}
