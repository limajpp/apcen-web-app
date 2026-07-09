import { CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface AuthHeaderProps {
  className: string;
  headerText: string;
  children: ReactNode;
}

export default function AuthHeader({
  className,
  headerText,
  children,
}: AuthHeaderProps) {
  return (
    <CardHeader className={className}>
      {children}
      <CardTitle className="font-clother text-[#2A59A9] text-[32px] font-bold">
        {headerText}
      </CardTitle>
    </CardHeader>
  );
}
