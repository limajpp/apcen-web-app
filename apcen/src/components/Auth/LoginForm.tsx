import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import headerIcon from "@/assets/HeaderIcon.svg";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  return (
    <Card className="bg-transparent ring-0 flex flex-col m-auto w-md gap-8">
      <CardHeader className="flex flex-col justify-center items-center">
        <div className="flex items-center justify-center h-28 w-28 bg-[rgba(159,193,254,0.60)] rounded-full mb-4">
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
      <CardContent>
        <form className="flex flex-col">
          <FieldGroup>
            <Field className="gap-2">
              <FieldLabel className="font-clother text-[#2A59A9] text-[18px]">
                Nome:
              </FieldLabel>
              <Input className="border border-solid bg-[rgba(159,193,254,0.30)] border-[rgba(159,193,254,0.60)] rounded-[16px]" />
            </Field>
            <Field className="gap-2">
              <FieldLabel className="font-clother text-[#2A59A9] text-[18px]">
                Senha de acesso:
              </FieldLabel>
              <Input className="border border-solid bg-[rgba(159,193,254,0.30)] border-[rgba(159,193,254,0.60)] rounded-[16px]" />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="mx-auto w-56 py-3.25 rounded-[16px] hover:bg-[rgba(159,193,254,0.60)] bg-[rgba(159,193,254,0.60)] text-[#2A59A9] font-clother text-[18px]">
          Log in
        </Button>
      </CardFooter>
    </Card>
  );
}
