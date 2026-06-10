const TechnicianProfile = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white text-2xl">
          A
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Arjun Sharma
          </h2>

          <p className="text-slate-500">
            Electrical Specialist
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;