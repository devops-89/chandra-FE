import FooterBottom from '@/components/footer/FooterBottom';
import FooterBrand from '@/components/footer/FooterBrand';
import FooterContact from '@/components/footer/FooterContact';
import FooterLinks from '@/components/footer/FooterLinks';

export default function Footer() {
  return (
    <footer className="bg-[#f6f7f6]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}