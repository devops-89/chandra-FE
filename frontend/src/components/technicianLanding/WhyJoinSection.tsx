'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    icon: 'payments',
    title: 'Higher Earnings',
    desc: 'Earn up to 40% more than local market rates with consistent job flow.',
  },
  {
    icon: 'schedule',
    title: 'Weekly Payouts',
    desc: 'Get your hard-earned money credited directly to your bank every Wednesday.',
  },
  {
    icon: 'event_available',
    title: 'Flexible Schedule',
    desc: "You choose your hours. Work full-time or part-time, whenever you're ready.",
  },
  {
    icon: 'verified_user',
    title: 'Verified Customers',
    desc: 'Work only with background-checked clients in safe residential areas.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function WhyJoinSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Why HiChandra
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Why Partners Choose HiChandra
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-[#F7F9F8] p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <span className="material-symbols-outlined text-2xl">{b.icon}</span>
              </div>
              <div>
                <h3 className="mb-1 text-base font-bold text-slate-900">{b.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
