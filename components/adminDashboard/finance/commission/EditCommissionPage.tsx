"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  service: {
    name: string;
    commission: number;
  } | null;
  onSave: (commission: number) => void;
}

const EditCommissionPage = ({
  open,
  onClose,
  service,
  onSave,
}: Props) => {

  const [commission, setCommission] = useState(
  service?.commission ?? ""
);

  if (!open || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-2 text-xl font-semibold">
          Update Commission
        </h2>

        <p className="mb-4 text-slate-500">
          {service.name}
        </p>

        <input
          type="number"
          value={commission}
          onChange={(e) => setCommission(e.target.value)}
          placeholder="Enter commission %"
          className="mb-4 w-full rounded-xl border p-3"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(Number(commission))}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCommissionPage;