interface Props {
  title: string;
  value: number;
  color: string;
}

const BookingStatusCards = ({
  title,
  value,
  color,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </h3>
    </div>
  );
};

export default BookingStatusCards;