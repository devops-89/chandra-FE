'use client';

import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

import TicketStatusBadge from './TicketStatusBadge';

interface Props {
  ticket: {
    id: string;
    rawId: number;
    bookingId?: number;
    subject: string;
    category: string;
    status: string;
    createdAt: string;
  };
  onClick?: (id: number) => void;
}

export default function TicketCard({
  ticket,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick && onClick(ticket.rawId)}
      className=" border border-slate-200 rounded-2xl p-5 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex gap-4">
          <div
            className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0"
          >
            <ConfirmationNumberOutlinedIcon className="text-emerald-600" />
          </div>

          <div>
            <h4 className="font-bold text-slate-900">
              {ticket.subject}
            </h4>

            <p className="text-sm text-slate-500 mt-1">
              Ticket ID: {ticket.id} {ticket.bookingId && `• Booking ID: ${ticket.bookingId}`}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs"
              >
                {ticket.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-2">
          <TicketStatusBadge
            status={ticket.status}
          />

          <p className="text-sm text-slate-500">
            {ticket.createdAt}
          </p>
        </div>
      </div>
    </div>
  )}