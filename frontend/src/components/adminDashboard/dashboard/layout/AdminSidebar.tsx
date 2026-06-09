'use client';

import {
  ClipboardList,
  Clock3,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';

const menuItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: 'Bookings',
    icon: Clock3,
  },
  {
    label: 'Customers',
    icon: Users,
  },
  {
    label: 'Technicians',
    icon: ClipboardList,
  },
  {
    label: 'Services',
    icon: Settings,
  },
  {
    label: 'Finance',
    icon: Settings,
  },
  {
    label: 'Reviews',
    icon: Settings,
  },
];

export default function AdminSidebar() {
  return (
    <aside
      className="
        hidden
        lg:flex
        flex-col
        fixed
        left-0
        top-0
        h-screen
        w-64
        bg-white
        border-r
        border-slate-200
      "
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-emerald-700">
          ChandraOps
        </h2>

        <p className="text-sm text-slate-500">
          Operations v1.0
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`
                flex
                items-center
                cursor-pointer
                gap-3
                w-full
                px-4
                py-3
                rounded-xl
                transition-all

                ${
                  item.active
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }
              `}
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Action */}
      <div className="px-4">
        <button
          className="
            w-full
            bg-emerald-700
            text-white
            py-3
            cursor-pointer
            rounded-xl
            font-medium
            hover:bg-emerald-800
            transition
          "
        >
          New Service Request
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 mt-4 border-t border-slate-200 space-y-2">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
          <HelpCircle size={18} />
          Help Center
        </button>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}