'use client';

import { Sparkles, ArrowRight, Wrench, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';
import { DashboardCard } from '@/components/customerDashboard/shared';

const POPULAR_SERVICES = [
  { name: 'Solar Cleaning', icon: Sparkles, desc: 'Eco-friendly cleaning' },
  { name: 'AC Servicing', icon: Wrench, desc: 'Cooling & filter check' },
  { name: 'Electrical Repair', icon: ShieldCheck, desc: 'Quick diagnosis' },
  { name: 'Plumbing Service', icon: Clock, desc: 'Instant dispatch' },
];

export default function EmptyBookingState() {
  return (
    <DashboardCard className="overflow-hidden p-6 sm:p-8">
      {/* Header / Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Sparkles className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Welcome to Chandra Services</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              You haven&apos;t booked any services yet. Start exploring our top home services!
            </p>
          </div>
        </div>

        <Link
          href="/services"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all shrink-0 cursor-pointer"
        >
          Browse Services
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Recommended Services Grid */}
      <div className="pt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Popular Services
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {POPULAR_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.name}
                href="/services"
                className="group flex flex-col items-start p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-white text-slate-700 group-hover:text-emerald-600 group-hover:bg-emerald-100/60 transition-colors shadow-2xs mb-2">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  {service.name}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  {service.desc}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardCard>
  );
}
