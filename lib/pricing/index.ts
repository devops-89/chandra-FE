import type { BookingFormData, BookingFormField, Service } from '@/types/services.types';

import type { ACPriceBreakdown } from './calculateACPrice';
import { calculateACPrice } from './calculateACPrice';
import type { SolarPriceBreakdown } from './calculateSolarPrice';
import { calculateSolarPrice } from './calculateSolarPrice';

export type PriceBreakdown = SolarPriceBreakdown | ACPriceBreakdown | {
  basePrice: number;
  totalPrice: number;
  breakdown: Array<{
    label: string;
    amount: number;
    type: 'base' | 'addition' | 'discount';
  }>;
};

export function calculateServicePrice(
  service: Service,
  formData: BookingFormData,
  fields: BookingFormField[]
): PriceBreakdown | null {
  const pricingEngine = service.formConfig?.pricingEngine;

  switch (pricingEngine) {
    case 'solar':
      return calculateSolarPrice(formData, fields);
    case 'ac':
      return calculateACPrice(formData, fields);
    case 'fixed':
      return {
        basePrice: service.price,
        totalPrice: service.price,
        breakdown: [{
          label: service.title,
          amount: service.price,
          type: 'base' as const
        }]
      };
    default:
      return null;
  }
}

export { calculateACPrice, calculateSolarPrice };
export type { ACPriceBreakdown, SolarPriceBreakdown };