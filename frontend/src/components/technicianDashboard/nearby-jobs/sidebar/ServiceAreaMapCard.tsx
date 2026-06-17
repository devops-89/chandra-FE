'use client';

import { LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function ServiceAreaMapCard() {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-4
        shadow-sm
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          h-80
          bg-linear-to-br
          from-slate-800
          via-slate-700
          to-emerald-900
        "
      >
        {/* Fake Map Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-20
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            bg-size-[40px_40px]
          "
        />

        {/* Map Pins */}
        <LocationOn className="absolute top-8 left-12 text-emerald-400" />
        <LocationOn className="absolute top-20 right-20 text-emerald-400" />
        <LocationOn className="absolute bottom-16 left-20 text-emerald-400" />
        <LocationOn className="absolute bottom-24 right-12 text-emerald-400" />
        <LocationOn className="absolute top-1/2 left-1/2 text-emerald-500 scale-125" />

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-5
            bg-linear-to-t
            from-black/70
            to-transparent
          "
        >
          <h4
            className="
              text-white
              font-bold
              text-2xl
            "
          >
            Active Service Area
          </h4>

          <p className="text-white/80">
            Gurgaon Sector 50-60
          </p>
        </div>
      </div>

      <button
        className="
          mt-5
          w-full
          py-4
          rounded-2xl
          border
          border-emerald-500
          text-emerald-500
          font-semibold
          hover:bg-emerald-50
          transition-all
        "
      >
        Expand Range
      </button>
    </motion.div>
  );
}