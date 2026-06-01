interface AvailabilityHeadingProps {
  title: string;
}

export const AvailabilityHeading = ({
  title,
}: AvailabilityHeadingProps) => {
  return (
    <h2
      className="
        mb-8
        text-3xl
        font-bold
        tracking-tight
        text-black
        sm:text-4xl
        lg:text-5xl
      "
    >
      {title}
    </h2>
  );
};