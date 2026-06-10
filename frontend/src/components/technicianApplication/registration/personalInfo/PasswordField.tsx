"use client";

import { useState } from "react";

export default function PasswordField() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block mb-2 text-xs md:text-sm font-medium">
        Create Password
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder="********"
          className="w-full h-12 border-slate-300 md:h-12 border rounded-lg md:rounded-xl px-4 pr-14 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-xs md:text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Minimum 8 characters with a number and symbol.
      </p>
    </div>
  );
}