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
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          cursor-pointer
          hover:bg-emerald-700
          shadow-sm
          transition-all
        "
      >
        <Plus size={18} />
        Add Address
      </button>

      <AddAddressModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}


