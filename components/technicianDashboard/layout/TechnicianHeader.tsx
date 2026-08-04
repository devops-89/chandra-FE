'use client';

import { useEffect,useState } from 'react';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

import { AuthControllers } from '@/api/authControllers';
import { SERVER_ENDPOINTS } from '@/api/serverConstant';

export interface TechnicianHeaderProps {
  userName?: string;
  _userImage?: string;
  isOnline?: boolean;
  onOnlineToggle?: (isOnline: boolean) => void;
  unreadNotifications?: number;
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export default function TechnicianHeader({
  // userName = 'Vikram',
  _userImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIqqw-EcoftjiwYequdg0nCOe7VzpuDGWLAFJ9eXzs7cel5_qcIXWyColFlq7GxrExeD2ib0qpiNZAnIzE6hXWjAsIWO6UmYlX13hJRDpuqPiqrM2PyfyYnc38cK0k-cQDvzh72GtSC_I9S6VRijocQOZPDAoPSD1-jLBkzzthhOQ_F1rRMgkwFxczu8jHbJgwxra9dDt4ixt88tIFqPy_L2Lwmw9Eeh7THVhSsDJZjigsRKg6FpR6Bg4k0vWL73OWghLBzClZUdI',
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

          const logDev = (event: string, payload?: unknown) => {
            if (process.env.NODE_ENV !== 'production') {
              console.warn(`[Socket Event] ${event}`, payload);
            }
          };

          // 1. New Booking
          socket.on('new_booking', (booking) => {
            logDev('new_booking', booking);
            setPopupNotification({
              open: true,
              message: `New booking request received for ${booking?.serviceInfo?.name || booking?.service?.name || 'a service'}!`
            });

            window.dispatchEvent(new CustomEvent('refresh_bookings', {
              detail: { action: 'add', booking, event: 'new_booking', timestamp: Date.now() }
            }));

            setTimeout(() => {
              setPopupNotification(prev => ({ ...prev, open: false }));
            }, 5000);
          });

          // 2. Booking Updated
          socket.on('booking_updated', (booking) => {
            logDev('booking_updated', booking);
            window.dispatchEvent(new CustomEvent('refresh_bookings', {
              detail: { action: 'update', booking, event: 'booking_updated', timestamp: Date.now() }
            }));
          });

          // 3. Removal events (taken, accepted, cancelled, expired)
          const removalEvents = ['booking_taken', 'booking_accepted', 'booking_cancelled', 'booking_expired'];
          removalEvents.forEach((evtName) => {
            socket!.on(evtName, (data) => {
              logDev(evtName, data);
              const bookingId = typeof data === 'object' ? (data?.id || data?.bookingId) : data;
              window.dispatchEvent(new CustomEvent('refresh_bookings', {
                detail: { action: 'remove', bookingId, event: evtName, timestamp: Date.now() }
              }));
            });
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
      <div className="flex items-center gap-2 md:gap-4">
        {/* Online Toggle - Horizontal Button */}
        <button
          type="button"
          onClick={handleToggleOnline}
          className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${isOnline
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-surface-container text-secondary hover:bg-surface-container-high'
            }`}
          aria-label={isOnline ? 'Click to go offline' : 'Click to go online'}
        >
          <div
            className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-outline-variant'
              }`}
          />
          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </button>

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
