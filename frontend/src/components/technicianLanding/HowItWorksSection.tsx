'use client';

import { motion } from 'framer-motion';

const steps = [
  { number: '01', title: 'Register', desc: 'Fill out the basic online form' },
  { number: '02', title: 'Verification', desc: 'Upload ID & certificates' },
  { number: '03', title: 'Approved', desc: 'Pass the quality check' },
  { number: '04', title: 'Receive Jobs', desc: 'App notifications for leads' },
  { number: '05', title: 'Complete', desc: 'Deliver 5-star service' },
  { number: '06', title: 'Get Paid', desc: 'Hassle-free direct payout' },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#fff8ed] py-20 sm:py-24">
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
            The Process
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Your Path to Becoming a Partner
          </h2>
          <p className="mt-4 text-slate-500">Join our elite network in 6 simple steps</p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex items-start gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              {/* Step number */}
              <span className="shrink-0 text-3xl font-black text-emerald-100 select-none">
                {step.number}
              </span>
              <div>
                <h3 className="mb-1 text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
