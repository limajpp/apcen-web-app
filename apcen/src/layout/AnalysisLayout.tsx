import type { ReactNode } from "react";
import Logo from "../components/Logo";

interface AnalysisLayoutProps {
  children: ReactNode;
}

export default function AnalysisLayout({ children }: AnalysisLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-[#F9F3EA]">
      <div className="pt-[19px] pl-[49px]">
        <Logo />
      </div>
      {children}
    </div>
  );
}
