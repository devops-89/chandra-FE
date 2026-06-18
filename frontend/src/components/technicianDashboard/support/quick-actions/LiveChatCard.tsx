'use client';

import ChatBubbleOutlineOutlined from '@mui/icons-material/ChatBubbleOutlineOutlined';

export default function LiveChatCard() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
        hover:border-emerald-500
        transition-all
      "
    >
      <div
        className="
          h-14
          w-14
          rounded-2xl
          bg-blue-100
          flex
          items-center
          justify-center
        "
      >
        <ChatBubbleOutlineOutlined className="text-blue-600" />
      </div>

      <h3 className="mt-5 text-xl font-bold">
        Live Chat
      </h3>

      <p className="mt-2 text-slate-500">
        Connect instantly with a support executive.
      </p>

      <button
        className="
          mt-6
          w-full
          py-3
          rounded-2xl
          border
          border-blue-500
          text-blue-600
          font-semibold
        "
      >
        Start Chat
      </button>
    </div>
  );
}