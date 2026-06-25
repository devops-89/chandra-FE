'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function TechnicianHero() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ed] py-20 sm:py-28 lg:py-32">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-50/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.p
            variants={itemVariants}
            className="mb-5 inline-flex rounded-full border border-emerald-300/50 bg-linear-to-r from-emerald-50 to-emerald-100/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm"
          >
            Join Our Network
          </motion.p>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
          >
            Build Your Service{' '}
            <span className="bg-linear-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              Business with HiChandra
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
          >
            Everything you need to grow your professional service career. Join thousands of
            experts providing top-tier maintenance and repairs.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          >
            <Link
              href="/technician/onboarding/register"
              className="inline-flex h-12 items-center justify-center rounded-full bg-linear-to-br from-emerald-600 to-emerald-700 px-8 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4"
            >
              Start Registration
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-8 text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4"
            >
              Learn More
            </a>
          </motion.div>

          {/* Rating badge */}
          <motion.div
            variants={itemVariants}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800"
          >
            <span className="flex gap-0.5 text-amber-400" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.953 2.87c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69L9.05 2.927z" />
                </svg>
              ))}
            </span>
            4.9/5 Service Provider Rating
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
