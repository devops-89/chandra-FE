import ContactForm from './ContactForm';
import ContactInfoCard from './ContactInfoCard';

export default function ContactSection() {
  return (
    <section 
    id='contact'
    className="max-w-7xl mx-auto px-6 pb-24">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <ContactForm />
        </div>

        <div className="lg:col-span-4">
          <ContactInfoCard />
        </div>
      </div>
    </section>
  );
}