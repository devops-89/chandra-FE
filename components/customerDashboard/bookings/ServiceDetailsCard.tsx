import type { CustomerBooking } from '@/types/customerBooking.types';

interface Props {
  booking: CustomerBooking;
}

export default function ServiceDetailsCard({ booking }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">Service Details</h3>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span>Technician</span>
          <span className="font-medium text-slate-900">
            {booking.technician?.name || 
             [booking.technician?.firstName, booking.technician?.lastName].filter(Boolean).join(' ') || 
             booking.technician?.username || 
             'Not assigned'}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span>Phone</span>
          <span className="font-medium text-slate-900">
            {booking.technician?.phone ?? 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span>Address</span>
          <span className="max-w-[60%] text-right font-medium text-slate-900">
            {booking.address?.fullAddress ?? 'N/A'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Location</span>
          <span className="font-medium text-slate-900">
            {booking.address?.city ?? 'N/A'},{' '}
            {booking.address?.state ?? 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
