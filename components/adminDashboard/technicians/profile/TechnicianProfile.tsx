const TechnicianProfile = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-500 text-white text-xl sm:text-2xl shrink-0">
          A
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Arjun Sharma</h2>
          <p className="text-slate-500">Electrical Specialist</p>
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;
