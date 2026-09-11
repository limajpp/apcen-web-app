import type { ReactNode } from "react";
import Logo from "../components/Logo";

interface AnalysisLayoutProps {
  children: ReactNode;
}

export default function AnalysisLayout({ children }: AnalysisLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-[#F9F3EA]">
      <div className="pt-4.75 pl-12.25">
        <Logo />
      </div>
      {children}
    </div>
  );
}
