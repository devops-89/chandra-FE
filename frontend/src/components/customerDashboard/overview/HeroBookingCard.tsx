import { CalendarDays, Clock } from 'lucide-react';

export default function HeroBookingCard() {
  return (
    <section
      className="
        rounded-3xl
        bg-emerald-700
        p-8
        text-white
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-3
            "
          >
            <span
              className="
                rounded-full
                bg-emerald-100
                px-3
                py-1
                text-xs
                font-semibold
                text-emerald-700
              "
            >
              CONFIRMED
            </span>

            <span className="text-sm">
              ID: #HC-9821
            </span>
          </div>

          <h2
            className="
              mb-4
              text-4xl
              font-bold
            "
          >
            Solar Cleaning
          </h2>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <span>Oct 24, 2024</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>09:00 AM - 12:00 PM</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="
              rounded-xl
              bg-white
              px-5
              py-3
              font-medium
              text-emerald-700
            "
          >
            Track Service
          </button>

          <button
            className="
              rounded-xl
              border
              border-white/30
              px-5
              py-3
              font-medium
            "
          >
            View Booking
          </button>
        </div>
      </div>
    </section>
  );
}
