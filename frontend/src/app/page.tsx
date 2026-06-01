import { ChooseSection } from '@/components/chooseUsSection/ChooseSection';
import Footer from '@/components/footer/Footer';
import HeroSection from '@/components/heroSection/HeroSection';
import { ServiceSection } from '@/components/servicesSection/ServiceSection';
import { TestimonialSection } from '@/components/testimonial&StarRating/TestimonialSection';


const Page = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ServiceSection />
      <ChooseSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
};

export default Page;
