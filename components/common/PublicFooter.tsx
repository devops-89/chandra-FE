import FooterBottom from '@/components/footerSection/FooterBottom';
import FooterBrand from '@/components/footerSection/FooterBrand';
import FooterContact from '@/components/footerSection/FooterContact';
import FooterLinks from '@/components/footerSection/FooterLinks';
import FooterProfessional from '@/components/footerSection/FooterProfessional';

export default function Footer() {
  return (
    <footer className="bg-[#fff8ed]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FooterBrand />
          </div>
          <div className="lg:col-span-2">
            <FooterLinks />
          </div>
          <div className="lg:col-span-3">
            <FooterContact />
          </div>
          <div className="lg:col-span-2">
            <FooterProfessional />
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}