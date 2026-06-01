import { ChooseSection } from '@/components/chooseUsSection/ChooseSection';
import HeroSection from '@/components/heroSection/HeroSection';
import { ServiceSection } from '@/components/servicesSection/ServiceSection';
import { TestimonialSection } from '@/components/testimonial&StarRating section/TestimonialSection';
import { OfferBannerSection } from '@/components/bannerSection/OfferBannerSection';
import { ServiceAvailabilitySection } from '@/components/serviceAvailabilitySection/ServiceAvailabilitySection';


const Page = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ServiceSection />
      <ChooseSection />
      <TestimonialSection />
      <OfferBannerSection />
      <ServiceAvailabilitySection />
    </main>
  );
};

export default Page;
