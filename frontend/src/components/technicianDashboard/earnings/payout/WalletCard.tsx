'use client';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function WalletCard() {
  return (
    <div
      className="
        bg-gradient-to-br
        from-emerald-500
        to-emerald-700
        rounded-3xl
        p-6
        text-white
        shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />

        <TrendingUpIcon />
      </div>

      <p className="mt-6 text-white/80">
        Available Balance
      </p>

      <h2 className="text-4xl font-bold mt-2">
        ₹12,600
      </h2>

      <button
        className="
          mt-6
          w-full
          py-3
          rounded-2xl
          bg-white
          text-emerald-600
          font-semibold
        "
      >
        Withdraw Funds
      </button>
    </div>
  );
}