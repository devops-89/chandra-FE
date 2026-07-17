import { AdminLoginForm } from '@/components/auth/AdminLoginForm';
import PublicRoute from '@/components/auth/PublicRoute';

export default function AdminLoginPage() {
  return (
    <PublicRoute>
      <AdminLoginForm />
    </PublicRoute>
  );
}
