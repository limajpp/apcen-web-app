import AuthContent from "@/components/Auth/AuthContent";
import BaseLayout from "../BaseLayout";

export default function AuthLayout() {
  return (
    <BaseLayout className="h-full w-full">
      <AuthContent />
    </BaseLayout>
  );
}
