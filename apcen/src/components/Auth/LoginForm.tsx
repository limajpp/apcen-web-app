import { Card } from "../ui/card";
import headerIcon from "@/assets/HeaderIcon.svg";
import LoginContent from "./LoginContent";
import useAuth from "@/hooks/useAuth";
import { api } from "@/services/api";
import axios from "axios";
import LoginHeader from "./LoginHeader";
import Loading, { type LoadingType } from "../Loading";
import { Check, LoaderCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [hasAttempted, setHasAttempted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: LoadingType;
    message: string;
  }>({ type: "idle", message: "" });

  useEffect(() => {
    if (feedback.type !== "success") return;

    const timeout = setTimeout(() => {
      navigate("/slide-analysis");
    }, 1200);

    return () => clearTimeout(timeout);
  }, [feedback.type, navigate]);

  const handleLoginSubmit = async (credentials: {
    name: string;
    password: string;
  }) => {
    setIsLoading(true);
    setHasAttempted(true);
    setFeedback({ type: "loading", message: "Entrando na aplicação..." });
    try {
      const response = await api.post("auth/login", {
        username: credentials.name,
        password: credentials.password,
      });
      await login(response.data.accessToken, response.data.refreshToken);
      setFeedback({
        type: "success",
        message: "Usuário reconhecido com sucesso!",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error("Login failed: invalid credentials.");
          setFeedback({
            type: "error",
            message: "Usuário ou senha incorretos.",
          });
        } else {
          console.error("Login request failed, please try again later...", {
            status: error.response?.status,
            code: error.code,
          });
          setFeedback({
            type: "error",
            message: "Falha ao entrar. Tente novamente.",
          });
        }
      } else {
        console.error("Unexpected error during login...", error);
        setFeedback({
          type: "error",
          message: "Ocorreu um erro inesperado.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-transparent ring-0 flex flex-col m-auto w-md gap-8 border-none shadow-none">
      <LoginHeader
        headerText="Bem-vindo de volta!"
        className="flex flex-col justify-center items-center"
      >
        <div className="flex items-center justify-center h-28 w-28 bg-[rgba(159,193,254,0.60)] rounded-full mb-4">
          <img
            className="w-19 h-19"
            src={headerIcon}
            alt="Logotipo do APCEN com símbolo de microrganismo estilizado."
          />
        </div>
      </LoginHeader>
      <LoginContent
        onSubmit={handleLoginSubmit}
        isSubmitDisabled={isLoading}
        className="flex flex-col gap-10"
      />
      {hasAttempted && (
        <Loading
          type={feedback.type}
          icon={
            feedback.type === "loading" ? (
              <LoaderCircle className="stroke-[#9FC1FE] stroke-[2px] animate-spin" />
            ) : feedback.type === "error" ? (
              <X className="stroke-[#FFF] stroke-[2px]" />
            ) : feedback.type === "success" ? (
              <Check className="stroke-[#3266BD] stroke-[3px]" />
            ) : null
          }
          className="m-auto flex justify-center items-center w-fit p-2 gap-4"
          message={feedback.message}
        />
      )}
    </Card>
  );
}
