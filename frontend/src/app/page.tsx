import { ChooseSection } from '@/components/chooseUsSection/ChooseSection';
import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';
import HeroSection from '@/components/heroSection/HeroSection';
import { ServiceAvailabilitySection } from '@/components/serviceAvailabilitySection/ServiceAvailabilitySection';
import { ServiceSection } from '@/components/servicesSection/ServiceSection';
import { TestimonialSection } from '@/components/testimonial&StarRating section/TestimonialSection';

const Page = () => {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen bg-white">
        <HeroSection />
        <ServiceSection />
        <ChooseSection />
        <TestimonialSection />
        <ServiceAvailabilitySection />
      </main>
      <PublicFooter />
    </>
  );
};

export default Page;
