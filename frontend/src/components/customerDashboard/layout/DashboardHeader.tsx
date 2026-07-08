import { Bell, Menu } from 'lucide-react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';


interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {

  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);

  const customerProfile = useAppSelector((state) => state.customerProfile.profile);

  useEffect(() => {
  if (!customerProfile) {
    dispatch(fetchCustomerProfile());
    }
  }, [customerProfile, dispatch]);

  const user =
    customerProfile ??
    authUser ??
    (() => {
      if (typeof window === 'undefined') return null;

      try {
        const raw = localStorage.getItem('user');
        return raw ? JSON.parse(raw) : null;
        } catch {
        return null;
      }
    })();

  const firstName = user?.firstName ?? 'User';
  const lastName = user?.lastName ?? '';
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
  const fullName = `${firstName} ${lastName}`.trim();

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

      <div className="flex items-center gap-3 lg:gap-2">
        <button
          className="
            rounded-full
            p-2
            hover:bg-slate-100
            cursor-pointer
            transition-colors
          "
          title="bellButton"
        >
          <Bell size={27} />
        </button>

        <div
          className="
            flex
            items-center
            gap-5
            sm:gap-3
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
              sm:h-8
              sm:w-8
              items-center
              justify-center
              rounded-full
              bg-emerald-700
              font-medium
              text-white
              text-sm
              sm:text-base
            "
          >
            {initials}
          </div>

          <span className="font-medium text-sm sm:text-base hidden sm:inline">{fullName}</span>
        </div>
      </div>
    </header>
  );
}
