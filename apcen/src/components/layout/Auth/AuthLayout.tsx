import LoginForm from "@/components/Auth/LoginForm";
import BaseLayout from "../BaseLayout";

export default function AuthLayout() {
  return (
    <BaseLayout className="h-full w-full">
      <LoginForm />
    </BaseLayout>
  );
}
