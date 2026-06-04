'use client';

import { motion } from 'framer-motion';
import {
  Check,
  UserCheck,
  Truck,
  Wrench,
  BadgeCheck,
} from 'lucide-react';

import {
  SERVICE_PROGRESS_CURRENT_STEP,
  SERVICE_PROGRESS_STEPS,
} from '@/constants/customerDashboard/serviceProgress';

const STEPS = SERVICE_PROGRESS_STEPS;
const CURRENT_STEP = SERVICE_PROGRESS_CURRENT_STEP;

export default function ServiceProgress() {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-8
        shadow-sm
      "
    >
      <h3
        className="
          mb-8
          text-xl
          font-semibold
        "
      >
        Active Service Progress
      </h3>

      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const Icon = step.icon;

          const completed =
            index < CURRENT_STEP;

          const active =
            index === CURRENT_STEP;

          return (
            <div
              key={step.label}
              className="
                relative
                flex
                flex-1
                flex-col
                items-center
              "
            >
              {index !== STEPS.length - 1 && (
                <div
                  className={`
                    absolute
                    left-1/2
                    top-5
                    h-1
                    w-full
                    ${
                      index < CURRENT_STEP
                        ? 'bg-emerald-600'
                        : 'bg-slate-200'
                    }
                  `}
                />
              )}

              {active ? (
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-600
                    text-white
                  "
                >
                  <Icon size={18} />
                </motion.div>
              ) : (
                <div
                  className={`
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    ${
                      completed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }
                  `}
                >
                  <Icon size={18} />
                </div>
              )}

              <span
                className="
                  mt-3
                  text-sm
                  font-medium
                "
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
