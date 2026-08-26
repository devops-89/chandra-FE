'use client';

import { motion } from 'framer-motion';

import HeroDecorations from '@/components/heroSection/HeroDecorations';

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      <HeroDecorations />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Connecting You With <span className="text-emerald-600 relative inline-block">Trusted Professionals<svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200/50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"/></svg></span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed">
            HiChandra is on a mission to simplify home maintenance. We bring reliable, vetted, and highly skilled technicians directly to your doorstep, making everyday repairs completely stress-free.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
