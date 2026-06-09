"use client";

import { useState } from "react";

export default function PasswordField() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        Create Password
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder="********"
          className="w-full h-12 border rounded-xl px-4 pr-16"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-3"
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