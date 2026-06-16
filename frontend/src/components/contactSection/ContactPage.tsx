import ContactHero from '@/components/contactSection/ContactHero';
import ContactSection from '@/components/contactSection/ContactSection';

export default function ContactPage() {
  return (
    <main className="bg-[#FFF8ED] border-b border-slate-200 min-h-screen">
      <ContactHero />
      <ContactSection />
    </main>
  );
}