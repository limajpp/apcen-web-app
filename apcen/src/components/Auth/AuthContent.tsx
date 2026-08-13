import logo from "@/assets/logo.svg";
import { LoaderCircle, X } from "lucide-react";

import { Card } from "@/components/ui/card";

import AuthForm from "@/components/Auth/AuthForm";
import AuthHeader from "@/components/Auth/AuthHeader";
import Loading, { type LoadingType } from "@/components/Loading";

import useAuth from "@/hooks/useAuth";

import axios from "axios";
import { api } from "../../services/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type LoginFeedback = {
  type: LoadingType;
  message: string;
};

export default function AuthContent() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<LoginFeedback>({
    type: "idle",
    message: "",
  });

  const isLoading = feedback.type === "loading";
  const hasAttempted = feedback.type !== "idle";

  useEffect(() => {
    if (feedback.type !== "success") return;

    navigate("/slide-analysis");
  }, [feedback.type, navigate]);

  useEffect(() => {
    if (feedback.type !== "error") return;

    const timeout = setTimeout(() => {
      setFeedback({ type: "idle", message: "" });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [feedback.type]);

  const handleLoginSubmit = async (credentials: {
    name: string;
    password: string;
  }) => {
    setFeedback({ type: "loading", message: "Entrando na aplicação..." });
    try {
      const response = await api.post("auth/login", {
        username: credentials.name,
        password: credentials.password,
      });
      await login(response.data.accessToken, response.data.refreshToken);
      setFeedback({
        type: "success",
        message: "",
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
          message: "Sistema fora do ar.",
        });
      }
    }
  };

  return (
    <Card className="bg-transparent ring-0 flex flex-col m-auto w-md gap-8 border-none shadow-none">
      <AuthHeader
        headerText="Bem-vindo de volta!"
        className="flex flex-col justify-center items-center"
      >
        <div className="flex items-center justify-center h-28 w-28 bg-[rgba(159,193,254,0.60)] rounded-full mb-4">
          <img
            className="w-19 h-19"
            src={logo}
            alt="Logotipo do APCEN com símbolo de microrganismo estilizado."
          />
        </div>
      </AuthHeader>
      <AuthForm
        feedback={feedback}
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
            ) : null
          }
          className="m-auto flex justify-center items-center w-fit p-2 gap-4"
          message={feedback.message}
        />
      )}
    </Card>
  );
}
