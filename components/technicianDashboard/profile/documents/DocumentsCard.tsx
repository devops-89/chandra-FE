import React, { useState } from 'react';

import AadhaarCard from './AadhaarCard';
import DocumentModal from './DocumentModal';
import PanCard from './PanCard';
import PoliceCertCard from './PoliceCertCard';
import DrivingLicenseCard from './TradeLicenseCard';

export default function DocumentsCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleView = (url: string, title: string) => {
    setModalUrl(url);
    setModalTitle(title);
    setModalOpen(true);
  };

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <h3
        className="
          text-xl
          font-bold
          text-slate-900
          mb-6
        "
      >
        Verification Documents
      </h3>

      <div className="space-y-4">
        <AadhaarCard onView={handleView} />
        <PanCard onView={handleView} />
        <DrivingLicenseCard onView={handleView} />
        <PoliceCertCard onView={handleView} />
      </div>

      <DocumentModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        url={modalUrl} 
        title={modalTitle} 
      />
    </div>
  );
}