import type { AdminService } from '@/types/admin/service.types';

// Inline SVG data URI — no network request, never 404s
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='8' fill='%23e2e8f0'/%3E%3Cpath d='M16 30 Q24 18 32 30' stroke='%2394a3b8' stroke-width='2' fill='none'/%3E%3Ccircle cx='20' cy='22' r='3' fill='%2394a3b8'/%3E%3C/svg%3E";

interface Props {
  service: AdminService;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceRow = ({ service, onEdit, onDelete }: Props) => {
  return (
    <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50">
      <td className="p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={48}
          height={48}
          src={service.image || PLACEHOLDER}
          alt={service.name}
          className="h-12 w-12 rounded-lg object-cover bg-slate-100"
          onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.onerror = null; // prevent infinite loop if placeholder also fails
              img.src = PLACEHOLDER;
            }}
        />
      </td>

      <td className="p-4 font-medium text-slate-800">{service.name}</td>

      <td className="p-4 text-slate-600">—</td>

      <td className="p-4 text-slate-600">₹{service.price}</td>

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
            type="button"
            onClick={onEdit}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Edit
          </button>

          <button
            type="button"
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
