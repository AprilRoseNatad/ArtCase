import { AuthLayout } from "@/layouts/AuthLayout";
import { SignupForm } from "@/features/auth/components/SignupForm";

export function SignupPage() {
  return (
    <AuthLayout maxWidth="max-w-5xl">
      <SignupForm />
    </AuthLayout>
  );
}