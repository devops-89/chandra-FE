'use client';

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SERVER_ENDPOINTS } from '@/api/serverConstant';
import { AuthControllers } from '@/api/authControllers';

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
  const [popupNotification, setPopupNotification] = useState<{ open: boolean, message: string }>({ open: false, message: '' });

  useEffect(() => {
    let socket: Socket | null = null;

    const initSocket = async () => {
      try {
        const profileRes = await AuthControllers.getProfile();
        if (profileRes?.data?.id) {
          const socketUrl = SERVER_ENDPOINTS.USER_BASEURL.replace('/api', '');
          socket = io(socketUrl, {
            auth: { userId: profileRes.data.id },
            transports: ['websocket', 'polling']
          });

          socket.on('new_booking', (booking) => {
            setPopupNotification({ open: true, message: `New booking request received for ${booking?.serviceInfo?.name || 'a service'}!` });

            // Dispatch custom event to trigger a refetch in dashboard components
            window.dispatchEvent(new Event('refresh_bookings'));

            // Auto close after 5 seconds
            setTimeout(() => {
              setPopupNotification(prev => ({ ...prev, open: false }));
            }, 5000);
          });
        }
      } catch (e) {
        console.error('Socket initialization failed', e);
      }
    };

    initSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

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
    <header className="flex h-16 sm:h-20 items-center sticky top-0 z-30 justify-between bg-[#F8FAFC] border-b border-slate-200 px-4 sm:px-8 gap-3">
      {/* Left: Hamburger + Welcome Message */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Hamburger Menu */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-secondary hover:bg-surface-container rounded-lg transition-colors shrink-0"
          aria-label="Toggle sidebar menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isSidebarOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Welcome Message (Removed as requested) */}
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
                pointer-events-none relative h-5.5 w-5.5 top-px transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-out flex items-center justify-center
                ${isOnline ? 'translate-x-5' : 'translate-x-0.5'}
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
        <div className="flex items-center gap-2 relative">
          {/* Notification Bell */}
          <button
            type="button"
            className="p-2 text-secondary cursor-pointer hover:bg-surface-container-high rounded-full transition-all relative"
            onClick={() => setPopupNotification(prev => ({ ...prev, open: false }))}
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {(unreadNotifications > 0 || popupNotification.open) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse" />
            )}
          </button>

          {/* Realtime Notification Popup */}
          {popupNotification.open && (
            <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 transition-all duration-300 transform origin-top-right">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-full text-blue-600 shrink-0">
                  <span className="material-symbols-outlined text-sm">notifications_active</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">New Notification</h4>
                  <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{popupNotification.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
