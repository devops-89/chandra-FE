'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExpandMore } from '@mui/icons-material';

const faqs = [
  {
    question: 'Are your technicians background checked?',
    answer: 'Absolutely. Every single professional on our platform goes through a rigorous multi-step vetting process, including identity verification, background checks, and skills assessment.',
  },
  {
    question: 'How do you price your services?',
    answer: 'We believe in transparent pricing. You will see an upfront estimate before booking. For complex jobs, the technician will provide a final quote before starting any work.',
  },
  {
    question: 'What if I am not satisfied with the work?',
    answer: 'We offer a 100% Satisfaction Guarantee. If the job isn’t done right, we will send someone back to fix it at no additional cost to you.',
  },
  {
    question: 'Do I need to provide tools or equipment?',
    answer: 'No. Our professionals arrive fully equipped with all the necessary tools and standard supplies to complete your requested job.',
  },
];

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-lg">Got questions? We have got answers.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="text-lg font-semibold text-slate-900">{faq.question}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ExpandMore className="text-slate-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
