import type { ReactNode } from "react";
import SupportArt from "../components/SupportArt";
import {
  ResizablePanelGroup,
  ResizablePanel,
} from "../components/ui/resizable";
import Logo from "../components/Logo";

interface BaseLayoutProps {
  className: string;
  children: ReactNode;
}

export default function BaseLayout({ className, children }: BaseLayoutProps) {
  return (
    <ResizablePanelGroup className={className} orientation="horizontal">
      <ResizablePanel className="flex flex-col bg-[#F9F3EA]" defaultSize="70%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel className="flex flex-col" defaultSize="100%">
            <Logo />
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizablePanel className="bg-transparent" defaultSize="30%">
        <SupportArt />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
