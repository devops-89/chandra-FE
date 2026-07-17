type StatusBadgeProps = {
  status: string;
};

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-700",
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
  assigned: "bg-purple-100 text-purple-700",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style =
    statusStyles[status.toLowerCase()] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`
        inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase
        ${style}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
