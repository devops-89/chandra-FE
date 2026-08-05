import PublicNavbar from '@/components/common/PublicNavbar';
import PublicFooter from '@/components/common/PublicFooter';
import { ChooseSection } from '@/components/chooseUsSection/ChooseSection';
import AboutHero from '@/components/aboutSection/AboutHero';
import AboutStats from '@/components/aboutSection/AboutStats';
import AboutMission from '@/components/aboutSection/AboutMission';

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
