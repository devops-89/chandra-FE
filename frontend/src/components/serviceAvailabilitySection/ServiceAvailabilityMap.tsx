export const ServiceAvailabilityMap = () => {
  return (
    <div className="h-80 md:h-125 w-full overflow-hidden">
      <iframe
        title="Service Area Map"
        src="https://www.google.com/maps?q=Delhi&output=embed"
        width="100%"
        height="100%"
        loading="lazy"
        className="border-0"
      />
    </div>
  );
};