import type { ReactNode } from "react";
import { CardHeader, CardTitle } from "../ui/card";

interface LoginHeaderProps {
  className: string;
  headerText: string;
  children: ReactNode;
}

export default function LoginHeader({
  className,
  headerText,
  children,
}: LoginHeaderProps) {
  return (
    <CardHeader className={className}>
      {children}
      <CardTitle className="font-clother text-[#2A59A9] text-[32px] font-bold">
        {headerText}
      </CardTitle>
    </CardHeader>
  );
}
