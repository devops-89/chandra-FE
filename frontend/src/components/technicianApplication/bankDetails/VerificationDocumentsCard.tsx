'use client';

import { motion } from 'framer-motion';

import { VERIFICATION_DOCUMENTS } from '@/data/technicianApplication/bankDetailsData';

interface VerificationDocumentsCardProps {
  uploadedFiles: {
    cancelledCheque?: File;
    bankPassbook?: File;
  };
  onFileUpload: (documentId: string, file: File) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function VerificationDocumentsCard({
  uploadedFiles,
  onFileUpload,
}: VerificationDocumentsCardProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-surface-container-low');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-surface-container-low');
  };

  const handleDrop = (e: React.DragEvent, documentId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-surface-container-low');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(documentId, files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, documentId: string) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      onFileUpload(documentId, files[0]);
    }
  };

  const getUploadedFile = (documentId: string) => {
    if (documentId === 'cancelled-cheque') {
      return uploadedFiles.cancelledCheque;
    } else if (documentId === 'bank-passbook') {
      return uploadedFiles.bankPassbook;
    }
    return undefined;
  };

  return (
    <motion.section
      className="bg-surface-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-ambient border border-outline-variant/30"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h3
        className="text-xs md:text-sm font-bold text-primary mb-6 uppercase tracking-wider"
        variants={itemVariants}
      >
        Verification Documents
      </motion.h3>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {VERIFICATION_DOCUMENTS.map((document) => {
          const uploadedFile = getUploadedFile(document.id);

          return (
            <motion.div key={document.id} variants={itemVariants}>
              <label
                className={`
                  group relative flex flex-col items-center justify-center
                  border-2 border-dashed rounded-2xl md:rounded-3xl p-6 md:p-8
                  cursor-pointer transition-all duration-300
                  ${
                    uploadedFile
                      ? 'border-primary bg-primary/5'
                      : 'border-outline-variant hover:bg-surface-container-low'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, document.id)}
              >
                <input
                  type="file"
                  accept={document.acceptedFormats.join(',')}
                  onChange={(e) => handleFileSelect(e, document.id)}
                  className="hidden"
                />

                <span
                  className={`
                    material-symbols-outlined text-4xl md:text-5xl mb-3 transition-colors
                    ${uploadedFile ? 'text-primary' : 'text-primary'}
                  `}
                >
                  {uploadedFile ? 'check_circle' : document.icon}
                </span>

                <span className="text-xs md:text-sm font-medium text-on-surface text-center">
                  {uploadedFile ? uploadedFile.name : document.name}
                </span>

                {!uploadedFile && (
                  <span className="text-xs text-secondary mt-2 text-center">{document.description}</span>
                )}

                {uploadedFile && (
                  <span className="text-xs text-primary mt-2 font-medium">
                    ✓ Uploaded
                  </span>
                )}
              </label>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
