'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Electrician, 2+ Years',
    quote:
      '"HiChandra completely changed how I find work. I no longer have to wait for customers to call; the app keeps me busy throughout the day."',
    initials: 'RK',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Anita Sharma',
    role: 'AC Technician, 1 Year',
    quote:
      '"The weekly payments are very reliable. I can plan my family\'s expenses easily now. The support team is also very helpful during jobs."',
    initials: 'AS',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    name: 'Vikram Singh',
    role: 'Plumber, 3+ Years',
    quote:
      '"What I love most is the flexible schedule. If I have a personal errand, I just turn off the app. If I want to earn more, I work longer."',
    initials: 'VS',
    color: 'bg-emerald-100 text-emerald-700',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#fff8ed] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Partner Stories
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Hear from Our Experts
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1 text-amber-400" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.953 2.87c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69L9.05 2.927z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 text-sm leading-relaxed text-slate-600">{t.quote}</p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${t.color}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
