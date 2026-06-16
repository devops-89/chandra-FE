'use client';

import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <motion.p
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.18, ease: 'easeOut' }}
          className="mt-4 text-lg text-slate-950"
        >
        <h1 className="text-5xl md:text-7xl font-bold text-emerald-600 leading-tight">
          Contact <span className="text-slate-950">Us</span>
        </h1>

        <p className="mt-6 text-xl text-slate-950 max-w-2xl">
          Have questions about services, bookings, or support?
          Our team is here to help.
        </p>
      </motion.p>
    </section>
  );
}