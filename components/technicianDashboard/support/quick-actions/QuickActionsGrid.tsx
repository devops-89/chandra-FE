'use client';

import CallSupportCard from './CallSupportCard';
import EmergencyHelpCard from './EmergencyHelpCard';
import LiveChatCard from './LiveChatCard';
import RaiseTicketCard from './RaiseTicketCard';

export default function QuickActionsGrid() {
  return (
    <div className="grid gap-2">
      <div className="col-span-12 md:col-span-6 xl:col-span-3">
        <RaiseTicketCard />
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-3">
        <LiveChatCard />
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-3">
        <CallSupportCard />
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-3">
        <EmergencyHelpCard />
      </div>
    </div>
  );
}