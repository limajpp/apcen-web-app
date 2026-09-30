import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { LoginFeedback } from "./AuthContent";

import { useState, type FormEvent } from "react";

interface AuthFormProps {
  feedback: LoginFeedback;
  onSubmit: (credentials: { name: string; password: string }) => void;
  isSubmitDisabled: boolean;
  className?: string;
}

export default function AuthForm({
  feedback,
  onSubmit,
  isSubmitDisabled,
  className,
}: AuthFormProps) {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    password: "",
  });
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const isFieldsInvalid =
    userCredentials.name.trim() === "" ||
    userCredentials.password.trim() === "";

  const isButtonDisabled = isFieldsInvalid || isSubmitDisabled;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userCredentials);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <CardContent>
        <FieldGroup>
          <Field className="gap-2">
            <FieldLabel className="font-clother text-[#2A59A9] text-[18px]">
              Nome de usuário:
            </FieldLabel>
            <Input
              required
              pattern="^[a-zA-Z0-9]+(?:[._\-][a-zA-Z0-9]+)*$"
              minLength={3}
              maxLength={32}
              value={userCredentials.name}
              onChange={(event) =>
                setUserCredentials((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              className={`border border-solid px-3 h-10 focus-visible:ring-0 text-[16px] bg-[rgba(159,193,254,0.30)] ${feedback.message === "Usuário ou senha incorretos." ? "border-[#C95555] text-[#C95555] focus-visible:border-[#C95555]" : "border-[rgba(159,193,254,0.60)] text-[#2A59A9] focus-visible:border-[#2A59A9]"} rounded-[16px]`}
            />
          </Field>
          <Field className="gap-2">
            <FieldLabel className="font-clother text-[#2A59A9] text-[18px]">
              Senha de acesso:
            </FieldLabel>
            <div className="relative">
              <Input
                required
                minLength={8}
                maxLength={32}
                value={userCredentials.password}
                onChange={(event) =>
                  setUserCredentials((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
                type={togglePassword ? "text" : "password"}
                className={`border border-solid px-3 h-10 ${!togglePassword ? "tracking-[0.25em]" : ""} focus-visible:ring-0 ${feedback.message === "Usuário ou senha incorretos." ? "border-[#C95555] text-[#C95555] focus-visible:border-[#C95555]" : "focus-visible:border-[#2A59A9] text-[#2A59A9] border-[rgba(159,193,254,0.60)]"} text-[16px] bg-[rgba(159,193,254,0.30)] rounded-[16px]`}
              />
              {togglePassword ? (
                <Eye
                  role="button"
                  tabIndex={0}
                  aria-label="Ocultar senha"
                  onClick={() => setTogglePassword((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setTogglePassword((prev) => !prev);
                    }
                  }}
                  className={`cursor-pointer absolute right-4 top-2 ${isFieldsInvalid ? "text-[rgba(159,193,254,0.6)]" : "text-[#2A59A9]"} ${feedback.message === "Usuário ou senha incorretos." ? "text-[#C95555]" : ""}`}
                />
              ) : (
                <EyeOff
                  role="button"
                  tabIndex={0}
                  aria-label="Mostrar senha"
                  onClick={() => setTogglePassword((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setTogglePassword((prev) => !prev);
                    }
                  }}
                  className={`cursor-pointer absolute right-4 top-2 ${isFieldsInvalid ? "text-[rgba(159,193,254,0.6)]" : "text-[#2A59A9]"} ${feedback.message === "Usuário ou senha incorretos." ? "text-[#C95555]" : ""}`}
                />
              )}
            </div>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          disabled={isButtonDisabled}
          className={`mx-auto w-52 h-12 rounded-[16px] ${isButtonDisabled ? "bg-[rgba(159,193,254,0.30)] hover:bg-[rgba(159,193,254,0.30)] text-[#2A59A9]" : "bg-[#2A59A9] hover:bg-[#2A59A9] text-[#F9F3EA] font-bold cursor-pointer"} disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-100 font-clother text-[18px] font-normal transition-colors`}
        >
          Entrar
        </Button>
      </CardFooter>
    </form>
  );
}
