'use client';

import { motion } from 'framer-motion';

import type { NearbyJob } from '../types/nearby-job.types';
import JobCardActions from './JobCardActions';

interface JobCardProps {
  job: NearbyJob;
  badgeClassName?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onViewDetails?: () => void;
}

export default function JobCard({
  job,
  badgeClassName = 'bg-success-mint text-emerald-deep',
  onAccept = () => {},
  onReject = () => {},
  onViewDetails = () => {},
}: JobCardProps) {
  const isPriorityUrgent = job.priority === 'urgent';
  const priorityColor = isPriorityUrgent
    ? 'bg-red-100 text-red-800'
    : job.priority === 'normal'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-green-100 text-green-800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col rounded-2xl border border-surface-container/70 bg-surface-white p-5 shadow-[0_10px_35px_-18px_rgba(15,23,42,0.35)] transition-all duration-300 hover:border-primary/25 sm:p-6 md:p-7"
    >
      <div className="flex flex-1 flex-col gap-5">
        {/* Header: Service Type and Priority */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 ${badgeClassName} text-xs font-bold uppercase tracking-wider`}
            >
              {job.badge}
            </span>
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 ${priorityColor} text-xs font-bold uppercase tracking-wide`}
            >
              {job.priority === 'urgent'
                ? 'Urgent'
                : job.priority === 'normal'
                  ? 'Normal'
                  : 'Scheduled'}
            </span>
          </div>

          <h3 className="text-lg font-bold leading-tight text-on-surface sm:text-xl">
            {job.title}
          </h3>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-3 rounded-2xl bg-slate-50/70 p-4 min-[420px]:grid-cols-2 sm:gap-4 sm:p-5">
          {/* Customer */}
          <div className="flex items-start gap-3 text-secondary">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-xl text-primary">
              person
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-on-surface sm:text-base">
                {job.customerName}
              </p>
              <div className="mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined filled text-[14px] text-yellow-500">
                  star
                </span>
                <span className="truncate text-xs text-secondary sm:text-sm">
                  {job.rating} ({job.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3 text-secondary">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-xl text-primary">
              location_on
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-on-surface sm:text-base">
                {job.location}
              </p>
              <p className="text-xs text-secondary sm:text-sm">{job.distance} km away</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex items-start gap-3 text-secondary">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-xl text-primary">
              schedule
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-on-surface sm:text-base">
                {job.scheduledTime}
              </p>
              <p className="text-xs text-secondary sm:text-sm">Est. {job.estimatedDuration}</p>
            </div>
          </div>

          {/* Payout */}
          <div className="flex items-start gap-3 text-secondary">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-xl text-primary">
              payments
            </span>
            <div className="min-w-0">
              <p className="text-base font-extrabold text-emerald-deep sm:text-lg">
                ${job.payout.toFixed(2)}
              </p>
              <p className="text-xs text-secondary sm:text-sm">Fixed Payout</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <JobCardActions onAccept={onAccept} onReject={onReject} onViewDetails={onViewDetails} />
      </div>
    </motion.div>
  );
}
