'use client';

import { FileField, FormField } from '@/components/booking/fields';
import type { BookingFormField } from '@/types/services.types';

export interface DynamicFieldRendererProps {
  /** The field definition (type, label, options, validation, etc.) */
  field: BookingFormField;

  /** Current value for this field */
  value: string | number | boolean | File | File[] | undefined;

  /** Called when the field value changes */
  onChange: (name: string, value: string | number | boolean | File | File[]) => void;

  /**
   * Called for file/multi-file fields — receives the raw File[] so the
   * parent can apply its own file validation before updating state.
   */
  onFileChange: (field: BookingFormField, files: File[]) => void;

  /** Validation / submission error message for this field */
  error?: string;

  /**
   * Whether this field should be rendered.
   * Conditional fields (dependsOn) resolve visibility in the parent;
   * this prop is the result of that resolution.
   * Defaults to true.
   */
  visible?: boolean;
}

/**
 * DynamicFieldRenderer
 *
 * Renders a single booking form field based on its `type`.
 * Supports: text, number, email, tel, textarea, select, checkbox, file, multi-file.
 *
 * This is a pure presentational component — it holds no state and delegates
 * to the existing FormField / FileField primitives.
 */
export default function DynamicFieldRenderer({
  field,
  value,
  onChange,
  onFileChange,
  error,
  visible = true,
}: DynamicFieldRendererProps) {
  if (!visible) return null;

  if (field.type === 'file' || field.type === 'multi-file') {
    return (
      <FileField
        field={field}
        value={value as File | File[] | undefined}
        onChange={onFileChange}
        error={error}
        shouldShow={true}
      />
    );
  }

  return (
    <FormField
      field={field}
      value={value as string | number | boolean | File | File[]}
      onChange={onChange}
      error={error}
      shouldShow={true}
    />
  );
}
