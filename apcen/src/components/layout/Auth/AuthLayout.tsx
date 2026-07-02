import Header from "../../Header";
import LoginForm from "@/components/Auth/LoginForm";
import BaseLayout from "../Baselayout";

export default function AuthLayout() {
  return (
    <BaseLayout className="h-full w-full">
      <Header />
      <LoginForm />
    </BaseLayout>
  );
}
