'use client';

export default function GoalsCard() {
  return (
    <div
      className="
        bg-gradient-to-br
        from-slate-900
        to-slate-800
        rounded-3xl
        p-6
        text-white
      "
    >
      <h3 className="font-bold text-xl">
        Monthly Goal
      </h3>

      <p className="text-white/70 mt-2">
        Earn ₹25,000 this month
      </p>

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span>₹18,250</span>
          <span>73%</span>
        </div>

        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="
              h-full
              w-[73%]
              bg-emerald-400
              rounded-full
            "
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-white/70">
        ₹6,750 remaining to reach your goal.
      </p>
    </div>
  );
}