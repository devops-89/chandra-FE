'use client';

import FAQSection from './faq/FAQSection';
import SupportTabs from './header/SupportTabs';
import QuickActionsGrid from './quick-actions/QuickActionsGrid';
import ContactInfoCard from './sidebar/ContactInfoCard';
import ResolutionCard from './sidebar/ResolutionCard';
import SupportStatsCard from './sidebar/SupportStatsCard';
import SupportTicketForm from './ticket-form/SupportTicketForm';
import TicketList from './tickets/TicketList';

export default function SupportContent() {
  return (
    <div className="space-y-6">
      <SupportTabs />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8">
            <SupportTicketForm />

            <TicketList />

            <FAQSection />
        </div>

        <div className="col-span-12 xl:col-span-4 space-y-6">
            <SupportStatsCard />

            <QuickActionsGrid />

            <ContactInfoCard />

            <ResolutionCard />
        </div>
      </div>
    </div>
  );
}