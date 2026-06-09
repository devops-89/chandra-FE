import Link from 'next/link';

export default function FooterProfessional() {
  return (
    <div>
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-emerald-700">
        For Professionals
      </h3>

      <ul className="space-y-4">
        <li>
          <Link
            href="/technicianOnboarding"
            className="text-gray-600 hover:text-emerald-700"
          >
            Register as Technician
          </Link>
        </li>
      </ul>
    </div>
  );
}
