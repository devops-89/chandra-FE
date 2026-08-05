'use client';

import { motion } from 'framer-motion';
import { TouchApp, Engineering, VerifiedUser } from '@mui/icons-material';

const steps = [
  {
    title: '1. Request a Service',
    description: 'Select what you need and pick a time that works best for your schedule.',
    icon: <TouchApp fontSize="large" className="text-emerald-600" />,
  },
  {
    title: '2. Pro Arrives',
    description: 'A verified, skilled professional arrives at your doorstep fully equipped.',
    icon: <Engineering fontSize="large" className="text-emerald-600" />,
  },
  {
    title: '3. Job Completed',
    description: 'We guarantee our work. Pay securely only after the job is finished to your satisfaction.',
    icon: <VerifiedUser fontSize="large" className="text-emerald-600" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How HiChandra Works</h2>
          <p className="text-slate-600 text-lg">Getting your home fixed has never been this simple. Just a few taps and we handle the rest.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-emerald-100" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative text-center"
            >
              <div className="relative inline-flex items-center justify-center h-[90px] w-[90px] rounded-full bg-white border-4 border-emerald-50 shadow-xl mb-8 z-10">
                <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
