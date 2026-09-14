import type { ReactNode } from "react";
import Logo from "../components/Logo";
import LogoutButton from "../components/LogoutButton";

interface AnalysisLayoutProps {
  children: ReactNode;
}

export default function AnalysisLayout({ children }: AnalysisLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-[#F9F3EA]">
      <div className="flex items-center justify-between pt-4.75 pr-6 pl-1.25 min-[1512px]:pr-17 min-[1512px]:pl-12.25">
        <Logo />
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
