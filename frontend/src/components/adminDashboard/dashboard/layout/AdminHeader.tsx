'use client';

import Avatar from '@mui/material/Avatar';
import {
  Bell,
  CircleHelp,
  Search,
} from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-emerald-700">
          Command Centre
        </h1>

        <div className="hidden lg:flex relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search bookings, technicians..."
            className="
              w-[320px]
              bg-slate-100
              text-slate-700
              cursor-pointer
              rounded-full
              py-2.5
              pl-10
              pr-4
              outline-none
              focus:ring-2
              focus:ring-emerald-500
            "
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell
            size={20}
            className="text-slate-600"
          />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button>
          <CircleHelp
            size={20}
            className="text-slate-600"
          />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-slate-800">
              Alex Chandra
            </p>

            <p className="text-xs text-slate-500">
              Super Admin
            </p>
          </div>

          <Avatar
            sx={{
              bgcolor: '#10b981',
              width: 40,
              height: 40,
            }}
          >
            AC
          </Avatar>
        </div>
      </div>
    </header>
  );
}