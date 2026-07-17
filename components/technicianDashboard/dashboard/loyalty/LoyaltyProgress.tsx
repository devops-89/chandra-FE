'use client';

export default function LoyaltyProgress() {
  return (
    <>
      <div
        className="
          w-full
          bg-white/20
          h-2
          rounded-full
          overflow-hidden
          mb-2
        "
      >
        <div
          className="
            bg-white
            h-full
            w-[80%]
            rounded-full
          "
        />
      </div>

      <div
        className="
          flex
          justify-between
          text-[10px]
          uppercase
          tracking-widest
          font-bold
        "
      >
        <span>Silver</span>
        <span>Gold</span>
      </div>
    </>
  );
}