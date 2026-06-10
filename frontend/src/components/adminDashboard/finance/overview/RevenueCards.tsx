interface Props {
  title: string;
  value: string;
}

const RevenueCards = ({
  title,
  value,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </h3>
    </div>
  );
};

export default RevenueCards;