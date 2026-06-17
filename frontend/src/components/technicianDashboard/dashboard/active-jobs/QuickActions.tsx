'use client';

const actions = [
  {
    icon: 'call',
    label: 'Call',
  },

  {
    icon: 'chat',
    label: 'Chat',
  },

  {
    icon: 'map',
    label: 'Navigate',
  },
];

export default function QuickActions() {
  return (
    <div
      className="
        grid
        grid-cols-4
        gap-3
        mt-8
        pt-8
        border-t
        border-slate-200
      "
    >
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          className="
            flex
            flex-col
            items-center
            gap-2
            p-3
            rounded-xl
            hover:bg-slate-50
            transition-all
          "
        >
          <div
            className="
              w-12
              h-12
              rounded-full
              bg-slate-100
              flex
              items-center
              justify-center
            "
          >
            <span className="material-symbols-outlined">
              {action.icon}
            </span>
          </div>

          <span className="text-sm">
            {action.label}
          </span>
        </button>
      ))}

      <button
        type="button"
        className="
          flex
          flex-col
          items-center
          gap-2
          p-3
          rounded-xl
          bg-emerald-600
          text-white
          hover:bg-emerald-700
          transition-all
          shadow-lg
          shadow-emerald-600/20
        "
      >
        <div
          className="
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
          "
        >
          <span className="material-symbols-outlined">
            play_circle
          </span>
        </div>

        <span className="text-sm font-semibold">
          Start Job
        </span>
      </button>
    </div>
  );
}