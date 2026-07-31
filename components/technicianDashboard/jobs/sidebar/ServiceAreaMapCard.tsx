'use client';

import { LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectNearbyJobs } from '@/redux/selectors/nearbyJobsSelectors';
import { TechnicianControllers } from '@/api/technicianControllers';

export default function ServiceAreaMapCard() {
  const jobs = useAppSelector(selectNearbyJobs);
  const [techLocation, setTechLocation] = useState<{lat: number, lng: number, address: string} | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await TechnicianControllers.getTechnicianProfile();
        const loc = profile?.technicianProfile?.locations?.[0];
        if (loc && loc.latitude && loc.longitude) {
          setTechLocation({
            lat: parseFloat(loc.latitude),
            lng: parseFloat(loc.longitude),
            address: loc.city ? `${loc.city} - ${loc.pincode || ''}` : 'Active Service Area'
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile for map:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-4
        mt-6
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

        {/* Technician Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <LocationOn className="text-emerald-500 scale-125" />
          <span className="text-white text-[10px] font-semibold mt-1 bg-black/50 px-1.5 py-0.5 rounded-full">You</span>
        </div>

        {/* Job Pins */}
        {techLocation && jobs.map((job) => {
          if (!job.lat || !job.lng) return null;
          const latDiff = parseFloat(job.lat) - techLocation.lat;
          const lngDiff = parseFloat(job.lng) - techLocation.lng;
          
          // Approximate scale: 0.1 degree is roughly 11km. Let's map 0.05 degree to 50% of the map width
          const topPercent = 50 - (latDiff * 1000); 
          const leftPercent = 50 + (lngDiff * 1000);
          
          // Constrain pins within the map view (10% to 90%)
          const top = Math.min(Math.max(topPercent, 10), 90);
          const left = Math.min(Math.max(leftPercent, 10), 90);

          return (
            <div 
              key={job.id} 
              className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${top}%`, left: `${left}%` }}
              title={job.location}
            >
              <LocationOn className="text-emerald-400" />
            </div>
          );
        })}

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
            {techLocation ? techLocation.address : 'Loading...'}
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
          cursor-pointer
          text-emerald-600
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