export default function FooterBottom() {
  return (
    <div className="mt-16 border-t border-gray-200 pt-8">
      <div className="flex flex-col items-start justify-between gap-4 text-sm text-gray-500 md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} HiChandra.
          All rights reserved.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <span>Verified Professionals</span>
          <span>Trusted Services</span>
        </div>
      </div>
    </div>
  );
}