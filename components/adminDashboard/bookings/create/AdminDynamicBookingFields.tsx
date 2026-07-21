'use client';

import { 
  Checkbox, 
  FormControl, 
  FormControlLabel, 
  FormHelperText,
  Grid,
  InputLabel, 
  MenuItem, 
  Select, 
  TextField} from '@mui/material';
import React from 'react';

import type { FieldValue } from '@/components/booking/DynamicBookingFields';
import type { BookingFormField } from '@/types/services.types';

export interface AdminDynamicBookingFieldsProps {
  fields: BookingFormField[];
  values: Record<string, FieldValue>;
  onChange: (name: string, value: FieldValue) => void;
  onFileChange: (field: BookingFormField, files: File[]) => void;
  errors?: Record<string, string>;
}

function isFieldVisible(
  field: BookingFormField,
  values: Record<string, FieldValue>,
): boolean {
  if (!field.conditional) return true;
  const dependentValue = values[field.conditional.dependsOn];
  return field.conditional.values.includes(String(dependentValue ?? ''));
}

export default function AdminDynamicBookingFields({
  fields,
  values,
  onChange,
  onFileChange,
  errors = {},
}: AdminDynamicBookingFieldsProps) {
  if (fields.length === 0) return null;

  return (
    <Grid container spacing={3}>
      {fields.map((field) => {
        if (!isFieldVisible(field, values)) return null;
        
        const error = errors[field.name];
        const hasError = Boolean(error);
        
        if (field.type === 'select') {
          return (
            <Grid size={{ xs: 12, sm: 6 }} key={field.name}>
              <FormControl fullWidth required={field.required} error={hasError}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  value={(values[field.name] as string) || ''}
                  label={field.label}
                  onChange={(e) => onChange(field.name, e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select {field.label}</em>
                  </MenuItem>
                  {field.options?.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
                {hasError && <FormHelperText>{error}</FormHelperText>}
              </FormControl>
            </Grid>
          );
        }

        if (field.type === 'checkbox') {
          return (
            <Grid size={{ xs: 12 }} key={field.name}>
              <FormControl error={hasError} required={field.required}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={Boolean(values[field.name])}
                      onChange={(e) => onChange(field.name, e.target.checked)}
                      color="warning"
                    />
                  }
                  label={field.label}
                />
                {hasError && <FormHelperText>{error}</FormHelperText>}
              </FormControl>
            </Grid>
          );
        }

        if (field.type === 'file' || field.type === 'multi-file') {
          return (
            <Grid size={{ xs: 12 }} key={field.name}>
              <FormControl fullWidth error={hasError} required={field.required}>
                <TextField
                  type="file"
                  label={field.label}
                  // @ts-expect-error - MUI type definition mismatch for this specific prop combination
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ 
                    multiple: field.type === 'multi-file',
                    accept: field.accept
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      onFileChange(field, Array.from(e.target.files));
                    }
                  }}
                  error={hasError}
                  helperText={error || `Upload ${field.label}`}
                />
              </FormControl>
            </Grid>
          );
        }

        // Default to TextField (text, number, tel, textarea)
        return (
          <Grid size={{ xs: 12, sm: field.type === 'textarea' ? 12 : 6 }} key={field.name}>
            <TextField
              fullWidth
              required={field.required}
              type={field.type === 'number' ? 'number' : field.type === 'tel' ? 'tel' : 'text'}
              multiline={field.type === 'textarea'}
              rows={field.type === 'textarea' ? 4 : 1}
              label={field.label}
              value={(values[field.name] as string) || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              error={hasError}
              helperText={error}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
