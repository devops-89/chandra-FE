import type { BookingFormData, BookingFormField } from '@/types/services.types';

export interface ACPriceBreakdown {
  basePrice: number;
  totalPrice: number;
  breakdown: Array<{
    label: string;
    amount: number;
    type: 'base' | 'addition';
  }>;
}

export function calculateACPrice(
  formData: BookingFormData,
  fields: BookingFormField[]
): ACPriceBreakdown {
  let basePrice = 0;
  const breakdown: Array<{
    label: string;
    amount: number;
    type: 'base' | 'addition';
  }> = [];

  // Service type base price
  const serviceType = formData.serviceType as string;
  const serviceTypeField = fields.find(f => f.name === 'serviceType');
  if (serviceTypeField?.options && serviceType) {
    const selectedOption = serviceTypeField.options.find(opt => opt.value === serviceType);
    if (selectedOption?.price && selectedOption.price > 0) {
      basePrice = selectedOption.price;
      breakdown.push({
        label: selectedOption.label,
        amount: basePrice,
        type: 'base'
      });
    }
  }

  const totalPrice = basePrice;

  return {
    basePrice,
    totalPrice,
    breakdown
  };
}