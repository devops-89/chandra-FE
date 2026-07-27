import Link from 'next/link';

import { footerContent } from '@/constants/footer/footerContent';

export default function FooterLinks() {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-700">
        Navigation
      </h3>

      <ul className="space-y-4">
        {footerContent.navigation.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="text-gray-600 hover:text-emerald-700">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
