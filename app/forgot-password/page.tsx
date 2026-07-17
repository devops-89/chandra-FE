import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import PublicRoute from '@/components/auth/PublicRoute';

export default function ForgotPasswordPage() {
  return (
    <PublicRoute>
      <ForgotPasswordForm />
    </PublicRoute>
  );
}
