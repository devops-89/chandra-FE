import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

import { footerContent } from '@/constants/footer/footerContent';

export default function FooterContact() {
  const { contact } = footerContent;

  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-700">
        Contact
      </h3>

      <div className="space-y-5">
        <div className="flex items-center justify-center gap-3">
          <LocationOnOutlinedIcon fontSize="small" className="text-emerald-700 shrink-0" />
          <p className="text-gray-600">{contact.address}</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <PhoneOutlinedIcon fontSize="small" className="text-emerald-700 shrink-0" />
          <p className="text-gray-600">{contact.phone}</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <EmailOutlinedIcon fontSize="small" className="text-emerald-700 shrink-0" />
          <p className="text-gray-600">{contact.email}</p>
        </div>
      </div>
    </div>
  );
}
