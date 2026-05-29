const HeroDecorations = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-24 top-10 size-40 rounded-full bg-emerald-100/70 blur-3xl sm:top-16 sm:size-56 lg:-left-20" />
      <div className="absolute -right-14 top-28 size-36 rounded-full bg-orange-100/80 blur-3xl sm:right-0 sm:size-40 md:right-20 lg:top-24" />
      <div className="absolute bottom-20 left-1/2 size-56 -translate-x-1/2 rounded-full bg-white/70 blur-3xl sm:bottom-8 sm:size-72" />
      <div className="absolute left-6 top-1/3 hidden size-16 rounded-full border border-emerald-200/80 bg-white/30 backdrop-blur-sm md:block" />
      <div className="absolute bottom-24 right-8 hidden size-20 rounded-full border border-orange-200/80 bg-white/40 backdrop-blur-sm lg:block xl:size-24" />
    </div>
  );
};

export default HeroDecorations;
