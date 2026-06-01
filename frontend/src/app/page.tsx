import { ChooseSection } from '@/components/chooseUsSection/ChooseSection';
import HeroSection from '@/components/heroSection/HeroSection';
import { ServiceSection } from '@/components/servicesSection/ServiceSection';


const Page = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ServiceSection />
      <ChooseSection />
    </main>
  );
};

export default Page;
