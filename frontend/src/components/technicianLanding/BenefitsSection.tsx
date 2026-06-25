'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const benefits = [
  {
    icon: 'emoji_events',
    title: 'Performance Rewards',
    desc: 'Cash bonuses for high ratings and job completion targets.',
  },
  {
    icon: 'support_agent',
    title: 'Customer Support',
    desc: 'Dedicated partner helpline available 24/7 for on-job assistance.',
  },
  {
    icon: 'health_and_safety',
    title: 'Insurance Coverage',
    desc: 'Accidental insurance for all active partners while on job.',
  },
  {
    icon: 'school',
    title: 'Skill Development',
    desc: 'Regular training workshops to learn new tools and techniques.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 to-emerald-700 px-8 py-14 shadow-xl sm:px-12 lg:px-16">
          {/* Header */}
          <motion.div
            className="mb-12 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
              Designed for Your Growth
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              We handle the marketing, booking, and support so you can focus on what you do
              best—delivering great work.
            </h2>
            <div className="mt-8">
              <Link
                href="/technicianOnboarding"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-emerald-700 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
              >
                Register now
                <span className="material-symbols-outlined text-[1.1rem]">arrow_forward</span>
              </Link>
            </div>
          </motion.div>

          {/* Benefit cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <span className="material-symbols-outlined mb-3 block text-3xl text-emerald-200">
                  {b.icon}
                </span>
                <h3 className="mb-1 text-sm font-bold text-white">{b.title}</h3>
                <p className="text-sm leading-relaxed text-emerald-100/80">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
