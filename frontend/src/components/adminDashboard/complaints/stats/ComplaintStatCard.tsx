interface Props {
  title: string;
  value: string;
}

const ComplaintStatCard = ({
  title,
  value,
}: Props) => {
  return (
    <div className="rounded-2xl hover:shadow-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>
    </div>
  );
};

export default ComplaintStatCard;