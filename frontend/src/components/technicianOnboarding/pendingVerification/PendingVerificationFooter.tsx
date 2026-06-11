'use client';

export default function PendingVerificationFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-outline-variant bg-surface-white h-20 flex items-center justify-center">
      <p className="text-xs md:text-sm text-secondary text-center">
        © {currentYear} HiChandra Home Services. All rights reserved.
      </p>
    </footer>
  );
}
