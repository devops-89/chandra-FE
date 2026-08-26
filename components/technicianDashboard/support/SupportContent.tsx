'use client';

import FAQSection from './faq/FAQSection';
import TicketList from './tickets/TicketList';

export default function SupportContent() {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
            <TicketList />

            <div className="mt-8">
              <FAQSection />
            </div>
        </div>
      </div>
    </div>
  );
}