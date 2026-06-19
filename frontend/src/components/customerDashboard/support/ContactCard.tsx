import { Mail, Phone } from 'lucide-react';

export default function ContactCard() {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-lg
      "
    >
      <h2 className="mb-6 text-xl font-bold text-slate-950">
        Contact Support
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-slate-700">
          <Phone size={18} />
          <span>+91 9876543210</span>
        </div>

        <div className="flex items-center gap-3 text-slate-700">
          <Mail size={18} />
          <span>support@hichandra.com</span>
        </div>
      </div>
    </div>
  );
}