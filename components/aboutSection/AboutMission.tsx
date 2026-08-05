'use client';

import { motion } from 'framer-motion';
import { Handshake, Verified, Speed, SupportAgent } from '@mui/icons-material';

const values = [
  {
    title: 'Verified Professionals',
    description: 'Every technician undergoes a strict background check and skill verification process.',
    icon: <Verified fontSize="large" className="text-emerald-600" />,
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees. You get upfront estimates before any work begins.',
    icon: <Handshake fontSize="large" className="text-emerald-600" />,
  },
  {
    title: 'Fast & Reliable',
    description: 'We value your time. Our pros arrive on schedule and complete jobs efficiently.',
    icon: <Speed fontSize="large" className="text-emerald-600" />,
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated customer success team is always here to assist you.',
    icon: <SupportAgent fontSize="large" className="text-emerald-600" />,
  },
];

export default function AboutMission() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
          <p className="text-slate-600 text-lg">We believe in building long-term trust with our customers by delivering exceptional service every single time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
              <p className="text-slate-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
