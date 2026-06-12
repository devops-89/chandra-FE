import Image from 'next/image';

import type { AdminService } from '@/types/admin/service.types';

interface Props {
  service: AdminService;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceRow = ({ service, onEdit, onDelete }: Props) => {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="p-4">
        <Image
          width={48}
          height={48}
          src={service.image}
          alt={service.name}
          className="h-12 w-12 rounded-lg object-cover"
        />
      </td>

      <td className="p-4 font-medium text-slate-800">{service.name}</td>

      <td className="p-4 text-slate-600">{service.category}</td>

      <td className="p-4 text-slate-600">₹{service.price}</td>

      <td className="p-4 text-slate-600">{service.duration}</td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            service.status === 'Active'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {service.status}
        </span>
      </td>

      <td className="p-4 text-slate-600">{service.bookings}</td>

      <td className="p-4">
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ServiceRow;
