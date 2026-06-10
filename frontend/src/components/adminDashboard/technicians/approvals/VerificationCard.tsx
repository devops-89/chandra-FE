interface Props {
  name: string;
  experience: number;
  skills: string[];
}

const VerificationCard = ({
  name,
  experience,
  skills,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          {name[0]}
        </div>

        <div>
          <h3 className="font-semibold">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            {experience} Years Experience
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-white">
          Approve
        </button>

        <button className="rounded-xl bg-slate-100 px-4 py-2">
          Reject
        </button>
      </div>
    </div>
  );
};

export default VerificationCard;