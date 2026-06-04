import { Bell, Menu } from 'lucide-react';

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
        bg-white
        px-4
        sm:px-6
        lg:px-8
        py-4
        sm:py-5
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

        <div>
          <h1
            className="
              text-xl
              sm:text-2xl
              lg:text-3xl
              font-bold
              text-slate-900
            "
          >
            Welcome back, Chandra!
          </h1>

          <p className="text-sm sm:text-base text-slate-500 hidden sm:block">
            Manage your bookings and services
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button
          className="
            rounded-full
            p-2
            hover:bg-slate-100
            transition-colors
          "
          title='bellButton'
        >
          <Bell size={22} />
        </button>

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            rounded-full
            border
            border-slate-200
            px-2
            sm:px-3
            py-1
            sm:py-2
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              sm:h-10
              sm:w-10
              items-center
              justify-center
              rounded-full
              bg-emerald-700
              font-semibold
              text-white
              text-sm
              sm:text-base
            "
          >
            C
          </div>

          <span className="font-medium text-sm sm:text-base hidden sm:inline">
            Chandra K.
          </span>
        </div>
      </div>
    </header>
  );
}