import { DOCUMENTS } from '@/constants/technicianApplication/documentUpload.constants';
import type { Document } from '@/types/technicianApplication/documentUpload.types';

export const getDocumentUploadData = (): Document[] => {
  return DOCUMENTS;
};

export const getDocumentById = (id: string): Document | undefined => {
  return DOCUMENTS.find((doc) => doc.id === id);
};
