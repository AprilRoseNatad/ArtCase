import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <AuthLayout maxWidth="max-w-4xl">
      <LoginForm />
    </AuthLayout>
  );
}