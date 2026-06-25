'use client';

import { motion } from 'framer-motion';

const categories = [
  { icon: 'solar_power', label: 'Solar Cleaning' },
  { icon: 'ac_unit', label: 'AC Repair' },
  { icon: 'plumbing', label: 'Plumbing' },
  { icon: 'electrical_services', label: 'Electrical' },

];

export default function CategoriesSection() {
  return (
    <section className="bg-[#fff8ed] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Open Positions
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Current Opportunities
          </h2>
          <p className="mt-4 text-slate-500">
            We are currently accepting applications in these categories
          </p>
        </motion.div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <span className="material-symbols-outlined text-2xl text-emerald-600">
                {cat.icon}
              </span>
              <span className="text-sm font-semibold text-slate-700">{cat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
