'use client';

import TicketCard from './TicketCard';
import TicketFilters from './TicketFilters';

const tickets = [
  {
    id: 'SUP-1001',
    subject: 'Payment not received',
    category: 'Payment',
    priority: 'High',
    status: 'In Progress',
    createdAt: '18 Jun 2026',
  },
  {
    id: 'SUP-1002',
    subject: 'Unable to start job',
    category: 'Technical',
    priority: 'Medium',
    status: 'Open',
    createdAt: '16 Jun 2026',
  },
  {
    id: 'SUP-1003',
    subject: 'Customer cancelled after arrival',
    category: 'Job Issue',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '12 Jun 2026',
  },
];

export default function TicketList() {
  return (
    <div
      className=" bg-white border border-slate-200 rounded-3xl shadow-sm
      "
    >
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-900">
            Support Tickets
          </h3>

          <TicketFilters />
        </div>
      </div>

      <div className="p-6 space-y-4">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
          />
        ))}
      </div>
    </div>
  );
}