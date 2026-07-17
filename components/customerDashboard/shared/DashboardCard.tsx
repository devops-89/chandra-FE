type DashboardCardProps = {
  children: React.ReactNode;
  className?: string;
};

const DashboardCard = ({
  children,
  className = "",
}: DashboardCardProps) => {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default DashboardCard;