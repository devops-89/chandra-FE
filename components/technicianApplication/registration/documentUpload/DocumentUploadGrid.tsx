'use client';

import { getDocumentUploadData } from '@/data/technicianOnboarding/documentUploadData';
import type { UploadedFile } from '@/types/technicianApplication/documentUpload.types';

import DocumentUploadCard from './DocumentUploadCard';

interface DocumentUploadGridProps {
  uploadedDocuments: Record<string, UploadedFile>;
  onUpload: (file: UploadedFile, rawFile: File) => void;
  onRemove: (documentId: string) => void;
}

export default function DocumentUploadGrid({
  uploadedDocuments,
  onUpload,
  onRemove,
}: DocumentUploadGridProps) {
  const documents = getDocumentUploadData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {documents.map((document) => (
        <DocumentUploadCard
          key={document.id}
          document={document}
          isUploaded={!!uploadedDocuments[document.id]}
          uploadedFile={uploadedDocuments[document.id]}
          onUpload={onUpload}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
