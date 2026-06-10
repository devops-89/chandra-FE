import type { Review } from "@/constants/admin/reviewData";

interface Props {
  review: Review;
}

const ReviewRow = ({ review }: Props) => {
  return (
    <tr className="border-b">
      <td className="p-4">
        {review.customerName}
      </td>

      <td className="p-4">
        {review.technicianName}
      </td>

      <td className="p-4">
        {review.serviceName}
      </td>

      <td className="p-4">
        ⭐ {review.rating}
      </td>

      <td className="max-w-xs truncate p-4">
        {review.comment}
      </td>

      <td className="p-4">
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
        <button className="text-emerald-600">
          View
        </button>
      </td>
    </tr>
  );
};

export default ReviewRow;