export default function ProfileAvatar() {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex flex-col items-center">
        <div
          className="
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            bg-emerald-600
            text-4xl
            font-bold
            text-white
          "
        >
          C
        </div>

        <button
          className="
            mt-4
            rounded-xl
            border
            px-4
            py-2
          "
        >
          Change Photo
        </button>
      </div>
    </div>
  );
}