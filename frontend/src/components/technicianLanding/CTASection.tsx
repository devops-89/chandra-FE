'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-[#fff8ed] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl rounded-3xl bg-linear-to-br from-emerald-600 to-emerald-700 px-8 py-14 text-center shadow-xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
            Limited Spots Available
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to Join HiChandra?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-emerald-100/90">
            Start your journey today and become part of India&apos;s most trusted home service
            network.
          </p>

          <div className="mt-9">
            <Link
              href="/technicianOnboarding"
              className="inline-flex h-13 items-center justify-center rounded-full bg-white px-9 text-base font-bold text-emerald-700 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
            >
              Start Registration Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
