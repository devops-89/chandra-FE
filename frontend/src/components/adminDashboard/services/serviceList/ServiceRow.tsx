import Image from "next/image";

import type { Service } from "@/constants/admin/serviceData";

interface Props {
  service: Service;
}

const ServiceRow = ({ service }: Props) => {
  return (
    <tr className="border-b">
      <td className="p-4">
        <Image
        width={20}
        height={25}
          src={service.image}
          alt={service.name}
          className="h-12 w-12 rounded-lg object-cover"
        />
      </td>

      <td className="p-4 font-medium">
        {service.name}
      </td>

      <td className="p-4">
        {service.category}
      </td>

      <td className="p-4">
        ₹{service.price}
      </td>

      <td className="p-4">
        {service.duration}
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            service.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {service.status}
        </span>
      </td>

      <td className="p-4">
        {service.bookings}
      </td>

      <td className="p-4">
        <div className="flex gap-2">
          <button className="text-white bg-emerald-600 rounded-xl p-2 cursor-pointer hover:bg-emerald-700">
            Edit
          </button>

          <button className="text-white bg-red-500 rounded-xl p-2 cursor-pointer hover:bg-red-700">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ServiceRow;