import ContactCard from './ContactCard';
import FAQSection from './FAQSection';
import RaiseTicketForm from './RaiseTicketForm';

export default function SupportOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ContactCard />
        <RaiseTicketForm />
      </div>

      <FAQSection />
    </div>
  );
}