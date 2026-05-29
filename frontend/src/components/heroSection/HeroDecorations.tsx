const HeroDecorations = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-20 top-16 size-56 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="absolute right-0 top-24 size-40 rounded-full bg-orange-100/80 blur-3xl md:right-20" />
      <div className="absolute bottom-8 left-1/2 size-72 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute left-6 top-1/3 hidden size-16 rounded-full border border-emerald-200/80 bg-white/30 backdrop-blur-sm md:block" />
      <div className="absolute bottom-24 right-8 hidden size-24 rounded-full border border-orange-200/80 bg-white/40 backdrop-blur-sm lg:block" />
    </div>
  );
};

export default HeroDecorations;
