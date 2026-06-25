'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const requirements = [
  {
    title: 'Identity Documents',
    desc: 'Valid Aadhaar Card and PAN Card for background verification.',
  },
  {
    title: 'Bank Account',
    desc: 'A personal bank account with a canceled cheque for payouts.',
  },
  {
    title: 'Tools & Equipment',
    desc: 'A complete set of tools specific to your service trade.',
  },
  {
    title: 'Service Area & Mobile',
    desc: 'Android smartphone and a local presence in our service areas.',
  },
];

export default function RequirementsSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left — requirements list */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
              Checklist
            </p>
            <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What You&apos;ll Need
            </h2>

            <div className="space-y-5">
              {requirements.map((req, i) => (
                <motion.div
                  key={req.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 14 14">
                      <path
                        d="M2 7l3.5 3.5L12 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{req.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{req.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — pre-reg check card */}
          <motion.div
            className="rounded-3xl border border-slate-100 bg-[#F7F9F8] p-8 shadow-sm"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
              Pre-Registration Check
            </p>
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Ready to start?
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              Most partners complete their verification in under 48 hours.
            </p>

            <div className="mb-6 flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
              <span className="text-sm font-medium text-slate-700">Document Readiness</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                Highly Recommended
              </span>
            </div>

            <Link
              href="/technicianOnboarding"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-br from-emerald-600 to-emerald-700 px-7 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <span className="material-symbols-outlined text-[1.1rem]">shield_lock</span>
              Verify Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
