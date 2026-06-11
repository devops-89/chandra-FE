import type { Review } from "@/constants/admin/reviewData";

interface Props {
  review: Review;
}

const ReviewRow = ({ review }: Props) => {
  return (
    <tr>
      <td className="p-4 text-slate-700">
        {review.customerName}
      </td>

      <td className="p-4 text-slate-700">
        {review.technicianName}
      </td>

      <td className="p-4 text-slate-700">
        {review.serviceName}
      </td>

      <td className="p-4 text-slate-700">
        ⭐ {review.rating}
      </td>

      <td className="max-w-xs truncate text-slate-700 p-4">
        {review.comment}
      </td>

      <td className="p-4 text-slate-700">
        {review.date}
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            review.status === "Published"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {review.status}
        </span>
      </td>

      <td className="p-4">
        <button className="text-emerald-600 cursor-pointer hover:underline">
          View
        </button>
      </td>
    </tr>
  );
};

export default ReviewRow;