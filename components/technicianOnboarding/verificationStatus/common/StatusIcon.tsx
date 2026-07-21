'use client';

import { motion } from 'framer-motion';

import type { StatusIconProps } from '../types';

export default function StatusIcon({
  status,
  size = 'md',
}: StatusIconProps) {
  const sizeMap = {
    sm: { container: 'w-12 h-12', icon: 'text-2xl' },
    md: { container: 'w-20 h-20 md:w-24 md:h-24', icon: 'text-5xl md:text-6xl' },
    lg: { container: 'w-24 h-24 md:w-32 md:h-32', icon: 'text-6xl md:text-8xl' },
  };

  const getIconConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: 'schedule',
          bg: 'bg-yellow-50',
          color: 'text-yellow-600',
          animation: { rotate: 360, duration: 3 },
        };
      case 'approved':
        return {
          icon: 'check_circle',
          bg: 'bg-green-50',
          color: 'text-green-600',
          animation: { scale: [0, 1.1, 1], duration: 0.6 },
        };
      case 'action_required':
        return {
          icon: 'error',
          bg: 'bg-red-50',
          color: 'text-red-600',
          animation: { y: [-5, 5, -5], duration: 2 },
        };
      default:
        return {
          icon: 'help',
          bg: 'bg-gray-50',
          color: 'text-gray-600',
          animation: { opacity: 1 },
        };
    }
  };

  const config = getIconConfig();
  const sizeConfig = sizeMap[size];

  return (
    <motion.div
      className={`${sizeConfig.container} rounded-full ${config.bg} flex items-center justify-center`}
      animate={
        status === 'pending'
          ? { rotate: 360 }
          : status === 'approved'
            ? { scale: [0, 1.1, 1] }
            : { y: [-5, 5, -5] }
      }
      transition={
        status === 'pending'
          ? { duration: 3, repeat: Infinity, ease: 'linear' as any } // eslint-disable-line @typescript-eslint/no-explicit-any
          : status === 'approved'
            ? { duration: 0.6 }
            : { duration: 2, repeat: Infinity }
      }
    >
      <span className={`material-symbols-outlined ${sizeConfig.icon} ${config.color}`}>
        {config.icon}
      </span>
    </motion.div>
  );
}
