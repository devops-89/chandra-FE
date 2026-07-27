import {
  Facebook,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';
import Link from 'next/link';

import { footerContent } from '@/constants/footer/footerContent';

export default function FooterBrand() {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <Link href="/" className="text-3xl font-bold text-emerald-700">
        HiChandra
      </Link>

      <p className="text-gray-600 leading-7">
        {footerContent.description}
      </p>

      <div className="flex gap-4 justify-center">
        <Facebook className="cursor-pointer text-gray-500 hover:text-emerald-600" />
        <Instagram className="cursor-pointer text-gray-500 hover:text-emerald-600" />
        <LinkedIn className="cursor-pointer text-gray-500 hover:text-emerald-600" />
      </div>
    </div>
  );
}
