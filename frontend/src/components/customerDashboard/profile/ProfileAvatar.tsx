export default function ProfileAvatar() {
  return (
    <div
      className="
        rounded-full
        bg-emerald-100
        p-8
        shadow-sm
        w-[280px]
        h-[280px]
        mx-auto
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
            bg-emerald-600
            text-sm
            text-white
            transition-all
            duration-300
            hover:bg-emerald-700
            cursor-pointer
          "
        >
          Change Photo
        </button>
      </div>
    </div>
  );
}