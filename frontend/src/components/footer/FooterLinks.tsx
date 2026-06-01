import Link from 'next/link';

import { footerContent } from '@/constants/footer/footerContent';

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Navigation
        </h3>

        <ul className="space-y-4">
          {footerContent.navigation.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-gray-600 hover:text-emerald-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Legal
        </h3>

        <ul className="space-y-4">
          {footerContent.legal.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-gray-600 hover:text-emerald-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}