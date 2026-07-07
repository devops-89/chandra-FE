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
  userName = 'Vikram',
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
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 py-3 px-4 md:py-4 md:px-8 bg-white h-auto flex justify-between items-center border-b border-slate-200">
      {/* Left: Hamburger + Welcome Message */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Hamburger Menu */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="md:hidden p-2 text-secondary hover:bg-surface-container rounded-lg transition-colors shrink-0"
          aria-label="Toggle sidebar menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isSidebarOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Welcome Message */}
        <div className="hidden sm:block">
          <h2 className="text-lg md:text-xl font-bold text-primary">
            Technician Dashboard
          </h2>
          <p className="text-xs md:text-sm text-charcoal-light">{currentDate}</p>
        </div>

        {/* Mobile Welcome (Shortened) */}
        <div className="sm:hidden">
          <h2 className="text-base font-bold text-primary">
            Welcome!
          </h2>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Online Toggle - Horizontal Button */}
        <button
          type="button"
          onClick={handleToggleOnline}
          className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
            isOnline
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-surface-container text-secondary hover:bg-surface-container-high'
          }`}
          aria-label={isOnline ? 'Click to go offline' : 'Click to go online'}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isOnline ? 'bg-white animate-pulse' : 'bg-outline-variant'
            }`}
          />
          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </button>

        {/* Notifications & Profile */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            type="button"
            className="p-2 text-secondary cursor-pointer hover:bg-surface-container-high rounded-full transition-all relative"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
            )}
          </button>

          {/* Profile Avatar */}
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-white shadow-sm cursor-pointer">
            <Image
              alt="Technician profile avatar"
              className="w-full h-full object-cover"
              src={userImage}
              width={40}
              height={40}
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
