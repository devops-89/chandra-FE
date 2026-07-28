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
        h-20
        sticky
        top-0
        z-30
        bg-white
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
      </div>
    </header>
  );
}
