import type { BookingFormData, BookingFormField } from '@/types/services.types';

export interface FormattedBookingField {
  label: string;
  value: string;
  key: string;
}

export function formatBookingData(
  data: BookingFormData,
  fields: BookingFormField[]
): FormattedBookingField[] {
  const formatted: FormattedBookingField[] = [];

  Object.entries(data).forEach(([key, value]) => {
    const field = fields.find(f => f.name === key);
    if (!field) return;

    let displayValue = '';

    if (value === null || value === undefined || value === '') {
      return; // Skip empty values
    }

    // Handle different field types
    switch (field.type) {
      case 'select':
        const option = field.options?.find(opt => opt.value === value);
        displayValue = option?.label || String(value);
        break;

      case 'file':
        if (value instanceof File) {
          displayValue = value.name;
        }
        break;

      case 'multi-file':
        if (Array.isArray(value) && value.every(v => v instanceof File)) {
          displayValue = `${value.length} file(s): ${(value as File[]).map(f => f.name).join(', ')}`;
        }
        break;

      case 'checkbox':
        displayValue = value ? 'Yes' : 'No';
        break;

      case 'number':
        displayValue = String(value);
        break;

      default:
        displayValue = String(value);
        break;
    }

    if (displayValue) {
      formatted.push({
        label: field.label,
        value: displayValue,
        key
      });
    }
  });

  return formatted;
}

export function formatFieldLabel(fieldName: string): string {
  // Convert camelCase to Title Case
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}