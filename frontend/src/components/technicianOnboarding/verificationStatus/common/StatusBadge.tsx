'use client';

import type { StatusBadgeProps } from '../types';

export default function StatusBadge({
  status,
  className = '',
}: StatusBadgeProps) {
  const getBadgeStyles = () => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
        };
      case 'approved':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
        };
      case 'action_required':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
        };
    }
  };

  const getBadgeLabel = () => {
    switch (status) {
      case 'pending':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      case 'action_required':
        return 'Action Required';
      default:
        return 'Unknown';
    }
  };

  const styles = getBadgeStyles();

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${styles.bg} ${styles.border} ${className}`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          status === 'pending' ? 'animate-pulse' : ''
        } ${
          status === 'pending'
            ? 'bg-yellow-500'
            : status === 'approved'
              ? 'bg-green-500'
              : 'bg-red-500'
        }`}
      />
      <span className={`text-sm font-semibold ${styles.text}`}>
        {getBadgeLabel()}
      </span>
    </div>
  );
}
