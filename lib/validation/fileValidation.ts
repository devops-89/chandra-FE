import type { BookingFormField } from '@/types/services.types';

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
  validFiles: File[];
}

export function validateFiles(
  files: File[],
  field: BookingFormField
): FileValidationResult {
  const errors: string[] = [];
  const validFiles: File[] = [];

  // Check max file count
  if (field.maxFiles && files.length > field.maxFiles) {
    errors.push(`Maximum ${field.maxFiles} files allowed. You selected ${files.length} files.`);
    return { isValid: false, errors, validFiles };
  }

  // Validate each file
  files.forEach((file) => {
    // Check file type
    if (field.accept) {
      const acceptedTypes = field.accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      
      const isValidType = acceptedTypes.some(acceptType => {
        if (acceptType.includes('*')) {
          // Handle wildcards like "image/*"
          const baseType = acceptType.split('/')[0];
          return fileType.startsWith(baseType);
        } else if (acceptType.startsWith('.')) {
          // Handle extensions like ".pdf"
          return acceptType.toLowerCase() === fileExtension;
        } else {
          // Handle full MIME types like "application/pdf"
          return acceptType === fileType;
        }
      });

      if (!isValidType) {
        errors.push(`File "${file.name}" is not a valid type. Accepted types: ${field.accept}`);
        return;
      }
    }

    // Check file size (optional - can be added later)
    const maxFileSize = 5 * 1024 * 1024; // 5MB default
    if (file.size > maxFileSize) {
      errors.push(`File "${file.name}" is too large. Maximum size is 5MB.`);
      return;
    }

    validFiles.push(file);
  });

  return {
    isValid: errors.length === 0,
    errors,
    validFiles
  };
}

export function getFileTypeDescription(accept?: string): string {
  if (!accept) return 'Any file type';
  
  const types = accept.split(',').map(type => type.trim());
  const descriptions: string[] = [];
  
  types.forEach(type => {
    if (type === 'image/*') {
      descriptions.push('Images');
    } else if (type === 'application/pdf') {
      descriptions.push('PDF');
    } else if (type.startsWith('.')) {
      descriptions.push(type.toUpperCase().substring(1));
    } else {
      descriptions.push(type);
    }
  });
  
  return descriptions.join(', ');
}