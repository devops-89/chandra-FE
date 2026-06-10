'use client';

import { SERVICE_AREA_TEXT } from '@/constants/technicianApplication/serviceAreaOptions';
import type { ServiceAreaHeaderProps } from '@/types/technicianOnboarding/serviceArea.types';

export default function ServiceAreaHeader({
  title = SERVICE_AREA_TEXT.header.title,
  description = SERVICE_AREA_TEXT.header.description,
}: ServiceAreaHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
