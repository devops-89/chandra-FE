import Link from 'next/link';

export default function FooterProfessional() {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-700">
        For Professionals
      </h3>

      <ul className="space-y-4">
        <li>
          <Link href="/technician" className="text-gray-600 hover:text-emerald-700">
            Register as Technician
          </Link>
        </li>
      </ul>
    </div>
  );
}
