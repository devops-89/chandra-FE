import type { BookingFormData, BookingFormField } from '@/types/services.types';

export interface SolarPriceBreakdown {
  basePrice: number;
  propertyTypePrice: number;
  frequencyDiscount: number;
  totalPrice: number;
  breakdown: Array<{
    label: string;
    amount: number;
    type: 'addition' | 'discount';
  }>;
}

export function calculateSolarPrice(
  formData: BookingFormData,
  fields: BookingFormField[]
): SolarPriceBreakdown {
  let basePrice = 0;
  let propertyTypePrice = 0;
  let frequencyDiscount = 0;
  const breakdown: Array<{
    label: string;
    amount: number;
    type: 'addition' | 'discount';
  }> = [];

  // Calculate base price from panel count
  const panelCount = Number(formData.panelCount) || 0;
  const panelField = fields.find(f => f.name === 'panelCount');
  if (panelField?.priceCalculation?.basePrice && panelCount > 0) {
    basePrice = panelField.priceCalculation.basePrice * panelCount;
    breakdown.push({
      label: `${panelCount} panels × ₹${panelField.priceCalculation.basePrice}`,
      amount: basePrice,
      type: 'addition'
    });
  }

  // Property type pricing
  const propertyType = formData.propertyType as string;
  const propertyField = fields.find(f => f.name === 'propertyType');
  if (propertyField?.options && propertyType) {
    const selectedOption = propertyField.options.find(opt => opt.value === propertyType);
    if (selectedOption?.price && selectedOption.price > 0) {
      propertyTypePrice = selectedOption.price;
      breakdown.push({
        label: `${selectedOption.label} surcharge`,
        amount: propertyTypePrice,
        type: 'addition'
      });
    }
  }

  // Frequency discount
  const frequency = formData.cleaningFrequency as string;
  const frequencyField = fields.find(f => f.name === 'cleaningFrequency');
  if (frequencyField?.options && frequency) {
    const selectedOption = frequencyField.options.find(opt => opt.value === frequency);
    if (selectedOption?.price && selectedOption.price < 0) {
      frequencyDiscount = Math.abs(selectedOption.price);
      breakdown.push({
        label: `${selectedOption.label} discount`,
        amount: frequencyDiscount,
        type: 'discount'
      });
    }
  }

  const totalPrice = basePrice + propertyTypePrice - frequencyDiscount;

  return {
    basePrice,
    propertyTypePrice,
    frequencyDiscount,
    totalPrice: Math.max(totalPrice, 0), // Ensure non-negative
    breakdown
  };
}