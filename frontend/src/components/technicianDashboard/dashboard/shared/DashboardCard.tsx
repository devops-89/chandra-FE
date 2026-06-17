'use client';

import type { ReactNode } from 'react';

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardCard({
  children,
  className = '',
}: DashboardCardProps) {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        border
        border-slate-200/70
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}