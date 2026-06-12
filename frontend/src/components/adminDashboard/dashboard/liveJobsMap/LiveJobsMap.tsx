'use client';
import Card from '@mui/material/Card';
import {motion} from 'framer-motion'

// import TechnicianMarker from './TechnicianMarker';

export default function LiveJobsMap() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl border border-slate-200 bg-white hover:shadow-lg p-5 cursor-default"
    >
    <Card
      elevation={0}
      className="
        rounded-2xl
        overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
          px-6
          py-5
          border-b
          border-slate-200
          flex
          items-center
          justify-between
        "
      >
        <h2 className="text-lg font-semibold text-slate-800">
          Live Ops Map
        </h2>

        <span
          className="
            px-3
            py-1
            rounded-full
            text-[10px]
            font-bold
            uppercase
            bg-emerald-100
            text-emerald-700
          "
        >
          Live Tracking
        </span>
      </div>

      {/* Map Area */}

      <div className="relative height:320px bg-slate-100 overflow-hidden">
        {/* Background */}

        <div
          className="
            absolute
            inset-0
            bg-linear-to-br
            from-slate-300
            via-slate-200
            to-slate-100
          "
        />

        {/* Fake Roads */}

        {/* <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-0 w-full height:2px bg-slate-500" />

          <div className="absolute top-40 left-0 w-full height:2px bg-slate-500" />

          <div className="absolute top-60 left-0 w-full height:2px bg-slate-500" />

          <div className="absolute left-20 top-0 h-full width:2px bg-slate-500" />

          <div className="absolute left-44 top-0 h-full width:2px bg-slate-500" />

          <div className="absolute left-72 top-0 h-full width:2px bg-slate-500" />
        </div> */}

        {/* Markers */}

        {/* <TechnicianMarker
          type="available"
          top="25%"
          left="30%"
        /> */}

        {/* <TechnicianMarker
          type="busy"
          top="50%"
          left="70%"
        /> */}

        {/* Floating Zone Card */}

        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
            bg-white/95
            backdrop-blur
            border
            border-slate-200
            rounded-xl
            p-4
            shadow-lg
          "
        >
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700">
              SOUTH ZONE
            </span>

            <span className="text-xs font-bold text-emerald-700">
              14 JOBS
            </span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full">
            <div className="h-2 w-[80%] rounded-full bg-emerald-600" />
          </div>
        </div>
      </div>

      {/* Footer Metrics */}

      <div
        className="
          border-t
          border-slate-200
          p-5
          flex
          items-center
          justify-between
        "
      >
        <div className="flex-1 text-center">
          <p className="text-xs text-slate-500 uppercase font-semibold">
            Repeats
          </p>

          <p className="text-2xl font-bold text-emerald-700">
            68%
          </p>
        </div>

        <div className="h-10 w-px bg-slate-200" />

        <div className="flex-1 text-center">
          <p className="text-xs text-slate-500 uppercase font-semibold">
            Avg Rating
          </p>

          <p className="text-2xl font-bold text-emerald-700">
            4.92
          </p>
        </div>
      </div>
    </Card>
    </motion.div>
  );
}