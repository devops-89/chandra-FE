interface Props {
  title: string;
  value: string;
}

const ReviewStatCard = ({
  title,
  value,
}: Props) => {
  return (
    <div className="hover:shadow-xl border border-slate-200 rounded-2xl bg-white p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </h3>
    </div>
  );
};

export default ReviewStatCard;