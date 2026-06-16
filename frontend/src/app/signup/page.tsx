import PublicRoute from '@/components/auth/PublicRoute';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <PublicRoute>
      <SignupForm />
    </PublicRoute>
  );
}
