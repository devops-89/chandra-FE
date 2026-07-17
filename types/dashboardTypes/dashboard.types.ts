import type { ReactNode } from 'react';

export type DashboardLayoutProps = {
  children: ReactNode;
};

export type Props = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};