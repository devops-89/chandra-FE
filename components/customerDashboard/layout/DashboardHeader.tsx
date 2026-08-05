'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { SERVER_ENDPOINTS } from '@/api/serverConstant';
import { AuthControllers } from '@/api/authControllers';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [popupNotification, setPopupNotification] = useState<{ open: boolean, message: string }>({ open: false, message: '' });
  const [unreadCount, setUnreadCount] = useState(0);

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

          socket.on('booking_accepted', (bookingDetails) => {
            console.log("Your booking has been assigned to a technician:", bookingDetails);
            const msg = bookingDetails?.technician?.firstName 
              ? `Your booking has been assigned to ${bookingDetails.technician.firstName}.` 
              : 'Your booking has been assigned to a technician.';
            setPopupNotification({ open: true, message: msg });
            setUnreadCount(prev => prev + 1);
            
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

      {/* Notifications */}
      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => {
            setPopupNotification(prev => ({ ...prev, open: false }));
            setUnreadCount(0);
          }}
          className="p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-full transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={24} />
          {(unreadCount > 0 || popupNotification.open) && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>

        {popupNotification.open && (
          <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 transition-all duration-300">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-full text-blue-600 shrink-0">
                <Bell size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">New Notification</h4>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                  {popupNotification.message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
