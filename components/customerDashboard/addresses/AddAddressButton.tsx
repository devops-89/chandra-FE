'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import AddAddressModal from './AddAddressModal';

export default function AddAddressButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-emerald-600
          px-3
          py-2
          sm:px-5
          sm:py-3
          text-sm
          sm:text-base
          font-medium
          text-white
          cursor-pointer
          hover:bg-emerald-700
          transition-colors
        "
      >
        <Plus size={11} className="sm:w-4.5 sm:h-4.5" />
        Add Address
      </button>

      <AddAddressModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

