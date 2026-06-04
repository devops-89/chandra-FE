import { Bell } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-8
        py-5
      "
    >
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Welcome back, Chandra!
        </h1>

        <p className="text-slate-500">
          Manage your bookings and services
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button
          className="
            rounded-full
            p-2
            hover:bg-slate-100
          "
          title='bellButton'
        >
          <Bell size={22} />
        </button>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-full
            border
            border-slate-200
            px-3
            py-2
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-emerald-700
              font-semibold
              text-white
            "
          >
            C
          </div>

          <span className="font-medium">
            Chandra K.
          </span>
        </div>
      </div>
    </header>
  );
}