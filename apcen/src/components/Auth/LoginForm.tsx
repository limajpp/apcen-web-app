import { Card } from "../ui/card";

import headerIcon from "@/assets/HeaderIcon.svg";
import LoginHeader from "./LoginHeader";
import LoginContent from "./LoginContent";

export default function LoginForm() {
  return (
    <Card className="bg-transparent ring-0 shadow-none flex flex-col m-auto w-md gap-8">
      <LoginHeader
        headerText="Bem-vindo de volta!"
        className="flex flex-col justify-center items-center"
      >
        <div className="flex items-center justify-center h-28 w-28 bg-[rgba(159,193,254,0.30)] rounded-full mb-4">
          <img
            className="w-16 h-16"
            src={headerIcon}
            alt="Logotipo do APCEN com símbolo de microrganismo estilizado."
          />
        </div>
      </LoginHeader>
      <LoginContent
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-10"
      />
    </Card>
  );
}
