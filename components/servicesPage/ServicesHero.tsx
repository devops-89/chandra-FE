'use client';

import { motion } from 'framer-motion';

import HeroDecorations from '@/components/heroSection/HeroDecorations';

export default function ServicesHero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-emerald-900 text-white">
      <HeroDecorations />
      
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-100 via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-800 text-emerald-200 text-sm font-semibold tracking-wide uppercase mb-6 border border-emerald-700">
            Our Expertise
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Everything Your Home Needs, <br className="hidden md:block"/>
            <span className="text-emerald-300">Under One Roof.</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-emerald-100/90 leading-relaxed">
            From emergency plumbing to electrical upgrades, we offer comprehensive maintenance solutions provided by thoroughly vetted and highly skilled professionals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
