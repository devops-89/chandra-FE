import { Suspense } from 'react';

import PublicRoute from '@/components/auth/PublicRoute';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <PublicRoute>
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fff8ed]">
          <div className="text-slate-600 font-semibold">Loading...</div>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </PublicRoute>
  );
}
