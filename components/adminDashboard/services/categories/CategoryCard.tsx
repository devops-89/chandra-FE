interface Props {
  title: string;
  totalServices: number;
}
const CategoryCard = ({
  title,
  totalServices,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {totalServices} Services
      </p>
    </div>
  );
};

export default CategoryCard;