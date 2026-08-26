import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import HowItWorks from '@/components/servicesPage/HowItWorks';
import ServicesFAQ from '@/components/servicesPage/ServicesFAQ';
import ServicesHero from '@/components/servicesPage/ServicesHero';
import { ServiceSection } from '@/components/servicesSection/ServiceSection';

export default function ServicePage() {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen bg-white">
        <ServicesHero />
        <HowItWorks />
        <ServiceSection />
        <ServicesFAQ />
      </main>
      <PublicFooter />
    </>
  );
}