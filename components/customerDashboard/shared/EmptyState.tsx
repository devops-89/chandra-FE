type EmptyStateProps = {
  title: string;
  description: string;
};

const EmptyState = ({
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className="py-16 text-center">
      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;