import type { Props } from '@/types/addressTypes/address.types';

export default function AddressCard({
  address,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-md
        hover:shadow-lg
        hover:border
        hover:border-emerald-600
        transition-all
        duration-100
      "
    >
      <div className="flex justify-between">
        <h3 className="font-semibold text-slate-950">
          {address.label}
        </h3>

        {address.isDefault && (
          <span
            className="
              rounded-full
              bg-emerald-100
              px-3
              py-1
              text-xs
              text-emerald-700
            "
          >
            Default
          </span>
        )}
      </div>

      <p
        className="
          mt-4
          text-slate-700
        "
      >
        {address.address}
      </p>

      <div className="mt-6 flex gap-3">
        <button
          className="
            rounded-xl
            border
            px-4
            py-2
            bg-emerald-600
            text-slate-50
            cursor-pointer
            hover:bg-emerald-700
          "
        >
          Edit
        </button>

        <button
          className="
            rounded-xl
            border
            bg-red-500
            px-4
            py-2
            text-slate-50
            hover:bg-red-700
            cursor-pointer
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}