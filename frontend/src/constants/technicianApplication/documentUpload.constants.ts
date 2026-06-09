import type { Document } from '@/types/technicianApplication/documentUpload.types';

export const DOCUMENTS: Document[] = [
  {
    id: 'aadhaar-card',
    name: 'Aadhaar Card',
    description: 'Upload both sides of your Aadhaar Card',
    icon: 'credit_card',
    acceptedFormats: ['pdf', 'jpg', 'png'],
  },
  {
    id: 'pan-card',
    name: 'PAN Card',
    description: 'Upload your PAN Card document',
    icon: 'credit_card',
    acceptedFormats: ['pdf', 'jpg', 'png'],
  },
  {
    id: 'police-verification',
    name: 'Police Verification',
    description: 'Upload your Police Verification Certificate',
    icon: 'verified_user',
    acceptedFormats: ['pdf', 'jpg', 'png'],
  },
  {
    id: 'trade-license',
    name: 'Trade License',
    description: 'Upload your Trade License certificate',
    icon: 'business',
    acceptedFormats: ['pdf', 'jpg', 'png'],
  },
  {
    id: 'cancelled-cheque',
    name: 'Cancelled Cheque',
    description: 'Upload a cancelled cheque for bank verification',
    icon: 'receipt',
    acceptedFormats: ['pdf', 'jpg', 'png'],
  },
];

export const SELFIE_UPLOAD_TEXT = {
  title: 'Selfie Verification',
  description: 'Take a clear selfie for identity verification',
  buttonText: 'Open Camera',
  instructions: 'Make sure your face is clearly visible and well-lit',
};

export const HELP_TEXT = {
  title: 'Need Help?',
  description: 'If you have any questions about the documents or the upload process, please contact our support team.',
};
