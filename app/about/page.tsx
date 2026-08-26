import AboutHero from '@/components/aboutSection/AboutHero';
import AboutMission from '@/components/aboutSection/AboutMission';
import AboutStats from '@/components/aboutSection/AboutStats';
import { ChooseSection } from '@/components/chooseUsSection/ChooseSection';
import PublicFooter from '@/components/common/PublicFooter';
import PublicNavbar from '@/components/common/PublicNavbar';

export default function AboutPage() {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen bg-white">
        <AboutHero />
        <AboutStats />
        <ChooseSection />
        <AboutMission />
      </main>
      <PublicFooter />
    </>
  );
}
