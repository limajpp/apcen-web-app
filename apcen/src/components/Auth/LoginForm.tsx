import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import headerIcon from "@/assets/HeaderIcon.svg";
import { Eye, EyeOff } from "lucide-react";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export default function LoginForm() {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [userCredentials, setUserCredentials] = useState<{
    name: string;
    password: string;
  }>({ name: "", password: "" });

  const isLoginDisabled =
    userCredentials.name.trim() === "" ||
    userCredentials.password.trim() === "";

  return (
    <Card className="bg-transparent ring-0 flex flex-col m-auto w-md gap-8">
      <CardHeader className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center h-28 w-28 bg-[rgba(159,193,254,0.30)] rounded-full mb-4">
          <img
            className="w-16 h-16"
            src={headerIcon}
            alt="Logotipo do APCEN com símbolo de microrganismo estilizado."
          />
        </div>
        <CardTitle className="font-clother text-[#2A59A9] text-[32px] font-bold">
          Bem-vindo de volta!
        </CardTitle>
      </CardHeader>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-10"
      >
        <CardContent>
          <FieldGroup>
            <Field className="gap-2">
              <FieldLabel className="font-clother text-[#2A59A9] text-[18px]">
                Nome:
              </FieldLabel>
              <Input
                required
                onChange={(event) =>
                  setUserCredentials((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                className="border border-solid px-3 h-10 focus-visible:ring-0 focus-visible:border-[#2A59A9] text-[#2A59A9] text-[16px] bg-[rgba(159,193,254,0.30)] border-[rgba(159,193,254,0.60)] rounded-[16px]"
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
                  onChange={(event) =>
                    setUserCredentials((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  type={togglePassword ? "text" : "password"}
                  className={`border border-solid px-3 h-10 ${!togglePassword ? "tracking-[0.25em]" : ""} focus-visible:ring-0 focus-visible:border-[#2A59A9] text-[#2A59A9] text-[16px] bg-[rgba(159,193,254,0.30)] border-[rgba(159,193,254,0.60)] rounded-[16px]`}
                />
                {togglePassword ? (
                  <Eye
                    onClick={() => setTogglePassword((prev) => !prev)}
                    className={`cursor-pointer absolute right-4 top-2 ${isLoginDisabled ? "text-[rgba(159,193,254,0.6)]" : "text-[#2A59A9]"}`}
                  />
                ) : (
                  <EyeOff
                    onClick={() => setTogglePassword((prev) => !prev)}
                    className={`cursor-pointer absolute right-4 top-2 ${isLoginDisabled ? "text-[rgba(159,193,254,0.6)]" : "text-[#2A59A9]"}`}
                  />
                )}
              </div>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isLoginDisabled}
            className={`mx-auto w-52 h-12 rounded-[16px] ${isLoginDisabled ? "bg-[rgba(159,193,254,0.30)] hover:bg-[rgba(159,193,254,0.30)] text-[#2A59A9]" : "bg-[#2A59A9] hover:bg-[#2A59A9] text-[#F9F3EA] font-bold cursor-pointer"} disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-100 font-clother text-[18px] font-normal transition-colors`}
          >
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
