'use client';

import Image from 'next/image';
import { useState } from 'react';

export interface TechnicianHeaderProps {
  userName?: string;
  userImage?: string;
  isOnline?: boolean;
  onOnlineToggle?: (isOnline: boolean) => void;
  unreadNotifications?: number;
}

export default function TechnicianHeader({
  userName = 'Vikram',
  userImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIqqw-EcoftjiwYequdg0nCOe7VzpuDGWLAFJ9eXzs7cel5_qcIXWyColFlq7GxrExeD2ib0qpiNZAnIzE6hXWjAsIWO6UmYlX13hJRDpuqPiqrM2PyfyYnc38cK0k-cQDvzh72GtSC_I9S6VRijocQOZPDAoPSD1-jLBkzzthhOQ_F1rRMgkwFxczu8jHbJgwxra9dDt4ixt88tIFqPy_L2Lwmw9Eeh7THVhSsDJZjigsRKg6FpR6Bg4k0vWL73OWghLBzClZUdI',
  isOnline: initialIsOnline = true,
  onOnlineToggle,
  unreadNotifications = 0,
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
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 p-12 bg-white px-margin-desktop h-20 flex justify-between items-center">
      {/* Left: Welcome Message */}
      <div>
        <h2 className="font-headline-sm text-headline-sm font-bold text-primary">
          Welcome back, {userName}!
        </h2>
        <p className="text-charcoal-light font-label-sm">{currentDate}</p>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-6">
        {/* Online Toggle */}
        <div className="flex items-center gap-3 bg-surface-container rounded-full px-4 py-2">
          <span className={`text-sm font-label-md ${isOnline ? 'text-emerald-deep' : 'text-secondary'}`}>
            {isOnline ? 'Go Online' : 'Go Offline'}
          </span>
          <button
            onClick={handleToggleOnline}
            className={`relative w-12 h-6 rounded-full cursor-pointer flex items-center px-1 transition-all ${
              isOnline ? 'bg-primary' : 'bg-outline-variant'
            }`}
            aria-label={isOnline ? 'Click to go offline' : 'Click to go online'}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${
                isOnline ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="p-2 text-secondary cursor-pointer hover:bg-surface-container-high rounded-full transition-all relative">
            <span className="material-symbols-outlined">notifications</span>
            {unreadNotifications > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
            )}
          </button>

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-white shadow-sm cursor-pointer">
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
