import { OfferBannerSection } from '@/components/bannerSection/OfferBannerSection';
import { ChooseSection } from '@/components/chooseUsSection/ChooseSection';
import Footer from '@/components/common/PublicFooter';
import HeroSection from '@/components/heroSection/HeroSection';
import { ServiceAvailabilitySection } from '@/components/serviceAvailabilitySection/ServiceAvailabilitySection';
import { ServiceSection } from '@/components/servicesSection/ServiceSection';
import { TestimonialSection } from '@/components/testimonial&StarRating section/TestimonialSection';


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
