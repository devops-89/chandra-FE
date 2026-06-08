import { ChooseSection } from '@/components/chooseUsSection/ChooseSection';
import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import HeroSection from '@/components/heroSection/HeroSection';
import { ServiceAvailabilityModal } from '@/components/serviceAvailabilityModal';
import { ServiceSection } from '@/components/servicesSection/ServiceSection';
import { TestimonialSection } from '@/components/testimonial&StarRating section/TestimonialSection';

const Page = () => {
  return (
    <>
      <PublicNavbar />
      <ServiceAvailabilityModal />
      <main className="min-h-screen bg-white">
        <HeroSection />
        <ServiceSection />
        <ChooseSection />
        <TestimonialSection />
      </main>
      <PublicFooter />
    </>
  );
};

export default Page;
