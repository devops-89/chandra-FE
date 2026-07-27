import { Menu } from 'lucide-react';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-200
        px-4
        sm:px-6
        lg:px-8
        py-2
        sm:pt-7.5
        sticky
        top-0
        z-30
      "
    >
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            rounded-lg
            p-2
            text-slate-600
            hover:bg-slate-100
            hover:text-slate-900
            transition-colors
          "
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div className='flex flex-col gap-1.5'>
          <h1
            className="
              text-xl
              sm:text-2xl
              lg:text-3xl
              font-bold
              text-slate-900
            "
          >
            Dashboard
          </h1>

          <p className="text-sm sm:text-sm text-slate-500 hidden sm:block">
            Manage your bookings and services
          </p>
        </div>
      </div>
    </header>
  );
}
