'use client';

import { motion } from 'framer-motion';

export default function ServicePerformanceCard() {
  const services = [
    { name: 'Solar', value: 42 },
    { name: 'AC Repair', value: 28 },
    { name: 'Plumbing', value: 18 },
    { name: 'Electrical', value: 12 },
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' as any }} // eslint-disable-line @typescript-eslint/no-explicit-any
      className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md p-5 cursor-default transition-shadow"
    >
      <h3 className="font-semibold text-slate-800 mb-1">Service Performance</h3>
      <p className="text-xs text-slate-400 mb-5">Booking share by category</p>

      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.name}>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm text-slate-600 font-medium">{service.name}</span>
              <span className="text-sm font-bold text-slate-800">{service.value}%</span>
            </div>

            {/* Native progress bar — no MUI dependency */}
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-emerald-600"
                initial={{ width: 0 }}
                animate={{ width: `${service.value}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' as any, delay: 0.1 }} // eslint-disable-line @typescript-eslint/no-explicit-any
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}