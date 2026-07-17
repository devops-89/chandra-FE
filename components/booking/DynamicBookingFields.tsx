'use client';

import DynamicFieldRenderer from '@/components/booking/DynamicFieldRenderer';
import type { BookingFormField } from '@/types/services.types';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FieldValue = string | number | boolean | File | File[];

export interface DynamicBookingFieldsProps {
  /**
   * Array of field definitions supplied by the service configuration.
   * Each field drives its own renderer via DynamicFieldRenderer.
   */
  fields: BookingFormField[];

  /**
   * Current values keyed by field name.
   * e.g. { serviceType: 'repair', acType: 'split', photos: File[] }
   */
  values: Record<string, FieldValue>;

  /**
   * Called whenever any non-file field value changes.
   * @param name  - field.name
   * @param value - new value
   */
  onChange: (name: string, value: FieldValue) => void;

  /**
   * Called whenever a file / multi-file field changes.
   * Gives the parent full control over file validation before updating state.
   * @param field - the BookingFormField definition
   * @param files - raw selected File[]
   */
  onFileChange: (field: BookingFormField, files: File[]) => void;

  /**
   * Per-field validation errors keyed by field name.
   * e.g. { panelCount: 'Required', photos: 'Max 5 files allowed' }
   */
  errors?: Record<string, string>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Resolves whether a conditional field should be visible.
 * A field with no `conditional` config is always visible.
 */
function isFieldVisible(
  field: BookingFormField,
  values: Record<string, FieldValue>,
): boolean {
  if (!field.conditional) return true;
  const dependentValue = values[field.conditional.dependsOn];
  return field.conditional.values.includes(String(dependentValue ?? ''));
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * DynamicBookingFields
 *
 * Renders a list of service-specific booking fields driven entirely by the
 * `fields` prop. Each field is delegated to `DynamicFieldRenderer`.
 *
 * Handles:
 * - Conditional field visibility (dependsOn / values)
 * - Routing file vs non-file onChange
 * - Passing per-field errors down
 *
 * Does NOT own state — the parent is responsible for `values` and `errors`.
 *
 * @example
 * ```tsx
 * const [values, setValues] = useState<Record<string, FieldValue>>({});
 * const [errors, setErrors]  = useState<Record<string, string>>({});
 *
 * const handleChange = (name: string, value: FieldValue) =>
 *   setValues(prev => ({ ...prev, [name]: value }));
 *
 * const handleFileChange = (field: BookingFormField, files: File[]) =>
 *   setValues(prev => ({ ...prev, [field.name]: files }));
 *
 * <DynamicBookingFields
 *   fields={service.bookingForm}
 *   values={values}
 *   onChange={handleChange}
 *   onFileChange={handleFileChange}
 *   errors={errors}
 * />
 * ```
 */
export default function DynamicBookingFields({
  fields,
  values,
  onChange,
  onFileChange,
  errors = {},
}: DynamicBookingFieldsProps) {
  if (fields.length === 0) return null;

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <DynamicFieldRenderer
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={onChange}
          onFileChange={onFileChange}
          error={errors[field.name]}
          visible={isFieldVisible(field, values)}
        />
      ))}
    </div>
  );
}
