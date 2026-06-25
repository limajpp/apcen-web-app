import { Card, CardHeader, CardTitle } from "../ui/card";
import headerIcon from "@/assets/HeaderIcon.svg";
import LoginContent from "./LoginContent";
import useAuth from "@/hooks/useAuth";
import { api } from "@/services/api";
import axios from "axios";

export default function LoginForm() {
  const { login } = useAuth();

  const handleLoginSubmit = async (credentials: {
    name: string;
    password: string;
  }) => {
    try {
      const response = await api.post("auth/login", {
        username: credentials.name,
        password: credentials.password,
      });
      await login(response.data.accessToken, response.data.refreshToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          console.error("Your credentials are invalid. Please try again...");
        } else {
          console.error("Error while logging in:", error);
        }
      }
    }
  };

  return (
    <Card className="bg-transparent ring-0 flex flex-col m-auto w-md gap-8 border-none shadow-none">
      <CardHeader className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center h-28 w-28 bg-[rgba(159,193,254,0.60)] rounded-full mb-4">
          <img
            className="w-19 h-19"
            src={headerIcon}
            alt="Logotipo do APCEN com símbolo de microrganismo estilizado."
          />
        </div>
        <CardTitle className="font-clother text-[#2A59A9] text-[32px] font-bold">
          Bem-vindo de volta!
        </CardTitle>
      </CardHeader>
      <LoginContent
        onSubmit={handleLoginSubmit}
        className="flex flex-col gap-10"
      />
    </Card>
  );
}
