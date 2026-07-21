'use client';

import Image from 'next/image';
import { useState } from 'react';

export interface TechnicianHeaderProps {
  userName?: string;
  userImage?: string;
  isOnline?: boolean;
  onOnlineToggle?: (isOnline: boolean) => void;
  unreadNotifications?: number;
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export default function TechnicianHeader({
  // userName = 'Vikram',
  userImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIqqw-EcoftjiwYequdg0nCOe7VzpuDGWLAFJ9eXzs7cel5_qcIXWyColFlq7GxrExeD2ib0qpiNZAnIzE6hXWjAsIWO6UmYlX13hJRDpuqPiqrM2PyfyYnc38cK0k-cQDvzh72GtSC_I9S6VRijocQOZPDAoPSD1-jLBkzzthhOQ_F1rRMgkwFxczu8jHbJgwxra9dDt4ixt88tIFqPy_L2Lwmw9Eeh7THVhSsDJZjigsRKg6FpR6Bg4k0vWL73OWghLBzClZUdI',
  isOnline: initialIsOnline = true,
  onOnlineToggle,
  unreadNotifications = 0,
  onMenuToggle,
  isSidebarOpen = false,
}: TechnicianHeaderProps) {
  const [isOnline, setIsOnline] = useState(initialIsOnline);

  const handleToggleOnline = () => {
    const newState = !isOnline;
    setIsOnline(newState);
    onOnlineToggle?.(newState);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 py-3 px-4 md:py-4 md:px-8 bg-surface-white h-16 flex justify-between items-center border-b border-slate-150/70">
      {/* Left: Hamburger + Welcome Message */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Hamburger Menu */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100/80 active:bg-slate-200/80 rounded-full transition-colors shrink-0"
          aria-label="Toggle sidebar menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isSidebarOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Welcome Message */}
        <div className="hidden sm:block">
          <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
            Technician Dashboard
          </h2>
          <p className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider">{currentDate}</p>
        </div>

        {/* Mobile Welcome (Shortened) */}
        <div className="sm:hidden">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">
            Technician Portal
          </h2>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Online Toggle - MD3 Switch style */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={isOnline}
            onClick={handleToggleOnline}
            className={`
              relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-350 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-2
              ${isOnline ? 'bg-emerald-750' : 'bg-slate-250'}
            `}
            aria-label={isOnline ? 'Online - click to go offline' : 'Offline - click to go online'}
          >
            <span
              className={`
                pointer-events-none relative inline-block h-[22px] w-[22px] top-[1px] transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-out flex items-center justify-center
                ${isOnline ? 'translate-x-5' : 'translate-x-[2px]'}
              `}
            >
              {isOnline ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-450" />
              )}
            </span>
          </button>
          <span className={`text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 select-none ${isOnline ? 'text-emerald-750' : 'text-slate-500'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Notifications & Profile */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Notification Bell */}
          <button
            type="button"
            className="p-2 text-slate-500 hover:bg-slate-100/80 active:bg-slate-200/80 rounded-full transition-all relative cursor-pointer"
            aria-label="View notifications"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadNotifications > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-600 rounded-full" />
            )}
          </button>

          {/* Profile Avatar */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-100 overflow-hidden border border-slate-200/70 shadow-xs cursor-pointer">
            <Image
              alt="Technician profile avatar"
              className="w-full h-full object-cover"
              src={userImage}
              width={36}
              height={36}
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
