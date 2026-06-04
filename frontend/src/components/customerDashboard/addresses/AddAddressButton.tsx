import { Plus } from 'lucide-react';

export default function AddAddressButton() {
  return (
    <button
      className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-emerald-600
        px-5
        py-3
        font-medium
        text-white
        cursor-pointer
        hover:bg-emerald-700
      "
    >
      <Plus size={18} />
      Add Address
    </button>
  );
}