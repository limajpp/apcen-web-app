import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { Dispatch, SetStateAction } from "react";

interface LoginContentProps {
  onSubmit: (event: { preventDefault: () => any }) => any;
  className: string;
  userCredentials: { name: string; password: string };
  setUserCredentials: Dispatch<
    SetStateAction<{
      name: string;
      password: string;
    }>
  >;
  togglePassword: boolean;
  setTogglePassword: Dispatch<SetStateAction<boolean>>;
}

export default function LoginContent({
  onSubmit,
  className,
  userCredentials,
  setUserCredentials,
  togglePassword,
  setTogglePassword,
}: LoginContentProps) {
  const isLoginDisabled =
    userCredentials.name.trim() === "" ||
    userCredentials.password.trim() === "";

  return (
    <form onSubmit={onSubmit} className={className}>
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
  );
}
