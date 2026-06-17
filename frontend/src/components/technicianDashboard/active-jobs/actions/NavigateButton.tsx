'use client';

import NavigationIcon from '@mui/icons-material/Navigation';

export default function NavigateButton() {
  return (
    <button
      className="
        h-14
        rounded-2xl
        border
        border-slate-200
        bg-white
        flex
        items-center
        justify-center
        gap-2
        font-medium
        hover:border-emerald-500
        transition-all
      "
    >
      <NavigationIcon />

      Navigate
    </button>
  );
}