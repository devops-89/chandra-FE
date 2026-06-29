export interface Document {
  id: string;
  name: string;
  description: string;
  icon: string;
  acceptedFormats: string[];
}

export interface UploadedFile {
  documentId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface DocumentUploadState {
  selfieImage: UploadedFile | null;
  uploadedDocuments: Record<string, UploadedFile>;
}

export interface SelfieVerificationCardProps {
  image: UploadedFile | null;
  onCapture: (file: UploadedFile, rawFile: File) => void;
}

export interface DocumentUploadCardProps {
  document: Document;
  isUploaded: boolean;
  onUpload: (file: UploadedFile, rawFile: File) => void;
}

export interface UploadDropzoneProps {
  documentName: string;
  acceptedFormats: string[];
  onUpload: (file: UploadedFile, rawFile: File) => void;
  isUploaded?: boolean;
  fileName?: string;
}

export interface UploadHelpCardProps {
  title?: string;
  description?: string;
}

export interface DocumentUploadFooterProps {
  onPrevious: () => void;
  onSubmit: () => void;
  isComplete?: boolean;
}
