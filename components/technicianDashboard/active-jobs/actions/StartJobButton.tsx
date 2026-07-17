'use client';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function StartJobButton() {
  return (
    <button
      className="
        h-14
        rounded-2xl
        bg-emerald-500
        text-white
        flex
        p-4
        items-center
        justify-center
        gap-2
        font-semibold
        cursor-pointer
        hover:bg-emerald-600
        transition-all
      "
    >
      <PlayArrowIcon />

      Start Job
    </button>
  );
}