import { Props } from '@/types/addressTypes/address.types';

export default function AddressCard({
  address,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex justify-between">
        <h3 className="font-semibold">
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
          text-slate-500
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
          "
        >
          Edit
        </button>

        <button
          className="
            rounded-xl
            border
            border-red-200
            px-4
            py-2
            text-red-600
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}